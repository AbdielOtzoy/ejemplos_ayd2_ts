# Guion docente: despliegue en una PaaS con Vercel

100 minutos. Demostración del docente con preguntas. Estudiantes con Docker y Linux básicos.

## Preparación y propósito

Abrir presentación, Excalidraw, terminal local y Vercel. Ensayar previamente la cuenta, la integración Git y una publicación válida. La clase separa dos recorridos: publicar código y atender peticiones. Docker se demuestra localmente; Vercel recibe archivos preparados por un build.

**Competencia del material de referencia:** Implementa y gestiona soluciones tecnológicas mediante el uso de la computación en la nube, garantizando la disponibilidad, escalabilidad y eficiencia en la administración de infraestructuras y servicios. Aplica buenas prácticas en el diseño, despliegue y gestión de entornos cloud, asegurando la seguridad, flexibilidad y control centralizado de los sistemas, así como la reproducibilidad y sostenibilidad de las operaciones tecnológicas en organizaciones modernas.

**Valor:** determinación, observando errores de build, planteando una hipótesis y verificando la corrección.

## 1. Despliegue en una PaaS

**Duración:** 2 min. **Ventana:** 0–2 min.

**Objetivo:** Una web del curso en Docker local y Vercel

**Explicación sugerida**

Hoy publicaremos la web del curso en Vercel. Primero veremos cómo se ejecuta dentro de Docker localmente. Después entregaremos archivos a una plataforma que administra su publicación y distribución. El hilo conductor es la misma web, pero las responsabilidades cambian. Seguiremos tanto el proceso de despliegue como las peticiones de los visitantes.

**Pregunta:** ¿Qué parte del despliegue preferirían que administrara una plataforma?

**Respuesta esperada:** El servidor, la publicación, el certificado y la distribución, conservando responsabilidad sobre nuestro código.

**Transición:** Primero revisemos la competencia y el valor de la clase.

**Referencia:** https://vercel.com/docs/cdn

## 2. Competencia y determinación

**Duración:** 4 min. **Ventana:** 2–6 min.

**Objetivo:** Gestionar soluciones cloud con disponibilidad, escalabilidad y reproducibilidad

**Explicación sugerida**

La competencia del curso incluye implementar y gestionar soluciones mediante computación en la nube, con disponibilidad, escalabilidad, eficiencia, seguridad y reproducibilidad. Hoy trabajaremos una primera parte: comprender un despliegue pequeño y sus responsabilidades. Una sola máquina no garantiza alta disponibilidad. El valor es determinación: ante un error, vamos a formular una hipótesis y comprobarla. Corregir un puerto con evidencia muestra mejor este valor que repetir comandos al azar.

**Pregunta:** ¿Una aplicación que abrió una vez ya está lista para producción?

**Respuesta esperada:** No. Faltan decisiones de disponibilidad, seguridad, observabilidad y operación.

**Transición:** Veamos el problema que conecta toda la clase.

**Qué mostrar:** Relacionar la competencia con la práctica sin prometer que una VM satisface todos sus aspectos.

## 3. Agenda y problema inicial

**Duración:** 4 min. **Ventana:** 6–10 min.

**Objetivo:** Nube y responsabilidades · 20 min

**Explicación sugerida**

La web funciona en localhost. Necesitamos publicarla y actualizarla. Yo ejecutaré el ejemplo y ustedes anticiparán resultados. Alternaremos presentación, dibujo y terminal. En Vercel enviaremos código mediante Git y la plataforma preparará un despliegue. Durante las peticiones de los estudiantes, Git y el proceso de build ya no participan. Reservaremos el cierre para justificar responsabilidades y costos.

**Pregunta:** ¿Qué debería conservarse al mover la aplicación a otro equipo?

**Respuesta esperada:** Los archivos y la lógica de presentación. La plataforma se encarga del entorno de publicación; el Dockerfile describe solo la ejecución local.

**Transición:** Comencemos por qué caracteriza a la nube.

## 4. Computación en la nube

**Duración:** 6 min. **Ventana:** 10–16 min.

**Objetivo:** Recursos disponibles bajo demanda

**Explicación sugerida**

Consumimos recursos como cómputo, almacenamiento y redes a través de servicios. El autoservicio permite pedirlos cuando se necesitan. La elasticidad permite ajustar capacidad, pero nuestra aplicación necesita configuración para aprovecharla. El uso se mide y puede facturarse por distintos componentes. Tener una página en Internet no basta para describir toda la nube. En nuestro caso pediremos una máquina y seguiremos administrando su software.

