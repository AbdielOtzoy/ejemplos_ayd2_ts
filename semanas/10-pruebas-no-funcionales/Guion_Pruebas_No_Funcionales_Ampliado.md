# Guion didáctico de exposición: Pruebas no funcionales

Este guion está pensado para explicar el tema con tus propias palabras. No es necesario leerlo literalmente: úsalo como una guía para desarrollar las ideas, contar los ejemplos y hacer participar al grupo.

## Recomendación general para exponer

Procura explicar cada concepto siguiendo esta secuencia:

1. Presenta la idea en palabras sencillas.
2. Relaciónala con una situación de la vida real.
3. Llévala al contexto de un sistema de software.
4. Cierra con una pregunta o una conclusión breve.

La idea que debe quedar durante toda la presentación es esta: **una aplicación no solo debe hacer lo correcto; también debe hacerlo con una calidad adecuada para las personas que la utilizan.**

---

## 1. Portada

### Intención de la diapositiva

Presentar el tema y despertar la idea de que la calidad de un sistema va más allá de que sus botones funcionen.

### Guion sugerido

“Buenos días/tardes. Hoy vamos a hablar de las pruebas no funcionales. Antes de explicar los tipos de pruebas, quiero plantear una pregunta: ¿basta con que una aplicación tenga todas sus funciones para decir que es buena?”

“Imaginemos una aplicación de compras que permite buscar productos, agregarlos al carrito y pagar. En teoría, sus funciones pueden estar correctas. Pero si cada pantalla tarda un minuto en cargar, si se cae cuando entran muchas personas o si no funciona en el celular, probablemente el usuario no la considerará una buena aplicación.”

“Por eso, las pruebas no funcionales se enfocan en el comportamiento y la calidad del sistema: qué tan rápido responde, cuánto trabajo soporta, cómo reacciona ante una sobrecarga y en qué entornos puede funcionar.”

### Analogía

Una casa puede tener todas las habitaciones que aparecen en el plano, pero eso no garantiza que sea cómoda. También importa si tiene buena iluminación, ventilación, seguridad y si resiste las condiciones del lugar. Las pruebas no funcionales revisan esas cualidades del software.

### Transición

“Con esta idea en mente, revisemos el recorrido que seguiremos durante la exposición.”

---

## 2. Agenda

### Intención de la diapositiva

Explicar el orden de la presentación y mostrar que habrá una progresión: concepto, ejemplo, medición, arquitectura, tipos de prueba y aplicación.

### Guion sugerido

“Comenzaremos con un espacio para resolver dudas del proyecto. Después definiremos qué son las pruebas no funcionales y las compararemos con las pruebas funcionales usando una tienda en línea.”

“Luego veremos los conceptos y principios que permiten diseñar una prueba útil. Aprenderemos a pasar de una pregunta general, como ‘¿el sistema es rápido?’, a un criterio concreto que pueda medirse.”

“También relacionaremos estas pruebas con la arquitectura de software. Después estudiaremos carga, estrés, escalabilidad y portabilidad, veremos un recurso práctico llamado Locust y cerraremos con un mini caso para comprobar si podemos distinguir cada tipo.”

### Sugerencia didáctica

Puedes decirle al grupo que no intente memorizar las definiciones desde el inicio. La clave será identificar **qué cambia en cada situación**: la cantidad de usuarios, el límite de operación, la capacidad del sistema o el entorno.

### Transición

“Antes de entrar a la teoría, aprovechemos el primer espacio para resolver las dudas que puedan afectar el proyecto.”

---

## 3. Dudas del proyecto

### Intención de la diapositiva

Separar el espacio de consulta del contenido principal y permitir que el grupo conecte el tema con su propio proyecto.

### Guion sugerido

“En este momento hablaremos de las dudas del proyecto. Podemos aprovecharlo para revisar requisitos, entregables, decisiones de diseño o cualquier punto que esté bloqueando el avance.”

