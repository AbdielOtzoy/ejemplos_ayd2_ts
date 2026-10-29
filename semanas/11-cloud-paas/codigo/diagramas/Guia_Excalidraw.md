# Guía de Excalidraw: Docker local y Vercel

Abrir https://excalidraw.com, menú Open, y elegir `arquitectura.excalidraw`. El PNG es la referencia visual. Para explicar, reconstruirlo por etapas en un lienzo vacío. Conservar las franjas separadas de publicación y visita; usar naranja para aclaraciones. El archivo completo conserva un esquema coherente, aunque no reproduzcas cada posición.

## 1. Ejecución local

Dibujar navegador del docente, Docker local y contenedor Nginx. Conectar y etiquetar `localhost:8080`, `host 8080 → interno 80`.

Decir: “Esta es la alternativa que controlamos en nuestra computadora. Nginx sirve la web dentro de un contenedor”.

Pregunta: “¿Este contenedor se enviará a Vercel?” Respuesta: no, esta publicación reutilizará las fuentes para generar archivos estáticos.

Usar 2 minutos del bloque de arquitectura. Retomar el mapeo al ejecutar Docker.

## 2. Publicación del código

En otra franja dibujar docente, repositorio Git, Vercel build y salida public/. Conectar docente a Git con `git push`. Git a build y build a archivos. Escribir `npm run build` dentro del build.

Decir: “Esta secuencia ocurre cuando publicamos. Node prepara el HTML seleccionado, CSS e imagen. El resultado es un conjunto de archivos”.

Pregunta: “¿El visitante ejecuta este build?” Respuesta: no, consume el resultado ya publicado.

Dedicar 6 minutos. No dibujar el repositorio como backend de la web. La carpeta public/ no es una máquina virtual. Mantener el proceso de build separado de los servidores de entrega.

## 3. Peticiones de los visitantes

En una franja inferior dibujar navegador del estudiante, CDN Vercel y archivos publicados. Etiquetar conexión `HTTPS`. Anotar sobre el navegador “DNS resuelve el dominio”. DNS es una consulta para descubrir dirección, no el camino de todas las respuestas.

Decir: “El visitante recibe contenido desde la infraestructura de entrega de la plataforma. En esta web no hay un contenedor nuestro ni una función serverless”.

Pregunta: “¿Qué parte administra el docente?” Respuesta: código, selección de versión y configuración del proyecto. La plataforma administra publicación y distribución.

Dedicar 7 minutos. Señalar los dos recorridos (publicación y visita) y pedir que el grupo los siga. El almacenamiento es una representación lógica; no afirmar que conocemos la topología interna de Vercel.

## 4. CDN y caché

Durante los 10 minutos de CDN, añadir HIT dentro de la CDN y MISS como necesidad de obtener contenido en la plataforma. Usar dos colores. Conservar la relación con los archivos del despliegue, sin añadir una VM de origen nuestra.

Decir: “HIT y MISS son estados conceptuales de una capa de caché. Veremos qué evidencia reporta la respuesta real”.

Preguntas: “¿Cache del navegador y CDN son lo mismo?” No, están en capas distintas. “¿Tiene que aparecer MISS en la primera petición que hagamos?” No, el recurso puede estar disponible y la respuesta depende de la capa y la ruta.

Si inspeccionas Network, leer encabezados presentes, no fabricar ni prometer valores. Desactivar la caché en DevTools no desactiva toda la CDN. No dibujar funciones para este ejemplo; explicarlas solo como extensión posible.

## 5. Consumo y responsabilidades

Durante costos, anotar transferencia, solicitudes y límites del plan. Recordar que servir contenido cacheado también transfiere datos al visitante. Usar Costos.md para el ejercicio de 2 MB por visita.

Pregunta: “¿Qué reduce consumo sin cambiar la funcionalidad?” Respuestas: reducir el peso de imagen y otros archivos, evitar descargas innecesarias y revisar Usage.

Cierre: pedir una explicación del proceso de publicación, otra del recorrido de peticiones y una decisión de costos. En la siguiente clase se puede comparar con IaaS y ubicar Terraform/Ansible junto a una VM administrada por el equipo; no dentro del recorrido HTTP de Vercel.
