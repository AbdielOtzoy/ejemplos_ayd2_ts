# Actividad final y respuesta modelo

10 minutos: 3 pensar, 3 compartir, 2 respuesta modelo y 2 dudas.

## Consigna

Una web del curso cambia cada semana. Elige IaaS o una plataforma administrada como Vercel y justifica quién administrará cada parte. Dibuja dos recorridos: publicación de código y visita de un estudiante. Ubica Docker y la CDN. Identifica dos consumos y una acción para controlarlos.

## Respuesta modelo para Vercel

El equipo prepara HTML, CSS e imagen y los versiona en Git. Un cambio publicado dispara el build de Vercel, que prepara public/ y genera un despliegue. El estudiante resuelve el dominio y solicita archivos por HTTPS; la CDN de Vercel los entrega. Git y build no se ejecutan por cada visita. Node trabaja durante el build, no como servidor propio de esta web estática. Docker y Nginx corresponden al ejemplo local y no forman parte de la publicación remota.

Delegamos infraestructura de publicación y distribución, conservando código y configuración. Transferencia y solicitudes son consumos relevantes. Reducir imágenes y revisar Usage ayudan a controlarlos. Los límites dependen del plan y del consumo agregado.

## Alternativa válida para IaaS

Una VM ofrece control sobre sistema operativo y software, pero exige administrarlos. Allí podríamos instalar Docker y usar Nginx. Terraform y Ansible serían pertinentes para automatizar infraestructura y configuración. Es una alternativa para comparar responsabilidades, no el despliegue de esta sesión.

## Criterios

- Separan publicación y peticiones del visitante.
- No ubican Git en el recorrido de cada visita.
- Ubican Docker localmente o en una alternativa IaaS, sin dibujarlo como contenedor propio en Vercel.
- Describen archivos estáticos sin añadir funciones que no existen.
- Reconocen consumo y límites aunque el plan incluya recursos.

## Salida rápida

¿Quién sirve la web publicada? La infraestructura de entrega de Vercel.
¿Quién instala Nginx para esa URL? No instalamos Nginx propio en Vercel para este ejemplo.
¿Un argumento local v2 publica automáticamente? No, hay que cambiar la selección y publicar por el flujo configurado.
¿Dónde tendría sentido usar Ansible? En un servidor que administramos, como una VM IaaS.