“También podemos pensar desde ahora qué atributos de calidad podrían ser importantes para nuestro sistema. Por ejemplo: ¿necesitamos que responda rápido?, ¿esperamos muchos usuarios?, ¿se utilizará en diferentes dispositivos?, ¿qué pasaría si la demanda aumenta?”

“Estas preguntas nos servirán después para entender que las pruebas no funcionales no se eligen al azar. Se seleccionan de acuerdo con los riesgos y con el contexto del proyecto.”

### Pregunta para el grupo

“¿Qué sería peor para nuestro proyecto: que una función no haga lo esperado, o que funcione pero se vuelva demasiado lenta cuando la utilicen varias personas? La respuesta dependerá del sistema, y justamente por eso debemos identificar sus riesgos.”

### Transición

“Una vez atendidas las dudas, definamos exactamente qué significa probar aspectos no funcionales.”

---

## 4. ¿Qué son las pruebas no funcionales?

### Idea central

Las pruebas funcionales revisan **qué hace** el sistema. Las pruebas no funcionales revisan **cómo lo hace**.

### Guion sugerido

“Una prueba funcional puede comprobar que, al ingresar usuario y contraseña correctos, el sistema permita iniciar sesión. Es una pregunta sobre una función concreta: ¿el resultado es el esperado?”

“Una prueba no funcional hace preguntas diferentes sobre ese mismo inicio de sesión: ¿cuánto tarda en responder?, ¿sigue funcionando si se conectan mil personas?, ¿se comporta igual en un navegador y en otro?, ¿qué ocurre si el servidor recibe más solicitudes de las que puede procesar?”

“Entonces, la diferencia no es que unas pruebas sean importantes y las otras no. Ambas son necesarias, pero observan dimensiones distintas de la calidad.”

### Analogía de la vida real

“Pensemos en un ascensor. Una prueba funcional comprobaría que sube y baja cuando presionamos un botón. Una prueba no funcional preguntaría si sube en un tiempo razonable, si soporta el peso indicado, si sigue siendo seguro durante un uso intenso y si funciona con diferentes condiciones de energía o mantenimiento.”

### Frase para reforzar

“Que una función funcione no significa automáticamente que la experiencia sea aceptable.”

### Pregunta para el grupo

“Si una aplicación permite hacer una transferencia, pero tarda cinco minutos en confirmar el resultado, ¿diríamos que funciona bien? Funcionalmente puede completar la operación; desde el punto de vista no funcional, probablemente existe un problema de rendimiento o de experiencia.”

### Transición

“Ahora llevemos esta diferencia a un ejemplo concreto y cercano: una tienda en línea.”

---

## 5. Ejemplo práctico: una tienda en línea

### Intención de la diapositiva

Mostrar que las pruebas funcionales y no funcionales pueden aplicarse al mismo sistema, pero responden preguntas diferentes.

### Guion sugerido

“En una tienda en línea, una prueba funcional verificaría que la búsqueda encuentre un producto, que el carrito calcule el total y que el pago registre la compra.”

“Pero imaginemos que la búsqueda sí encuentra el producto, aunque tarda veinte segundos. O que el pago funciona cuando hay pocos usuarios, pero falla durante una promoción. También puede ocurrir que la página se vea bien en una computadora, pero sea imposible utilizarla desde un celular.”

“En esos casos, la función existe, pero la calidad del servicio no es suficiente. Las pruebas no funcionales nos ayudan a descubrir esa diferencia antes de que el usuario la sufra.”

### Analogía de la vida real

“Es como un restaurante. Una prueba funcional sería confirmar que el cliente recibió el plato que pidió. Pero la experiencia completa también depende de cuánto esperó, si el restaurante puede atender a muchas personas, si mantiene la calidad en hora pico y si el servicio funciona igual en diferentes sucursales.”

### Ejemplo aplicado

“Podríamos plantear estas preguntas: ¿la búsqueda responde en menos de dos segundos?, ¿la tienda soporta mil usuarios simultáneos?, ¿qué sucede cuando llegan diez veces más usuarios?, ¿funciona en Chrome, Firefox, Android y iOS?”

### Pregunta para el grupo

