# Guion didáctico de exposición: Seguridad de sistemas

Este guion acompaña la presentación de seguridad para el curso de Análisis y Diseño de Sistemas 2. No es necesario leerlo literalmente. Sirve para explicar con palabras sencillas, conectar con temas anteriores y mantener una conversación activa con el grupo.

La idea central de la clase es pasar de una preocupación general, como “debemos proteger el sistema”, a decisiones concretas: qué se protege, qué podría ocurrir, qué control se diseña, cómo se prueba y qué evidencia queda.

## 1. Portada: Seguridad de sistemas

### Intención

Presentar seguridad como una característica de calidad que acompaña el análisis, el diseño, la implementación y las pruebas.

### Guion sugerido

“Hoy vamos a hablar de seguridad de sistemas. El tema suele asociarse con contraseñas, candados o personas intentando entrar a una aplicación. Esos elementos aparecen, pero la seguridad comienza antes: cuando decidimos qué información es importante, quién puede utilizarla y qué podría pasar si alguien la consulta, la modifica o la bloquea.”

“Durante la clase vamos a relacionar seguridad con varios temas que ya hemos visto. La arquitectura define dónde colocar controles, el diseño define qué permisos necesita cada componente y las pruebas nos ayudan a comprobar que el sistema rechaza lo que debe rechazar.”

### Pregunta para iniciar

“¿Qué podría salir mal en un sistema que funciona correctamente cuando todos los usuarios actúan de forma esperada?”

### Transición

“Antes de entrar a los conceptos, revisemos el recorrido de la sesión y los avisos del proyecto.”

## 2. Agenda

### Intención

Mostrar que la sesión combina seguimiento del proyecto con una progresión técnica: concepto, diseño, prueba y evidencia.

### Guion sugerido

“Comenzaremos con las dudas y los avisos de la Fase 2. Revisaremos la hoja de calificación, los horarios de calificación y la lectura de la Fase 3. Después entraremos al tema de seguridad.”

“La parte técnica seguirá una secuencia. Primero definiremos qué significa proteger un sistema. Luego estudiaremos amenazas, diseño seguro, criptografía, protección de datos, monitorización, respuesta a incidentes, pruebas y cumplimiento.”

“Al final resolveremos un mini caso. La meta no es memorizar una lista de palabras, sino aprender a formular buenas preguntas sobre nuestro propio proyecto.”

### Sugerencia didáctica

Pedir al grupo que identifique qué punto de la agenda se relaciona más directamente con su proyecto: datos, permisos, disponibilidad, pruebas o documentación.

### Transición

“Empecemos por los avisos que necesitan información oficial del curso.”

## 3. Avisos del proyecto

### Intención

Reservar un espacio visible para comunicar la información de la Fase 2 y la lectura de la Fase 3 sin inventar fechas ni contenidos.

### Guion sugerido

“En este momento revisaremos la hoja de calificación de la Fase 2, los horarios de calificación y la lectura de la Fase 3. Aquí conviene tomar nota de los criterios, las fechas, la modalidad y cualquier canal que se indique.”

“La diapositiva mantiene los temas visibles, pero los detalles concretos se completan con la información oficial del curso. Así evitamos que una fecha o un requisito quede interpretado de forma incorrecta.”

“Estos avisos también tienen relación con la clase. Un proyecto no solo debe tener funcionalidades. Debe dejar evidencia de las decisiones, los controles y las pruebas que justifican su diseño.”

### Sugerencia didáctica

Completar verbalmente los avisos y confirmar que los equipos sepan dónde consultar la información después de la clase.

### Transición

“Con los avisos claros, pasemos a la pregunta principal: ¿qué significa hablar de seguridad?”

## 4. ¿Qué significa hablar de seguridad?

### Intención

Definir seguridad con lenguaje cotidiano y conectarla con las pruebas no funcionales.

### Guion sugerido

“La seguridad reduce el riesgo de que un sistema exponga, altere o interrumpa aquello que debe proteger. Por eso preguntamos quién puede hacer qué, con qué datos y bajo qué condiciones.”

“Recordemos la conversación de las pruebas no funcionales. Allí preguntábamos si el sistema seguía siendo útil cuando cambiaba el contexto de uso: más usuarios, otro dispositivo o una carga mayor. En seguridad agregamos otra dimensión: qué ocurre cuando alguien utiliza el sistema de forma no autorizada, maliciosa o accidental.”