**Pregunta:** ¿Crear una VM hace que nuestra web escale automáticamente?

**Respuesta esperada:** No. Crear una VM proporciona capacidad. El escalado requiere diseño y configuración adicionales.

**Transición:** Comparemos quién hace el trabajo en cada entorno.

**Referencia:** https://www.nist.gov/publications/nist-definition-cloud-computing?pub_id=909616

## 5. Infraestructura local y cloud

**Duración:** 5 min. **Ventana:** 16–21 min.

**Objetivo:** Local: compras y mantienes el equipo

**Explicación sugerida**

Con infraestructura propia, la organización decide y mantiene hardware, energía y espacio. En cloud el proveedor gestiona la infraestructura física, pero nuestras responsabilidades dependen del servicio. Podemos comenzar sin comprar un servidor. Eso no garantiza un costo total menor: el consumo continuo, el tráfico, la operación y los recursos olvidados también cuentan. No es una competencia con un ganador universal. Elegimos según restricciones y necesidades.

**Pregunta:** ¿En la nube desaparece el trabajo de mantenimiento?

**Respuesta esperada:** Parte pasa al proveedor. El resto depende del modelo elegido.

**Transición:** Esa distribución de trabajo define los modelos de servicio.

**Referencia:** https://www.nist.gov/publications/nist-definition-cloud-computing?pub_id=909616

## 6. Responsabilidades por modelo

**Duración:** 5 min. **Ventana:** 21–26 min.

**Objetivo:** IaaS: administras sistema operativo y aplicación

**Explicación sugerida**

Piensen en una aplicación, su entorno de ejecución, el sistema operativo y la infraestructura física. En IaaS seguimos administrando el sistema operativo y lo que instalamos. En PaaS el proveedor administra más del entorno, mientras nosotros nos ocupamos del código y su configuración. En SaaS usamos software terminado y administramos aspectos como cuentas y datos. Los contratos concretos pueden variar. Una comparación de responsabilidades resulta más útil que memorizar las siglas.

**Pregunta:** ¿Dónde ubicarían una VM en la que instalamos Docker?

**Respuesta esperada:** En IaaS. Seguimos configurando el sistema operativo y el software del servidor.

**Transición:** Apliquemos esta comparación a servicios conocidos.

**Referencia:** https://www.nist.gov/publications/nist-definition-cloud-computing?pub_id=909616

## 7. Elección para nuestro ejemplo

**Duración:** 4 min. **Ventana:** 26–30 min.

**Objetivo:** IaaS: Compute Engine, administrar una VM

**Explicación sugerida**

Podemos publicar nuestra aplicación en una máquina de Compute Engine y administrar Ubuntu, Docker y la red. Ahora elegiremos Vercel como ejemplo de plataforma administrada: entregamos archivos y configuración y la plataforma gestiona la publicación. Google Workspace representa software que consumimos terminado. Vercel también puede ejecutar aplicaciones dinámicas, pero nuestra web es estática y no necesita funciones. Conservamos Docker para aprender empaquetado local. No enviaremos una imagen de Nginx para ejecutar un contenedor en Vercel.

**Pregunta:** ¿Qué cambia al elegir Vercel frente a la VM?

**Respuesta esperada:** Delegamos la infraestructura de publicación. Seguimos preparando contenido, configuración del proyecto y versiones.

**Transición:** Distingamos cómo publicamos de cómo los usuarios visitan la web.

**Referencia:** https://vercel.com/docs/builds/configure-a-build; https://vercel.com/docs/cdn

## 8. Arquitectura de publicación

**Duración:** 8 min. **Ventana:** 30–38 min.

**Objetivo:** Docente: código y cambio de versión

**Explicación sugerida**

En Excalidraw dibujo una primera franja con docente, repositorio Git y Vercel. Una flecha de publicación representa el push. Vercel recibe la versión de código y ejecuta npm run build. Nuestro build copia HTML, CSS e imagen a public y coloca la etiqueta de ambiente. Estos archivos componen el despliegue estático. La preparación usa Node durante el build. Eso no significa que Node esté ejecutando un servidor para cada visitante. Git participa en la publicación, no en cada solicitud de la web.