“¿Cuál de estas preguntas revisa una función y cuál revisa una característica de calidad?”

### Transición

“Para responder preguntas como estas de forma profesional, necesitamos convertirlas en escenarios y métricas observables.”

---

## 6. Conceptos y principios

### Idea central

Una prueba no funcional útil necesita un atributo de calidad, un escenario, una métrica y un criterio de aceptación.

### Guion sugerido

“El primer paso es elegir qué atributo queremos observar. Puede ser rendimiento, disponibilidad, seguridad, usabilidad, compatibilidad o portabilidad.”

“Después definimos el escenario: quién utiliza el sistema, qué acción realiza, con qué cantidad de datos y bajo qué condiciones. No es lo mismo medir una aplicación vacía que medirla con usuarios y datos parecidos a los de producción.”

“Luego elegimos una métrica. En lugar de decir ‘queremos que sea rápido’, podemos medir el tiempo de respuesta, la cantidad de solicitudes por segundo, el porcentaje de errores o el uso de recursos.”

“Finalmente definimos el criterio de aceptación: el límite que nos permite decir si el resultado es aceptable o no.”

### Analogía de la vida real

“Si una persona dice ‘quiero correr mejor’, todavía no tiene una meta suficientemente clara. Podría definir: correr cinco kilómetros, tres veces por semana, en menos de treinta minutos. La meta se vuelve medible y se puede comparar con resultados reales. En las pruebas no funcionales ocurre lo mismo.”

### Principios que debes explicar

- **Medir con datos:** las impresiones como “se siente lento” son una señal, pero no sustituyen las métricas.
- **Usar condiciones realistas:** una prueba con diez usuarios no representa una aplicación diseñada para miles.
- **Repetir y comparar:** una sola ejecución puede verse afectada por la red o por otros factores.
- **Automatizar cuando sea posible:** permite ejecutar el mismo escenario después de cada cambio.
- **Registrar el contexto:** hay que anotar versión, ambiente, datos, cantidad de usuarios y duración.

### Frase para reforzar

“Una prueba útil no solo produce un número; produce evidencia para tomar una decisión.”

### Transición

“Veamos ahora cómo se transforma una pregunta general en un criterio que el equipo pueda comprobar.”

---

## 7. De la pregunta al criterio de aceptación

### Intención de la diapositiva

Enseñar una forma práctica de diseñar pruebas no funcionales sin quedarse en afirmaciones vagas.

### Guion sugerido

“Supongamos que alguien dice: ‘La búsqueda debe ser rápida’. El problema es que la palabra ‘rápida’ puede significar algo diferente para cada persona. Para el usuario puede ser menos de dos segundos; para otro equipo podría ser menos de cinco.”

“Por eso descomponemos la prueba en cuatro partes. Primero, el escenario: mil usuarios concurrentes. Segundo, la acción: buscar un producto. Tercero, la métrica: el percentil 95 del tiempo de respuesta. Cuarto, el criterio: que ese p95 sea menor a dos segundos y que los errores sean inferiores al uno por ciento.”

“El percentil 95, o p95, nos ayuda a no quedarnos únicamente con el promedio. Significa que el 95 por ciento de las solicitudes respondió en ese tiempo o menos. Así también observamos lo que ocurre con una parte de los usuarios que podría estar experimentando tiempos más altos.”

### Analogía de la vida real

“Imaginemos una fila en un banco. El promedio de espera puede parecer aceptable, pero no nos cuenta si algunas personas esperaron muchísimo más. El p95 nos ayuda a observar la experiencia de quienes están cerca del extremo más lento, sin enfocarnos únicamente en el caso más excepcional.”

### Pregunta para el grupo

“¿Cuál de estas dos metas es más útil: ‘el sistema debe ser rápido’ o ‘el 95% de las búsquedas debe responder en menos de dos segundos con mil usuarios’?”

### Aplicación al proyecto

“Para nuestro proyecto, podemos elegir una función importante y completar estas cuatro partes. El resultado será un punto de partida para diseñar una prueba real.”