“Una aplicación puede permitir iniciar sesión y completar una compra. Aun así, puede tener un problema de seguridad si una persona puede consultar la información de otra cuenta o modificar datos que no le corresponden.”

### Analogía

“Una casa puede tener una puerta que abre y cierra correctamente. Eso demuestra una función. La seguridad también pregunta quién tiene la llave, qué pasa si se pierde, si hay una segunda barrera y cómo se detecta una entrada extraña.”

### Pregunta para el grupo

“¿Qué debemos proteger primero en nuestro proyecto: una cuenta, una transacción, un archivo, una calificación o la disponibilidad del servicio?”

### Transición

“Para ordenar esa conversación utilizaremos tres propiedades básicas de la seguridad.”

## 5. Tríada de seguridad

### Intención

Explicar confidencialidad, integridad y disponibilidad con analogías de la vida diaria.

### Guion sugerido

“La confidencialidad pregunta quién puede ver la información. Por ejemplo, una conversación privada no debería aparecer en la pantalla de otra persona.”

“La integridad pregunta si la información conserva su exactitud. En el proyecto, una calificación, un precio o una solicitud no debería cambiar sin una acción autorizada y registrada.”

“La disponibilidad pregunta si el servicio o el dato están disponibles cuando se necesitan. Un sistema puede proteger muy bien un dato, pero si nadie puede acceder a él durante una operación importante, también existe un problema.”

### Analogía

“Pensemos en una biblioteca. La confidencialidad evita que una persona revise el registro privado de otra. La integridad evita que alguien cambie el contenido de una ficha. La disponibilidad permite que el servicio funcione durante el horario en que los estudiantes lo necesitan.”

### Pregunta para el grupo

“¿Qué atributo se afecta si alguien lee una información ajena? ¿Qué atributo se afecta si cambia un dato? ¿Y si bloquea el servicio?”

### Transición

“Una vez que sabemos qué queremos proteger, debemos estudiar qué podría amenazarlo.”

## 6. Modelado de amenazas

### Intención

Presentar el modelado de amenazas como una herramienta de razonamiento, no como una actividad reservada para especialistas.

### Guion sugerido

“El modelado de amenazas nos ayuda a convertir una preocupación general en preguntas concretas. Primero identificamos el activo, es decir, aquello que tiene valor para el sistema. Después pensamos en los actores que interactúan con él.”

“Luego preguntamos qué amenaza podría aparecer y qué vulnerabilidad permitiría que ocurriera. Finalmente elegimos un control que reduzca el riesgo y definimos cómo comprobarlo.”

“El modelo no predice todo lo que ocurrirá. Su función es ayudarnos a tomar decisiones antes de que el problema aparezca en producción.”

### Analogía

“Es como revisar una casa. El activo puede ser un documento importante. El actor puede ser una persona que intenta entrar. La amenaza es llevarse el documento. La vulnerabilidad puede ser una ventana abierta. El control puede ser una cerradura, una alarma o una regla de acceso.”

### Pregunta para el grupo

“¿Qué activo de nuestro proyecto tendría mayor impacto si se expone o se modifica?”

### Transición

“Veamos el mismo razonamiento aplicado a un portal académico.”

## 7. Modelado aplicado a un portal académico

### Intención

Demostrar cómo el modelado conecta un riesgo con la arquitectura, la autorización y una prueba concreta.

### Guion sugerido

“Supongamos que un portal académico permite consultar calificaciones. El activo son las notas del estudiante. Una amenaza consiste en que una persona consulte las notas de otra cuenta.”

“La vulnerabilidad aparecería si el servidor confía únicamente en el identificador que envía el navegador. Un usuario podría cambiar ese identificador y solicitar información ajena.”

“El control debe vivir en el servidor. El servidor verifica la identidad, revisa el rol y confirma que la persona tiene permiso sobre ese recurso. La prueba intenta hacer la solicitud con una cuenta que no tiene autorización.”

“El resultado esperado no es solo un mensaje de rechazo. También esperamos que la respuesta no devuelva la información protegida y que la actividad quede registrada con el nivel de detalle necesario.”

### Pregunta para el grupo

“¿Por qué no debemos confiar en que el navegador enviará siempre el identificador correcto?”

### Transición