**Pregunta:** ¿Cada visitante obliga a Git a descargar el repositorio y ejecutar el build?

**Respuesta esperada:** No. El build ocurre al desplegar. Los visitantes reciben archivos del despliegue ya preparado.

**Transición:** Dibujemos ahora el recorrido que sí ocurre en cada visita.

**Qué mostrar:** Abrir Excalidraw y dibujar etapas 1 y 2. Marcar public/ como salida, no como servidor.

**Referencia:** https://vercel.com/docs/git; https://vercel.com/docs/builds/configure-a-build

## 9. Arquitectura de una visita

**Duración:** 7 min. **Ventana:** 38–45 min.

**Objetivo:** Navegador: resolver dominio y abrir HTTPS

**Explicación sugerida**

Dibujo otra franja separada: navegador del estudiante, resolución DNS, conexión HTTPS y CDN de Vercel. DNS permite encontrar la dirección del dominio; no lo dibujamos como un servidor que transporta todo el contenido de la página. Vercel entrega los archivos publicados. En una web estática no tenemos un proceso Nginx propio atendiendo a los usuarios remotos. El navegador solicita HTML, CSS e imagen. El almacenamiento del despliegue es una representación lógica de la plataforma, no una VM que administramos.

**Pregunta:** ¿Dónde está nuestro contenedor Docker en la visita a Vercel?

**Respuesta esperada:** Solo existe en la ejecución local; la publicación remota de esta práctica usa archivos estáticos.

**Transición:** Veamos Docker para entender esa ejecución local.

**Qué mostrar:** Dibujar etapa 3. Diferenciar publicación y petición con dos colores y etiquetas.

**Referencia:** https://vercel.com/docs/cdn

## 10. Imagen y contenedor

**Duración:** 4 min. **Ventana:** 45–49 min.

**Objetivo:** Imagen: archivos y configuración para ejecutar

**Explicación sugerida**

La imagen local incluye Nginx y los archivos de la web. Un contenedor es una instancia en ejecución de esa imagen. En Docker publicamos el puerto 8080 del equipo hacia el 80 de Nginx. En Vercel reutilizamos los archivos fuente, pero su build produce un directorio public. No reutilizamos el proceso Nginx ni el mapeo de puertos. El entorno de build y el entorno que responde peticiones cumplen funciones distintas.

**Pregunta:** ¿Vercel ejecuta el Dockerfile de esta demostración?

**Respuesta esperada:** No. Este proyecto prepara archivos estáticos con npm run build.

**Transición:** Hagamos visible la primera versión.

**Referencia:** https://docs.docker.com/get-started/docker-overview

## 11. Ejecución local

**Duración:** 6 min. **Ventana:** 49–55 min.

**Objetivo:** Construir ads2-cloud:v1

**Explicación sugerida**

Construimos v1 con ambiente local y ejecutamos el contenedor en localhost:8080. Nginx entrega HTML, CSS e imagen. Mostramos el mapeo 8080:80 y consultamos los registros. Es un repaso breve de Docker. Luego preparo la misma web con npm run build y explico que ese resultado es lo que publicará Vercel. Se puede comparar el contenido sin atribuirle la misma infraestructura.

**Pregunta:** ¿localhost en la computadora de un estudiante apunta a mi computadora?

**Respuesta esperada:** No. Localhost hace referencia al propio equipo del estudiante.

**Transición:** Necesitamos una dirección accesible fuera de esta computadora.

**Qué mostrar:** Seguir sección Docker local de Guia_Demostracion.md; mostrar 8080:80 y la web v1. Retomar Vercel después de seis minutos.

**Referencia:** https://docs.docker.com/engine/network/port-publishing/

## 12. Despliegue en Vercel

**Duración:** 9 min. **Ventana:** 55–64 min.

**Objetivo:** Repositorio y directorio del ejemplo

**Explicación sugerida**

La cuenta y la conexión Git se preparan antes de clase. Importamos el repositorio en Vercel y elegimos semanas/11-cloud-paas/codigo como Root Directory. El preset es Other; la salida public contiene únicamente los archivos que queremos entregar. Revisamos el build y el estado Ready. Abrimos la URL HTTPS del proyecto. Esta URL debe consultarse también fuera de la sesión del docente para comprobar el acceso del grupo. Un preview puede estar protegido; no confundamos una pantalla de autenticación con un fallo de la web.