### Transición

“Estos criterios no viven aislados: muchas veces la arquitectura es la que determina si podemos alcanzarlos.”

---

## 8. Importancia y aplicabilidad en la arquitectura

### Idea central

La arquitectura influye en la calidad; las pruebas no funcionales verifican si las decisiones arquitectónicas cumplen su propósito.

### Guion sugerido

“Cuando hablamos de arquitectura de software no hablamos solamente de cajas y flechas. Cada decisión arquitectónica tiene consecuencias sobre el rendimiento, la disponibilidad, la capacidad de crecimiento y la facilidad de mantenimiento.”

“Por ejemplo, una caché puede evitar consultas repetidas y reducir el tiempo de respuesta. Un balanceador puede distribuir las solicitudes entre varios servidores. Una base de datos bien configurada puede soportar más operaciones concurrentes. Pero ninguna de estas decisiones debe darse por buena solo porque aparece en un diagrama: hay que comprobar su efecto con pruebas.”

“Las pruebas no funcionales también ayudan a detectar cuellos de botella. Quizá la API responda rápido, pero la base de datos sea lenta. O quizá agregar servidores no mejore el rendimiento porque existe un componente central que sigue siendo el límite.”

### Analogía de la vida real

“Pensemos en una carretera. Podemos construir más carriles para aumentar la capacidad, pero si todos los vehículos deben pasar por un puente de un solo carril, ese puente se convierte en el cuello de botella. En una arquitectura, un servicio, una base de datos o una conexión pueden cumplir el mismo papel.”

### Pregunta para el grupo

“Si agregamos más servidores y el sistema no mejora, ¿qué deberíamos investigar? La respuesta puede estar en un recurso compartido, una consulta lenta, un límite de red o una parte de la arquitectura que no puede crecer.”

### Transición

“Para localizar esos problemas, observemos en qué partes del recorrido del usuario aparece la calidad.”

---

## 9. ¿Dónde se observa la calidad?

### Intención de la diapositiva

Ayudar a ubicar los posibles problemas a lo largo de la arquitectura, en lugar de culpar inmediatamente a un solo componente.

### Guion sugerido

“El usuario percibe la experiencia completa, pero el resultado depende de varias capas. Primero está el dispositivo y el navegador. Después está la red, que puede introducir latencia o pérdida de conexión. Luego están los servicios, que procesan las solicitudes. Finalmente están los datos, donde pueden aparecer consultas lentas o problemas de concurrencia.”

“Si una pantalla tarda en cargar, no podemos concluir automáticamente que el problema está en la interfaz. Puede estar en la red, en la API o en la base de datos. El mapa nos ayuda a formular hipótesis y a medir cada parte.”

### Analogía de la vida real

“Es como pedir un paquete a domicilio. El retraso puede estar en la tienda que prepara el pedido, en el centro de distribución, en el tráfico o en la dirección de entrega. Para resolverlo, debemos observar todo el recorrido, no solo el último paso.”

### Ejemplo de lectura del mapa

“La carga y el estrés pueden observarse en la red y en los servicios porque allí se concentran muchas solicitudes. La escalabilidad también involucra servicios y datos, porque aumentar usuarios suele aumentar consultas y transacciones. La portabilidad se nota especialmente en los dispositivos, navegadores y sistemas operativos.”

### Pregunta para el grupo

“Si el sistema funciona rápido en la computadora del desarrollador, ¿eso garantiza que funcionará igual para todos? No necesariamente: todavía debemos considerar otros dispositivos, navegadores, redes y datos.”

### Transición

“Comencemos ahora con el primer tipo de prueba: la prueba de carga, que representa el escenario esperado.”

---

## 10. Pruebas de carga

### Idea central

Las pruebas de carga verifican el comportamiento del sistema bajo una demanda esperada o normal.

### Guion sugerido

“Una prueba de carga intenta representar el uso que esperamos tener en la operación normal. Definimos cuántos usuarios habrá, qué acciones realizarán, durante cuánto tiempo y con qué frecuencia.”