“Este ejemplo muestra que la seguridad depende de decisiones de diseño. Ahora revisemos algunos principios que ayudan a tomar esas decisiones.”

## 8. Diseño seguro de software

### Intención

Relacionar seguridad con principios de diseño y mostrar cómo limitar el impacto de los errores.

### Guion sugerido

“El privilegio mínimo significa que cada componente recibe únicamente los permisos que necesita. Un servicio que solo consulta productos no debería tener permiso para borrar usuarios.”

“Los valores seguros por defecto hacen que la primera configuración sea protegida. Si una persona olvida cambiar una opción, el sistema no debería quedar abierto por defecto.”

“La defensa en profundidad evita depender de una sola barrera. Podemos combinar autenticación, autorización, validación, límites y monitorización.”

“Fallar de forma segura significa que un error no concede permisos ni muestra información sensible. El mensaje puede informar que la operación no fue posible sin revelar detalles internos.”

### Conexión con temas anteriores

“Así como SRP separa responsabilidades para evitar que una clase concentre cambios distintos, el diseño seguro separa permisos y reduce el alcance de un error.”

### Pregunta para el grupo

“Si un componente solo necesita leer datos, ¿por qué tendría permiso para modificarlos?”

### Transición

“Los principios se vuelven más claros cuando los ubicamos dentro de la arquitectura.”

## 9. Seguridad dentro de la arquitectura

### Intención

Explicar las fronteras de confianza y el lugar donde deben vivir los controles.

### Guion sugerido

“El navegador, el móvil o el cliente están fuera del control directo del sistema. Pueden enviar solicitudes válidas, pero también solicitudes modificadas. Por eso el servidor debe tomar las decisiones importantes.”

“Cada frontera entre componentes es una oportunidad para validar identidad, autorización, entradas y errores. La API puede validar el contrato, el servicio puede aplicar la regla de negocio y la capa de datos puede limitar qué información se consulta.”

“Una arquitectura bien dibujada no demuestra que la seguridad funciona. Nos indica dónde colocar controles y qué interacciones debemos probar.”

### Analogía

“Pensemos en un edificio. La recepción puede identificar a la persona, pero cada oficina decide si esa persona puede entrar. La credencial general no reemplaza los permisos específicos.”

### Pregunta para el grupo

“¿Qué pasaría si la interfaz oculta un botón, pero la API acepta la solicitud de todos modos?”

### Transición

“Además de controlar el acceso, necesitamos proteger los datos cuando se almacenan, se transmiten y se utilizan.”

## 10. Criptografía

### Intención

Diferenciar cifrado, hash, claves y firmas digitales mediante analogías simples.

### Guion sugerido

“El cifrado oculta el contenido para quien no posee la clave adecuada. Es como poner un documento dentro de un sobre cerrado.”

“El hash produce una huella del contenido. Sirve para comparar o detectar cambios, pero no funciona como un sobre que se abre para recuperar el documento original.”

“La clave participa en la operación criptográfica. Puede utilizarse para cifrar, descifrar o verificar, según el mecanismo utilizado.”

“La firma digital ayuda a comprobar quién produjo un mensaje y si el contenido cambió. Se parece a firmar un documento, pero utiliza mecanismos criptográficos para que la verificación sea automática.”

“Una contraseña no debe guardarse como texto visible. La aplicación necesita verificarla mediante un mecanismo de almacenamiento adecuado para contraseñas.”

### Pregunta para el grupo

“¿Qué usarían para ocultar el contenido de un mensaje? ¿Y qué usarían para detectar si un archivo cambió?”

### Transición

“La criptografía es una herramienta. Para elegirla bien debemos observar dónde se encuentra el dato.”

## 11. Protección de datos

### Intención

Mostrar que el mismo dato puede necesitar controles diferentes durante su ciclo de uso.

### Guion sugerido

“Cuando un dato está en reposo, puede encontrarse en una base de datos, un respaldo o un archivo. Allí importan el control de acceso, la protección de respaldos y el cifrado cuando corresponde.”

“Cuando el dato está en tránsito, viaja entre el navegador, la API y otros servicios. Necesitamos un canal protegido y validaciones que eviten que una solicitud manipulada se convierta en una operación válida.”

“Cuando el dato está en uso, puede aparecer en memoria, pantallas, registros o mensajes de error. En este momento debemos reducir su exposición, enmascarar lo que no sea necesario y controlar quién puede visualizarlo.”