**Pregunta:** ¿Qué pasa si la salida apunta a otra carpeta?

**Respuesta esperada:** La plataforma puede no encontrar los archivos esperados o fallar el build. Revisamos configuración y registros.

**Transición:** Actualicemos una versión y practiquemos el diagnóstico.

**Qué mostrar:** Mostrar configuración, logs, estado Ready y URL real. Consultar la guía; si no hay conexión, usar respaldo marcado como ilustrativo.

**Referencia:** https://vercel.com/docs/builds/configure-a-build; https://vercel.com/docs/git

## 13. Actualización y diagnóstico

**Duración:** 6 min. **Ventana:** 64–70 min.

**Objetivo:** Cambio de v1 a v2 en contenido.json

**Explicación sugerida**

Primero invoco el build local con v3 para provocar un error claro sin publicar código defectuoso. Leemos el mensaje: solo admite v1 o v2. Corregimos y construimos v2. Después cambiamos contenido.json a v2, publicamos ese cambio mediante Git y observamos el despliegue. Comprobamos que el estado sea Ready y que la URL de producción muestre v2. Hay dos versiones de contenido, no dos servidores administrados por nosotros. Preview permite revisar un despliegue antes de publicarlo según el flujo configurado. Para volver a v1 basta con publicar un cambio válido que la seleccione.

**Pregunta:** ¿Qué verificamos antes de afirmar que la actualización está disponible?

**Respuesta esperada:** Build exitoso, estado del despliegue, URL correcta y contenido visible v2.

**Transición:** Veamos qué aporta la CDN incluida en esta publicación.

**Qué mostrar:** Ejecutar node build.mjs v3 para el error local. Restaurar producción solo con un build válido; no hacer git add . ni publicar cambios ajenos.

**Referencia:** https://vercel.com/docs/git; https://vercel.com/docs/deployments/managing-deployments

## 14. CDN y archivos publicados

**Duración:** 5 min. **Ventana:** 70–75 min.

**Objetivo:** Vercel incorpora una CDN al despliegue

**Explicación sugerida**

En este caso la CDN ya forma parte del servicio de publicación. Vercel puede servir la web estática desde su red sin invocar una función propia. Dibujamos la CDN y una representación lógica de los archivos de cada despliegue. El origen general de contenido sigue siendo un concepto útil, pero no lo representamos como una VM nuestra. No todas las aplicaciones en Vercel son estáticas: si agregáramos funciones, habría un recorrido adicional que no implementamos en esta clase.

**Pregunta:** ¿Nuestra web necesita una función para entregar el HTML?

**Respuesta esperada:** No. El HTML ya existe como archivo del despliegue.

**Transición:** Comparemos caché del navegador con caché de la plataforma.

**Qué mostrar:** Dibujar etapa 4. El almacenamiento es un componente lógico; no afirmar que describe los servidores internos de Vercel.

**Referencia:** https://vercel.com/docs/cdn

## 15. Caché y evidencia

**Duración:** 5 min. **Ventana:** 75–80 min.

**Objetivo:** HIT: respuesta desde una copia disponible

**Explicación sugerida**

La caché del navegador está en el equipo de cada estudiante. La caché CDN está en la plataforma. Podemos inspeccionar Cache-Control, Age si aparece y x-vercel-cache si la respuesta lo incluye. No garantizamos ver MISS y después HIT: el resultado depende de la ruta, del despliegue, del punto de presencia y de las reglas. Desactivar la caché en DevTools afecta el navegador y puede modificar encabezados de la petición, no apaga automáticamente la CDN. Para enseñar las dos rutas usamos el dibujo y comentamos la evidencia real sin inventarla.

**Pregunta:** ¿Disable cache en DevTools deshabilita la CDN para todo el mundo?

**Respuesta esperada:** No. Afecta la prueba del navegador y puede cambiar cómo solicita o revalida el recurso.

**Transición:** El uso de la plataforma también tiene límites y costos.

**Qué mostrar:** Abrir Network, solicitar assets/cloud.png y leer solo encabezados presentes. No fabricar valores de caché en el respaldo.

**Referencia:** https://vercel.com/docs/caching/cache-control-headers; https://vercel.com/docs/cdn

## 16. Consumo en una PaaS

**Duración:** 5 min. **Ventana:** 80–85 min.

