# Clase 1: despliegue en una PaaS con Vercel

100 minutos. El docente demuestra y los estudiantes participan con preguntas. Conocen Docker y Linux básicos.

## Hilo conductor

La misma web tiene dos formas de publicación: Docker y Nginx **localmente**, y archivos estáticos en **Vercel**. La clase diferencia el proceso Git/build/deploy del recorrido navegador/HTTPS/CDN/archivos. No se crea una VM en GCP ni se sube una imagen Docker a Vercel.

## Materiales

| Material | Uso |
|---|---|
| [Presentación editable, 18 diapositivas](<../Semana 11 - Cloud_Clase_1.pptx>) | Proyectar conceptos y arquitectura |
| [Guion docente](../Guion_Cloud_Clase_1.md) | Narración, tiempos, preguntas y respuestas |
| [Guía de demostración](Guia_Demostracion.md) | Docker local, configuración Vercel, diagnóstico, v2 y cierre |
| [Diagrama editable](diagramas/arquitectura.excalidraw) | Abrir en Excalidraw |
| [Referencia PNG](diagramas/arquitectura.png) | Consultar la arquitectura |
| [Guía de dibujo](diagramas/Guia_Excalidraw.md) | Construir el dibujo por etapas |
| [Costos](Costos.md) | Transferencia, solicitudes, cuotas y ejercicio |
| [Actividad y respuesta modelo](Actividad.md) | Cierre de diez minutos |
| [Recorrido de respaldo](respaldo/recorrido.html) | Recursos locales para continuar sin Internet |
| [Uso del respaldo](respaldo/Respaldo_Visual.md) | Diferenciar evidencia local de publicación remota |

## Ensayo previo

1. Leer guion y presentación. Ensayar los dos recorridos del dibujo.
2. Ejecutar Docker local para el repaso de imagen, contenedor y puerto.
3. Preparar la salida estática y probar v1, error v3 y v2.
4. Tener los archivos fuente publicados en el repositorio Git conectado a Vercel.
5. Importar el proyecto con raíz `semanas/11-cloud-paas/codigo`, preset Other, build `npm run build` y salida `public`.
6. Comprobar URL HTTPS, acceso del grupo, rama de producción y una actualización válida.
7. Revisar Usage, plan y condiciones vigentes. Abrir el respaldo como alternativa.

## Salida estática local

Desde esta carpeta, con Node.js 22:

```bash
npm run build
python3 -m http.server 8081 --directory public
```

Abrir http://localhost:8081. El servidor local es para comprobación, no reproduce HTTPS ni CDN de Vercel. `contenido.json` elige v1/v2 para el próximo build. Para publicar v2 hay que enviar ese cambio por el flujo Git del proyecto; cambiar una etiqueta local no despliega.

## Docker local

```bash
docker build --build-arg VERSION=v1 --build-arg AMBIENTE=local -t ads2-cloud:v1 .
docker run -d --name ads2-cloud-local --label clase=ads2-cloud-clase1 -p 8080:80 ads2-cloud:v1
```

Abrir http://localhost:8080. La guía indica cómo repetir y limpiar sin tocar contenedores ajenos. `nginx.conf` solo gobierna esta ejecución local. `/health` corresponde a Nginx local; en Vercel comprobamos archivos publicados, incluido `/version.json`.

## Alcance y verificación

- Web estática sin framework, dependencias externas, funciones ni base de datos.
- Preparación de v1/v2 y rechazo de v3 comprobados localmente; el build inválido no modifica la salida.
- Docker local y recursos web comprobados. Archivo de Excalidraw abierto y PNG exportado desde el editor.
- Presentación revisada con 18 diapositivas y notas.
- No se crearon proyectos ni se publicó en Vercel durante la elaboración. El docente debe ensayar cuenta, integración y despliegue real.
- El respaldo muestra ejecuciones locales y configuración ilustrativa. La etiqueta `vercel` no prueba ubicación remota.
- Terraform y Ansible quedan para comparar automatización en IaaS en la siguiente clase; no se usan para administrar servidores internos de Vercel.

## Referencias

[Build](https://vercel.com/docs/builds/configure-a-build) · [Git](https://vercel.com/docs/git) · [CDN](https://vercel.com/docs/cdn) · [Hobby](https://vercel.com/docs/plans/hobby) · [Consumo CDN](https://vercel.com/docs/manage-cdn-usage)