### Analogía

“Es como cuidar un documento durante todo su recorrido. Hay que protegerlo en el archivador, mientras lo trasladamos y cuando lo mostramos sobre una mesa.”

### Pregunta para el grupo

“¿Qué datos realmente necesita cada componente y cuánto tiempo debe conservarlos?”

### Transición

“Los controles protegen el sistema, pero también necesitamos saber cuándo algo inusual está ocurriendo.”

## 12. Monitorización

### Intención

Explicar la monitorización como una fuente de señales y evidencia para investigar.

### Guion sugerido

“La monitorización observa la actividad del sistema y registra señales útiles. Podemos revisar intentos de inicio de sesión, cambios de permisos, errores repetidos, accesos a información sensible y cambios de configuración.”

“Una alerta aislada no siempre significa un incidente. Necesitamos contexto: qué cuenta realizó la acción, sobre qué recurso, desde dónde y en qué momento.”

“Los registros deben ayudar a investigar sin convertirse en una nueva fuente de exposición. No conviene guardar contraseñas ni información sensible sin una razón clara.”

### Analogía

“Una alarma de casa avisa que una puerta se abrió. Para investigar necesitamos saber cuál puerta fue, a qué hora y si la persona tenía autorización.”

### Pregunta para el grupo

“¿Qué evento de nuestro proyecto sería una señal importante aunque la operación no haya fallado?”

### Transición

“Cuando una señal indica un posible incidente, el equipo necesita una respuesta ordenada.”

## 13. Respuesta a incidentes

### Intención

Presentar el ciclo de respuesta y relacionarlo con la mejora continua.

### Guion sugerido

“Preparar significa tener roles, contactos y procedimientos antes de que ocurra el problema. Detectar significa reconocer y analizar la señal. Contener busca limitar el alcance para que el incidente no se extienda.”

“Recuperar devuelve el servicio de manera controlada. Después viene aprender: documentar qué ocurrió, qué control falló y qué cambio debe incorporarse.”

“La respuesta no termina cuando el sistema vuelve a estar disponible. También necesitamos entender la causa y comprobar que la misma debilidad no siga abierta.”

### Analogía

“En un edificio, no basta con apagar una alarma. Hay que identificar la zona, limitar el acceso, ayudar a las personas, restaurar la operación y revisar por qué ocurrió el problema.”

### Pregunta para el grupo

“¿Qué información necesitaría el equipo para decidir si debe bloquear una cuenta, aislar un servicio o continuar observando?”

### Transición

“La respuesta se apoya en evidencia. Esa evidencia se produce mediante pruebas de seguridad.”

## 14. Pruebas de seguridad

### Intención

Relacionar las pruebas de seguridad con las pruebas funcionales y no funcionales vistas anteriormente.

### Guion sugerido

“Una prueba funcional puede verificar que un usuario autenticado consulte sus propias calificaciones. Una prueba de seguridad pregunta qué ocurre cuando intenta consultar las calificaciones de otra persona.”

“La entrada puede parecer técnicamente válida, pero el permiso no corresponde. Por eso el sistema debe rechazarla sin filtrar información.”

“Entre las áreas frecuentes encontramos autenticación, autorización, validación de entradas, sesiones, dependencias y configuración. Cada una se relaciona con una amenaza o una decisión de diseño.”

“Las pruebas de seguridad también pueden ser funcionales en su forma. Tienen un escenario, una acción, un resultado esperado y evidencia. Lo que cambia es la pregunta: buscamos comprobar que el sistema mantiene el límite de seguridad.”

### Pregunta para el grupo

“¿Qué debería ocurrir si un usuario cambia un identificador en la URL para consultar otro recurso?”

### Transición

“Para que la prueba sea útil, debemos describirla con un criterio que pueda comprobarse.”

## 15. Diseño de una prueba de seguridad medible

### Intención

Enseñar a convertir una amenaza en un caso de prueba claro.

### Guion sugerido

“Comenzamos con el contexto: un usuario A tiene una sesión activa. Después definimos la acción: solicita datos que pertenecen al usuario B.”

“Luego describimos la evidencia. Esperamos que el servidor rechace la solicitud, que no devuelva los datos y que registre la actividad con el nivel de detalle necesario.”

“Finalmente escribimos el criterio: el sistema no expone información ajena aunque el cliente cambie la solicitud.”