“Por ejemplo, para una tienda en línea podríamos simular mil usuarios concurrentes: algunos buscan productos, otros agregan artículos al carrito y otros realizan el pago. Observamos si el sistema mantiene tiempos de respuesta aceptables, si procesa las solicitudes correctamente y si los recursos se mantienen dentro de límites razonables.”

“No buscamos romper el sistema. Buscamos saber si puede trabajar correctamente en las condiciones para las que fue diseñado.”

### Analogía de la vida real

“Es parecido a probar un restaurante en una hora normal de almuerzo. Queremos verificar si la cocina, los meseros y las mesas pueden atender el número habitual de clientes sin que el servicio se vuelva demasiado lento.”

### Qué observar

- Tiempo de respuesta.
- Solicitudes procesadas por segundo.
- Porcentaje de errores.
- Uso de CPU, memoria y red.
- Estabilidad durante toda la prueba.

### Diferencia clave

“La palabra clave aquí es **esperado**. Si la pregunta es ‘¿puede funcionar bien con la cantidad de usuarios que calculamos?’, estamos pensando en una prueba de carga.”

### Pregunta para el grupo

“¿Qué escenario de carga tendría sentido para nuestro proyecto? No todos los sistemas necesitan mil usuarios: la carga debe corresponder al uso real que esperamos.”

### Transición

“Para experimentar con este tipo de escenarios existe Locust, que veremos como un recurso de práctica.”

---

## 11. Recurso para practicar: Locust

### Intención de la diapositiva

Conectar la teoría con una herramienta que permite simular usuarios y observar resultados.

### Guion sugerido

“Locust es una herramienta que permite describir el comportamiento de usuarios virtuales y ejecutar pruebas de carga. La idea no es que el grupo memorice una herramienta específica, sino que entienda cómo una prueba puede pasar de un escenario escrito a una ejecución medible.”

“Primero definimos lo que hace un usuario: por ejemplo, abrir el catálogo, buscar un producto y consultar sus detalles. Después indicamos cuántos usuarios virtuales queremos y con qué ritmo comenzarán a trabajar. Finalmente observamos métricas como solicitudes por segundo, tiempo de respuesta y errores.”

“La herramienta permite repetir el escenario después de hacer un cambio. Así podemos comparar si una optimización realmente mejoró el sistema o si solo tenemos la impresión de que mejoró.”

### Analogía de la vida real

“Imaginemos un simulacro de evacuación. No esperamos a que ocurra una emergencia real para descubrir si las puertas son suficientes. Hacemos una simulación con un número de personas, medimos cuánto tardan en salir y observamos dónde se forman aglomeraciones. Locust cumple una función parecida para el tráfico de una aplicación.”

### Sugerencia para explicar la imagen

“En el panel podemos interpretar tendencias: si al aumentar usuarios también aumentan mucho los tiempos de respuesta o los errores, tenemos una señal de que el sistema se está acercando a un límite.”

### Aclaración

“Locust es un recurso sugerido para practicar. Lo importante para este tema es comprender el escenario, la métrica y la decisión que tomaremos con los resultados.”

### Transición

“La prueba de carga representa el uso previsto. Ahora cambiaremos la pregunta: ¿qué pasa si superamos ese uso?”

---

## 12. Pruebas de estrés

### Idea central

Las pruebas de estrés llevan el sistema más allá de la demanda esperada para conocer su límite y observar su recuperación.

### Guion sugerido

“En una prueba de estrés aumentamos la demanda de forma deliberada. Puede ser agregando más usuarios, enviando más solicitudes o reduciendo recursos disponibles. El objetivo no es comprobar únicamente si el sistema falla, sino entender cómo falla.”

“Imaginemos que una tienda espera mil usuarios durante una promoción. En una prueba de estrés podríamos aumentar la demanda a cinco mil o diez mil. Observamos en qué momento comienzan los errores, si el sistema responde de manera controlada, si protege los datos y si puede recuperarse cuando la demanda vuelve a la normalidad.”

### Analogía de la vida real