**Objetivo:** Transferencia de datos y solicitudes CDN

**Explicación sugerida**

En una plataforma administrada seguimos teniendo consumo, aunque no elijamos una VM o su disco. En esta web miramos principalmente transferencia y solicitudes a la CDN, además de límites de build. No usamos funciones ni optimización dinámica de imágenes. Los costos y límites dependen del plan y de la cuenta. Hobby es una opción de uso personal no comercial con límites, no un recurso ilimitado. Revisaremos Usage y el plan antes de decidir cómo usar la cuenta en la clase.

**Pregunta:** ¿Una web sin funciones puede generar consumo?

**Respuesta esperada:** Sí. Servir archivos consume transferencia y solicitudes, y los builds tienen límites.

**Transición:** Estimemos el efecto del tamaño de nuestros recursos.

**Referencia:** https://vercel.com/docs/plans/hobby; https://vercel.com/docs/manage-cdn-usage

## 17. Escenarios y control

**Duración:** 5 min. **Ventana:** 85–90 min.

**Objetivo:** 10 000 visitas × 2 MB = 20 GB

**Explicación sugerida**

Usamos un supuesto didáctico de dos megabytes transferidos por visita completa y tres solicitudes: HTML, CSS e imagen. Diez mil visitas equivalen a veinte gigabytes y treinta mil solicitudes; cien mil, a doscientos gigabytes y trescientas mil solicitudes. Es un cálculo decimal, sin reutilización de caché local. No es una medición del sitio ni una factura. Lo comparamos con las cuotas publicadas de Hobby y recordamos que el consumo se comparte con otros proyectos de la cuenta. El exceso no se interpreta como una tarifa automática del plan Hobby. Para controlar consumo podemos reducir la imagen, revisar Usage y eliminar el proyecto de demostración cuando no se necesite.

**Pregunta:** ¿Una imagen diez veces más pesada afecta el consumo aunque el HTML sea el mismo?

**Respuesta esperada:** Sí. Si se descarga en cada visita, aumenta la transferencia asociada al recurso.

**Transición:** Cerremos justificando la elección de plataforma.

**Qué mostrar:** Abrir Costos.md. Hobby publicado: 100 GB de Fast Data Transfer y 1 000 000 de CDN Requests. Revisar vigencia antes de clase.

**Referencia:** https://vercel.com/docs/plans/hobby; https://vercel.com/docs/manage-cdn-usage

## 18. Actividad y siguiente clase

**Duración:** 10 min. **Ventana:** 90–100 min.

**Objetivo:** Justificar la elección de IaaS o PaaS

**Explicación sugerida**

En parejas o de manera oral, expliquen por qué una plataforma administrada resulta adecuada para esta web. Dibujen dos recorridos: el código se publica mediante Git y build; el usuario solicita archivos mediante HTTPS y CDN. Ubiquen Docker en la alternativa local. Nombren dos consumos y una acción concreta para controlarlos. En la siguiente clase podemos contrastar esta delegación con una VM: Terraform podría crear infraestructura y Ansible configurar un servidor. No instalamos Ansible en Vercel para administrar máquinas de su plataforma.

**Pregunta:** ¿Qué automatiza Vercel y qué estudiaríamos con Terraform y Ansible en una VM?

**Respuesta esperada:** Vercel automatiza el flujo de publicación integrado; en IaaS estudiaríamos creación de infraestructura y configuración de servidores.

**Transición:** Conservar el dibujo para comparar responsabilidades en la siguiente clase.

**Qué mostrar:** 3 minutos pensar, 3 compartir, 2 respuesta modelo, 2 preguntas. Consultar Actividad.md.

**Referencia:** https://vercel.com/docs/git

## Aclaraciones que conviene mantener

Vercel es el ejemplo de plataforma administrada de esta clase. Nuestra publicación es estática. Node ejecuta el build, Docker ejecuta la alternativa local y Git almacena versiones. Ninguno de estos tres procesos atiende cada petición de un visitante del despliegue estático. La CDN forma parte de la plataforma. No hemos comprobado infraestructura interna de Vercel: el dibujo es lógico.

## Si falla la conexión

Continuar con el build local y el recorrido de respaldo. Explicar que la etiqueta vercel representa el destino previsto; la captura local no demuestra que exista un despliegue remoto. Conservar la actividad final y reducir las preguntas adicionales.
