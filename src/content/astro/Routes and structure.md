---
title: "Astro Components"
description: "Amegos"
tag: "astro"
pubDate: 2025-03-03
---

- **Enrutamiento basado en archivos (pages):** Cualquier archivo dentro de `src/pages/` se convierte en una ruta de la web automaticamente.
- **Layouts:** Son componentes contenedores diseñados para envolver el contenido con la estructura común del sitio (como el `<head>`, menus o el pie de pagina).
- **Navegacion avanzada:**
	- **View transitions:** Transiciones animadas entre paginas sin recargar la pantalla completa.
	- **Prefetch:** Precarga automatica de enlaces para que la navegacion entre paginas se sienta instantanea.
	- **Endpoints y middleware:** Rutas de API internas para responder con datos (JSON) y capas intermedias para logica global (Como autenticacion o redirecciones).