“Es como probar el peso máximo de un puente. No esperamos que los vehículos circulen todos los días con la carga máxima, pero necesitamos saber qué ocurre cerca del límite y si existen señales de advertencia antes de que el puente se vuelva peligroso.”

### Diferencia con carga

“Carga pregunta: ‘¿funciona con el uso esperado?’ Estrés pregunta: ‘¿qué ocurre cuando superamos ese uso?’ La segunda prueba explora el límite y la forma de recuperación.”

### Qué observar

- Punto en el que el sistema empieza a degradarse.
- Tipo y cantidad de errores.
- Pérdida de datos o funciones críticas.
- Capacidad de recuperarse.
- Mensajes y controles que recibe el usuario.

### Pregunta para el grupo

“Si el sistema deja de responder, ¿eso significa automáticamente que la prueba fue un fracaso? No necesariamente. La prueba puede revelar un límite esperado. Lo importante es saber si el fallo fue controlado, si se protegieron los datos y si el sistema se recuperó correctamente.”

### Transición

“Conocer el límite nos lleva a otra pregunta: ¿podemos aumentar la capacidad del sistema para atender más demanda?”

---

## 13. Pruebas de escalabilidad

### Idea central

Las pruebas de escalabilidad verifican si el sistema puede crecer o reducirse sin perder un nivel aceptable de calidad.

### Guion sugerido

“La escalabilidad no significa simplemente tener más servidores. Significa que, cuando aumentan los usuarios, los datos o las transacciones, podemos aumentar la capacidad de forma útil y mantener el servicio dentro de los objetivos definidos.”

“Hay dos formas comunes de crecer. El crecimiento vertical consiste en darle más recursos a un servidor: más memoria, CPU o almacenamiento. El crecimiento horizontal consiste en agregar más servidores o nodos y repartir el trabajo.”

“La prueba compara el sistema con diferentes niveles de capacidad. Por ejemplo: un nodo, dos nodos y cinco nodos. Medimos si el rendimiento mejora, cuánto cuesta crecer y si aparece un cuello de botella que impide aprovechar los recursos nuevos.”

### Analogía de la vida real

“Pensemos en una cafetería. La escala vertical sería hacer más grande una sola caja o contratar una máquina más rápida. La escala horizontal sería abrir más cajas o más sucursales. La mejor opción depende del problema: si toda la preparación pasa por una sola cocina, abrir más cajas no resolverá el cuello de botella.”

### Diferencia con estrés

“Estrés busca saber hasta dónde aguanta el sistema. Escalabilidad busca saber si podemos aumentar la capacidad y obtener un beneficio real al hacerlo.”

### Pregunta para el grupo

“Si duplicamos los servidores pero el tiempo de respuesta casi no cambia, ¿qué nos está diciendo el resultado? Probablemente existe un recurso que sigue siendo único o compartido, como una base de datos, una conexión o un servicio central.”

### Transición

“Hasta aquí hemos cambiado la cantidad de trabajo y la capacidad. Ahora cambiaremos el entorno en el que se ejecuta el sistema.”

---

## 14. Pruebas de portabilidad

### Idea central

Las pruebas de portabilidad verifican si el sistema puede funcionar correctamente al trasladarse a diferentes entornos.

### Guion sugerido

“Una aplicación puede funcionar correctamente en el ambiente donde fue desarrollada y fallar cuando la llevamos a otro entorno. Por eso probamos combinaciones de sistema operativo, navegador, dispositivo, servidor, base de datos o configuración.”

“Por ejemplo, podríamos validar la aplicación en Windows y Linux, en Chrome y Firefox, y en una computadora y un teléfono. No se trata de probar todas las combinaciones existentes, sino las que forman parte del alcance y representan a nuestros usuarios.”

“También debemos distinguir portabilidad de diseño adaptable. Que una pantalla se acomode al tamaño del celular es importante, pero la portabilidad puede incluir mucho más: instalación, dependencias, rutas de archivos, versiones de software y comportamiento en otro ambiente.”

### Analogía de la vida real