“El criterio es más útil que una frase como ‘la aplicación debe ser segura’, porque indica qué se probará y qué resultado permitiría tomar una decisión.”

### Analogía

“En una biblioteca no basta con decir ‘los libros están protegidos’. Podemos probar que una persona solo recibe los libros autorizados y que el sistema registra un intento de retirar un libro reservado.”

### Actividad breve

Pedir a cada equipo que elija una función de su proyecto y complete estas cuatro partes: contexto, acción, evidencia y criterio.

### Transición

“Además de funcionar y resistir pruebas, un sistema debe poder explicar cómo cumple las reglas que le aplican.”

## 16. Cumplimiento y normativas

### Intención

Explicar cumplimiento desde una perspectiva práctica, sin entrar en legislación específica.

### Guion sugerido

“Una política expresa una expectativa. Un requisito traduce esa expectativa en algo que el sistema o el equipo debe cumplir. Un control implementa la medida. La evidencia permite revisar si realmente se aplicó.”

“Podemos compararlo con una regla de tránsito. La regla establece una expectativa, el cinturón funciona como un control y una revisión puede comprobar que la práctica se cumple.”

“En software, la evidencia puede ser una configuración, un registro, una revisión, una prueba aprobada o una decisión documentada. El objetivo es que la organización pueda demostrar cómo reduce el riesgo.”

“Para el proyecto, esta cadena ayuda a conectar requisitos de seguridad con diseño, implementación y pruebas.”

### Pregunta para el grupo

“Si una organización afirma que solo los administradores pueden cambiar calificaciones, ¿qué control y qué evidencia esperaríamos encontrar?”

### Transición

“Apliquemos ahora el recorrido completo a una situación breve.”

## 17. Mini caso: del riesgo a la evidencia

### Intención

Practicar el razonamiento de seguridad con una situación que combina acceso, monitorización, control y pruebas.

### Guion sugerido

“El portal académico registra muchos intentos fallidos de inicio de sesión y, al mismo tiempo, recibe una solicitud para consultar notas de otra cuenta.”

“Primero preguntamos qué riesgo aparece. Hay un posible intento de acceso no autorizado y una posible violación de autorización sobre las calificaciones.”

“Después elegimos controles: un límite de intentos puede reducir el abuso sobre el inicio de sesión y una verificación de autorización puede impedir el acceso a datos ajenos.”

“Luego buscamos evidencia: una alerta, una solicitud rechazada, un registro de auditoría y una prueba que reproduzca las dos condiciones.”

### Dinámica

Pedir que el grupo responda las cuatro preguntas de la diapositiva. Si hay respuestas diferentes, compararlas con este criterio: cada propuesta debe indicar qué protege, qué riesgo reduce y cómo se comprobaría.

### Transición

“La seguridad se vuelve útil cuando cada preocupación termina en una decisión y una evidencia.”

## 18. Resumen de seguridad

### Intención

Cerrar la clase con una síntesis aplicable directamente al proyecto.

### Guion sugerido

“Hoy identificamos activos, amenazas y vulnerabilidades. Vimos que los controles deben vivir en los requisitos, la arquitectura y los componentes que toman decisiones.”

“También revisamos cómo proteger datos, observar señales, responder a incidentes y probar comportamientos que el sistema debe rechazar.”

“Para llevarlo al proyecto, cada equipo puede elegir un dato o función crítica y escribir tres elementos: una amenaza, un control y una prueba.”

“La pregunta final no es solo si el sistema funciona. También debemos preguntar si protege lo importante, si deja evidencia y si puede recuperarse cuando algo sale mal.”

### Actividad de cierre

“¿Qué parte de nuestro proyecto necesita esta conversación primero?”

### Cierre sugerido

“La seguridad no es una actividad aislada al final del proyecto. Es una forma de tomar decisiones de análisis y diseño con menos incertidumbre.”

## Referencias de apoyo

- NIST Cybersecurity Framework 2.0: <https://www.nist.gov/cyberframework>
- NIST CSF 2.0 Resource and Overview Guide: <https://csrc.nist.gov/pubs/sp/1299/final>
- OWASP Top 10: <https://owasp.org/projects/Top-Ten>
- OWASP Application Security Verification Standard: <https://owasp.org/projects/asvs>
- OWASP Web Security Testing Guide: <https://owasp.org/www-project-web-security-testing-guide/>
