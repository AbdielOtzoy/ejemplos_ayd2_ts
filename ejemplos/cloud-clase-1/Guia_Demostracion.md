# Guía de demostración: Docker local y Vercel

La clase dura 100 minutos. Este bloque práctico ocupa 25 minutos (diapositivas 10–13). El docente ejecuta, el grupo anticipa resultados. Ensayar cuenta e integración antes de clase.

## Qué publicamos

Una web estática: HTML, CSS e imagen. `web/` contiene las fuentes v1 y v2. Docker las sirve con Nginx **solo en el equipo local**. Para Vercel, `build.mjs` prepara `public/`. No se despliega el Dockerfile, una VM, Nginx propio ni una función serverless.

`contenido.json` selecciona v1 o v2. El build escribe la etiqueta `vercel` en el HTML, pero esa etiqueta por sí sola no prueba que exista una publicación remota. `version.json` es un archivo estático con información del build.

## Preparativos

- Docker iniciado y navegador local.
- Node.js 22 para ejecutar el build local. El proyecto no requiere dependencias externas ni framework.
- Cuenta Vercel y acceso a un repositorio Git compatible. Usaremos la integración con GitHub del repositorio existente, sin crear un repositorio nuevo durante la clase.
- Material del ejemplo disponible en la rama del repositorio que se conectará a Vercel. Las modificaciones locales no aparecen en Vercel hasta enviarlas a GitHub.
- Permiso para importar el repositorio y crear el proyecto de demostración. Revisar el plan y su adecuación antes de clase. Hobby está limitado a uso personal no comercial; para uso institucional u otro caso, confirmar el plan apropiado.
- Proyecto de demostración independiente de otros proyectos. Nombre sugerido `ads2-cloud-clase1`; si ya existe otro proyecto con ese nombre, elegir uno nuevo y no sustituirlo.

No se ha creado un proyecto Vercel desde la elaboración de estos materiales.

## 1. Docker local, minutos 49–55

Desde la raíz del repositorio:

```bash
cd ejemplos/cloud-clase-1
docker build --build-arg VERSION=v1 --build-arg AMBIENTE=local -t ads2-cloud:v1 .
docker run -d --name ads2-cloud-local --label clase=ads2-cloud-clase1 -p 8080:80 ads2-cloud:v1
curl -fsS http://localhost:8080/health
docker ps --filter name=ads2-cloud-local
docker logs --tail 10 ads2-cloud-local
```

Abrir http://localhost:8080. Esperado: ambiente local, v1, texto, CSS e imagen. El puerto del equipo es 8080 y Nginx escucha en 80 dentro del contenedor. `EXPOSE` no publica el puerto por sí solo.

Antes de repetir, revisar si existe el nombre o si el puerto está ocupado. Solo retirar tu contenedor si esta comprobación devuelve `ads2-cloud-clase1`:

```bash
docker inspect -f '{{ index .Config.Labels "clase" }}' ads2-cloud-local
docker rm -f ads2-cloud-local
```

No retirar otro contenedor ni usar una limpieza global.

## 2. Preparación estática para Vercel

Desde `ejemplos/cloud-clase-1`:

```bash
npm run build
```

Esperado: `Build listo: v1. Archivos estáticos en public/.`. Mostrar `public/index.html`, `styles.css`, `assets/cloud.png` y `version.json`. El directorio `public/` es salida generada y no se sube a Git en este flujo.

Para revisar localmente la salida sin Docker:

```bash
python3 -m http.server 8081 --directory public
```

Abrir http://localhost:8081. Este servidor es de **respaldo local**, no representa cómo Vercel implementa su infraestructura. No puede demostrar HTTPS, CDN ni encabezados `x-vercel-cache` de Vercel. Detenerlo con Ctrl+C al terminar.

## 3. Importación y primer despliegue, minutos 55–64

Preparar el proyecto antes de clase. Durante la demostración, mostrar su configuración y un despliegue ensayado o disparar una nueva publicación válida.

1. En Vercel, Add New, Project. Importar el repositorio de GitHub que contiene el ejemplo.
2. **Root Directory:** `ejemplos/cloud-clase-1`. No elegir la raíz completa del repositorio.
3. **Framework Preset:** Other. No seleccionar Next.js.
4. **Build Command:** `npm run build`.
5. **Output Directory:** `public`.
6. **Node.js:** 22.x. No hacen falta variables de entorno, secretos ni integraciones de base de datos.
7. `vercel.json` contiene la configuración de build y salida. Comprobar que el panel muestre los valores esperados; corregir diferencias antes de clase.
8. Definir la rama de producción. En el repositorio actual es `main`; si utilizas otro repositorio o rama, registrar la elegida y comprobarla en Settings.
9. Deploy. Abrir logs, confirmar build exitoso y estado **Ready**.
10. Abrir la URL HTTPS que Vercel muestre. No inventar un dominio: el nombre disponible lo asigna la plataforma.
11. Verificar HTML, CSS, imagen y `/version.json`. Probar la URL desde una ventana privada o un equipo distinto. Revisar Deployment Protection y permisos del proyecto si solicita iniciar sesión; no cambiar seguridad de otro proyecto.