“Es como trasladar una receta de una cocina a otra. La receta puede ser correcta, pero quizá cambien el horno, los utensilios, la temperatura o los ingredientes disponibles. La prueba de portabilidad verifica que el resultado siga siendo aceptable en la nueva cocina.”

### Qué observar

- Instalación y configuración.
- Compatibilidad con navegadores y sistemas operativos.
- Diferencias de resolución o interacción.
- Dependencias y versiones.
- Comportamiento de funciones importantes.

### Pregunta para el grupo

“¿En qué ambientes debe funcionar nuestro proyecto? La respuesta nos ayuda a definir el alcance de las pruebas y a no prometer compatibilidad con entornos que nunca se validaron.”

### Transición

“Ahora reunamos todo lo aprendido en situaciones concretas y seleccionemos la prueba adecuada para cada una.”

---

## 15. Mini caso: elige la prueba correcta

### Intención de la diapositiva

Convertir la explicación en una actividad de razonamiento y comprobar que el grupo distingue los cuatro tipos de prueba.

### Dinámica sugerida

Antes de mostrar o leer las respuestas, da al grupo unos segundos para analizar cada situación. Puedes pedir que levanten la mano, respondan por equipos o justifiquen su elección.

### Guion para cada caso

**A. Una jornada normal con 1,000 usuarios — Carga**

“Aquí estamos representando la cantidad de usuarios que esperamos normalmente. La pregunta es si el sistema funciona bien en su operación prevista. Por eso corresponde a carga.”

**B. Un pico inesperado diez veces mayor — Estrés**

“En este caso superamos deliberadamente la demanda esperada. Queremos conocer el límite, la forma del fallo y la recuperación. Por eso corresponde a estrés.”

**C. Pasar de un servidor a cinco nodos — Escalabilidad**

“Aquí estamos cambiando la capacidad disponible y observando si el sistema aprovecha ese crecimiento. Por eso corresponde a escalabilidad.”

**D. Usar el sistema en móvil y otro navegador — Portabilidad**

“Aquí cambia el entorno: dispositivo y navegador. Verificamos que el sistema mantenga su comportamiento en esas condiciones. Por eso corresponde a portabilidad.”

### Regla de memoria

“Para recordar la diferencia, hagamos cuatro preguntas:

- ¿Es el uso normal? **Carga.**
- ¿Estamos superando el límite? **Estrés.**
- ¿Estamos aumentando la capacidad? **Escalabilidad.**
- ¿Estamos cambiando de ambiente? **Portabilidad.**”

### Pregunta de cierre

“¿Podría una misma situación requerir más de un tipo de prueba? Sí. Una aplicación puede probarse con carga y, al mismo tiempo, en varios navegadores. Los tipos no son excluyentes; dependen de la pregunta que queremos responder.”

### Transición al cierre

“Con esta clasificación podemos elegir las pruebas de acuerdo con el riesgo real del sistema, en lugar de ejecutarlas solo porque aparecen en una lista.”

---

## Cierre sugerido

“Para concluir, las pruebas no funcionales convierten la calidad en algo que podemos observar, medir y discutir con evidencia.”

“Las pruebas de carga nos dicen si el sistema soporta el uso esperado. Las de estrés exploran qué sucede cuando superamos ese uso. Las de escalabilidad verifican si podemos crecer de manera efectiva. Las de portabilidad comprueban si el sistema se adapta a otros entornos.”

“La lección más importante es que estas pruebas no deberían aparecer únicamente al final del desarrollo. Si pensamos en ellas desde la arquitectura, podemos tomar mejores decisiones, anticipar cuellos de botella y evitar que el usuario sea quien descubra los límites del sistema.”

### Frase final

“Un sistema de calidad no es solamente el que responde correctamente; es el que responde correctamente, a tiempo, bajo condiciones reales y en el entorno donde las personas necesitan utilizarlo.”

### Pregunta final para el grupo

“Si mañana tuviéramos que probar nuestro proyecto, ¿cuál sería el primer riesgo no funcional que investigaríamos y por qué?”
