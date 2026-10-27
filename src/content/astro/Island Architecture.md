---
title: "Astro Components"
description: "Amegos"
tag: "astro"
pubDate: 2025-03-03
---

En lugar de enviar todo el JavaScript de la aplicacion al navegador, Astro convierte la pagina en HTML estatico por defecto y trata los componentes interactivos como "islas" independientes.

**Buenas practicas:** Cada isla se hidrata de forma aislada solo cuando es estrictamente necesario, manteniendo la carga inicial de JavaScript al minimo. Además Astro proporciona patrones para compartir estado entre distintas islas si necesitan comunicarse entre si.