---
title: "Astro Components"
description: "Amegos"
tag: "astro"
pubDate: 2025-03-03
---

- **Gestión estructurada:** Permite trabajar con markdown y mdx para blogs, documentacion o catalogos.
- **Seguridad de tipos:** Utiliza esquemas de validacion (con typescript/zod) a traves de `astro:content` para garantizar que todos los archivos de contenido cumplan con la estructura requerida antes de compilar.
- **Integracion flexible:** Ofrece facilidades para conectar CMS headless externos (como strapi, sanity o wordpress) o bases de datos de soporte (backend services).

## ¿Que resuelve?

En proyectos con blogs, documentacion o catalogos, los datos del encabezado de los archivos markdown suelen sufrir errores de escritura, por ejemplo, definir `pubDate` en un archivo y `date` en otro.

Las colecciones de contenido solucionan esto ofreciendo **seguridad de tipos e intellisense** mediante esquemas de validacion, garantizando que el contenido cumpla la estructura requerida antes de compilar.

## Estructura y configuracion

Los archivos se guardan en carpetas dentro del directorio `src/content/`, por ejemplo, `src/content/blog/`.
Las reglas de validacion se definen en `src/content/config.ts` mediante esquemas con la libreria [[Zod]]:

```
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' para Markdown/MDX o 'data' para JSON/YAML
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default('Anónimo'),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'blog': blogCollection,
};
```

## Consulta de datos

Para consumir este contenido dentro de cualquier pagina o componente de Astro, se utiliza el modulo `astro:content`:

```
---
import { getCollection } from 'astro:content';

// Obtener todos los elementos de la colección 'blog'
const posts = await getCollection('blog');
---

<ul>
  {posts.map((post) => (
    <li>
      {post.data.title} - {post.data.pubDate.toISOString().slice(0, 10)}
    </li>
  ))}
</ul>
```

## Renderizado del contenido Markdown o MDX

Para renderizar el cuerpo del documento en HTML dentro de una pagina:

```
---
import { getEntry } from 'astro:content';

const post = await getEntry('blog', 'mi-primer-post');
const { Content } = await post.render();
---

<h1>{post.data.title}</h1>
<Content />
```

