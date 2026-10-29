--- 
title: "Routes and structure"  
tag: "astro" 
pubDate: 2026-10-29
---

- **Enrutamiento basado en archivos (pages):** Cualquier archivo dentro de `src/pages/` se convierte en una ruta de la web automaticamente.
- **Layouts:** Son componentes contenedores diseñados para envolver el contenido con la estructura común del sitio (como el `<head>`, menus o el pie de pagina).
- **Navegacion avanzada:**
	- **View transitions:** Transiciones animadas entre paginas sin recargar la pantalla completa.
	- **Prefetch:** Precarga automatica de enlaces para que la navegacion entre paginas se sienta instantanea.
	- **Endpoints y middleware:** Rutas de API internas para responder con datos (JSON) y capas intermedias para logica global (Como autenticacion o redirecciones).

## Enrutamiento basado en archivos 

En Astro, la estructura de carpetas y archivos dentro de `src/pages/`determina automaticamente las URL de tu sitio web, algunos ejemplos pueden ser:

- `src/pages/index.astro` $\rightarrow$ `/`
- `src/pages/acerca.astro` $\rightarrow$ `/acerca`
- `src/pages/blog/index.astro` $\rightarrow$ `/blog`
- `src/pages/contacto.md` $\rightarrow$ `/contacto` (los archivos Markdown dentro de `pages/` también se convierten automáticamente en páginas HTML)

## Enrutamiento dinamico (dynamic routes)

Cuando necesitas generar paginas a partir de una lista de datos, como pueden ser las entradas de un blog o un catalogo de productos, se utilizan los corchetes `[...]` en el nombre del archivo, por ejemplo:

`src/pages/blog/[slug].astro` respondera a rutas dinamicas como `/blog/mi-post` o `/blog/guia`.

## Generacion estatica (getStaticPaths)

En el modo estatico por defecto **(SSG (Static Site Generation))**, esto hace que Astro, a diferencia de los frameworks tradicionales, genere todos los archivos HTML, CSS y recursos durante la fase de compilacion **(build time)**. 

La ruta dinamica debe exportar una funcion `getStaticPaths()` en el *frontmatter* que le indique a Astro que paginas debe generar durante la compilacion:

```
---
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

// 1. Definir qué rutas estáticas se deben generar
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

// 2. Recibir los datos de props para cada página
const { post } = Astro.props;
const { Content } = await post.render();
---
```

## ¿Como funciona getStaticPaths()?

Imagina que tienes tres artículos de blog dentro de tu colección de contenido. El archivo `src/pages/blog/[slug].astro` se estructura así:

```
---
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

// PASO A: Astro ejecuta esta función primero durante 'npm run build'
export async function getStaticPaths() {
  const posts = await getCollection('blog');

  // Devuelve un array de rutas que se deben construir
  return posts.map(post => ({
    params: { slug: post.slug }, // Define la URL final (ej: /blog/primer-post)
    props: { post },             // Pasa los datos completos del post a la página
  }));
}

// PASO B: Astro ejecuta este bloque N veces (una por cada objeto en params)
const { post } = Astro.props;
const { Content } = await post.render();
---
```

### **¿Qué ocurre en segundo plano durante la compilación?**

1. `getStaticPaths()` devuelve 3 elementos: `slug: 'primer-post'`, `slug: 'segundo-post'`, `slug: 'tercer-post'`.
2. Astro asigna y construye 3 páginas HTML separadas:

- `/blog/primer-post/index.html`
- `/blog/segundo-post/index.html`
- `/blog/tercer-post/index.html`

1. Cada HTML contiene ya el texto y la estructura final procesada.

## Ventajas

- **Velocidad máxima (0 latencia de servidor):** Al ser archivos HTML planos servidos por una CDN, la respuesta inicial del navegador es casi instantanea.
- **Seguridad nativa:** Al no haber un servidor web o base de datos consultandose en tiempo real por cada visita, se eliminan los vectores de ataque mas comunes a nivel de servidor.
- **Costes y despliegue sencillos:** Se puede alojar de forma gratuita o muy economica en plataformas de hosting estatico.

### **¿Cuándo pasar de SSG a SSR (Renderizado bajo demanda)?**

Si bien el modo estático (SSG) es ideal para blogs, sitios corporativos o documentación, Astro también admite **renderizado bajo demanda (** **On-demand rendering / SSR** **)** cuando necesitas:

- Contenido personalizado por usuario (paneles de control, autenticación).
- Páginas con miles de rutas que cambian constantemente y no se pueden precompilar todas de antemano.

## Layouts

Son componentes de Astro diseñados para reutilizar la estructura HTML comun a traves de multiples paginas.

Se utilizan envolviendo el contenido de la pagina y pasando el contenido dinamico mediante el elemento `<slot />`:

```
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body>
    <header>
      <nav>
        <a href="/">Inicio</a>
        <a href="/blog">Blog</a>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>© 2026 Mi Sitio en Astro</p>
    </footer>
  </body>
</html>
```