Vercel ejecuta el build durante el despliegue. Los visitantes reciben archivos ya preparados. Git no se consulta para servir cada visita. El contenedor local tampoco participa en esta URL.

## 4. Fallo local controlado y corrección, minutos 64–67

Antes de publicar una modificación, probar una versión inválida localmente:

```bash
node build.mjs v3
```

Esperado: error `Versión no válida. Usar v1 o v2 en contenido.json.` y salida no exitosa. Leer el mensaje y explicar la hipótesis. El script valida antes de escribir los archivos de salida.

```bash
node build.mjs v2
```

Esperado: build válido. Este argumento cambia la salida **local**, no `contenido.json` ni la selección del próximo despliegue remoto. Explicar la diferencia antes de continuar. No hacer un push de v3 para provocar un error remoto durante clase.

Determinación: observar la evidencia, identificar la entrada inválida y verificar la corrección. Un build local exitoso aún no prueba la disponibilidad remota.

## 5. Publicar v2 y verificar, minutos 67–70

Editar `contenido.json` para que diga:

```json
{ "version": "v2" }
```

```bash
npm run build
```

Abrir localmente y verificar v2. Para publicar, desde la raíz del repositorio, revisar cambios antes de confirmar:

```bash
git diff -- ejemplos/cloud-clase-1/contenido.json
git add ejemplos/cloud-clase-1/contenido.json
git diff --cached
```

Confirmar que el área preparada incluya solo el cambio previsto. No usar `git add .` ni incluir trabajo ajeno. Si se trabaja en la rama de producción `main` y el docente ha decidido publicar:

```bash
git commit -m "Actualizar demo cloud a v2"
git push origin main
```

Estos comandos son para **el ensayo o la demostración del docente**, no se ejecutaron al preparar el material. El resto de archivos necesarios debe haberse publicado durante la preparación inicial.

Observar el nuevo despliegue en Vercel, logs y estado Ready. Abrir la URL de producción, comprobar v2 y consultar `/version.json`. En una rama distinta, el despliegue puede ser preview; mostrar la URL indicada sin asumir que ya actualizó producción. No afirmar que un preview está disponible para todos sin probar su protección.

Para volver a v1 sin depender del plan de rollback: cambiar `contenido.json` a v1, verificar el build y publicar ese cambio válido por el mismo flujo. El tiempo de build y publicación puede variar; si tarda más de dos minutos, seguir con el respaldo y retomar la URL cuando esté lista.

## 6. Arquitectura y CDN, minutos 70–80

Abrir Network y seleccionar HTML, styles.css y assets/cloud.png. Separar:

- Solicitudes de build/deploy del docente: Git, plataforma y logs.
- Solicitudes del visitante: dominio, HTTPS y archivos servidos mediante Vercel CDN.

Mostrar la resolución de dominio como un paso de descubrimiento, no como un proxy que lleva todas las respuestas. Para nuestra web estática no dibujar una función ni un contenedor remoto.

En DevTools o desde terminal:

```bash
curl -I 'https://URL_REAL_DEL_DESPLIEGUE/assets/cloud.png'
```

Sustituir el dominio por el real. Leer Cache-Control y `x-vercel-cache` o Age **si aparecen**. HIT/MISS describe el estado reportado por una capa; no garantizar la secuencia MISS seguida de HIT ni inventar encabezados en el respaldo. Disable cache del navegador no deshabilita toda la CDN. El `nginx.conf` solo configura Nginx local; no gobierna Vercel.

## Diagnóstico

| Síntoma | Qué revisar |
|---|---|
| Build inválido | Versión v1/v2 en contenido.json y mensaje del script |
| Vercel no encuentra archivos | Root Directory, buildCommand y outputDirectory |
| Docker funciona, Vercel no | Fuente publicada, build y logs; no abrir puertos de una VM |
| URL pide autenticación | Tipo de deployment y Deployment Protection |
| Se ve v1 después de publicar v2 | Commit, rama, estado Ready y URL preview/producción |
| Imagen ausente | Petición /assets/cloud.png, estado HTTP y archivo generado |
| No aparece un encabezado de caché | Comentar solo evidencia presente; usar el dibujo para el concepto |

## Costos y cierre

Mostrar plan y Usage del proyecto, sin proyectar información privada de otros proyectos. Revisar transferencia y solicitudes CDN. No estimar costos con horas de una VM porque este ejemplo no crea una.

Al terminar, decidir si conservar el proyecto para la siguiente clase. Si no, verificar nombre y cuenta y eliminar **solo ese proyecto de demostración** en Settings, siguiendo la confirmación que solicite Vercel. Esto retira la URL del ejemplo; no elimina el repositorio GitHub. No borrar la cuenta ni otros proyectos. Conservar las fuentes locales.

Localmente retirar únicamente `ads2-cloud-local`, previa comprobación de etiqueta. No se requiere limpiar máquinas GCP, discos o reglas: no se crearon para este ejemplo.

## Referencias

[Build y salida](https://vercel.com/docs/builds/configure-a-build) · [Git](https://vercel.com/docs/git) · [CDN](https://vercel.com/docs/cdn) · [Caché](https://vercel.com/docs/caching/cache-control-headers) · [Deployments](https://vercel.com/docs/deployments/managing-deployments)
