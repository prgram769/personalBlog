--- 
title: "Frameworks front-end compatibility"  
tag: "astro" 
pubDate: 2026-10-29
---

- **Agnostico respecto a librerias:** Puedes usar React, Vue, Svelte, Preact, SolidJS o Alpine.js dentro del mismo proyecto.
- **Directivas de cliente (client:{componente}):*** Te permiten controlar exactamente cuando se descarga e hidrata cada componente de framework (por ejemplo, `client:load`, `client:visible` o `client:only`)