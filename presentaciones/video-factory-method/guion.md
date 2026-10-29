# Guion — Factory Method

Duración: 4.30 min · Voz: Paulina (español de México) · Formato: 16:9, 1280 × 720.

## Narración

### Escena 1: Introducción

> Cuando una aplicación necesita enviar una notificación, ¿quién decide si debe crear un correo o un SMS? Esa decisión parece pequeña, hasta que aparecen más canales.
> Factory Method organiza la creación: CreadorNotificacion conserva el flujo común y trabaja con la interfaz Notificacion.

### Escena 2: El problema

> Imaginemos que el método avisar contiene un if para Email y otro para SMS. En cada rama, el servicio construye una clase concreta.
> Ahora esa clase conoce los canales, los constructores y quizá sus detalles de configuración. La lógica de negocio empieza a depender de cada proveedor.
> Cada canal nuevo obliga a tocar esa misma clase. Si el proyecto crece, el if se extiende y una modificación puede afectar rutas que ya funcionaban.

### Escena 3: La idea

> Factory Method propone mover la decisión de creación a un método de fábrica. El creador conserva una operación común, pero no construye el producto directamente.
> Una clase creadora declara ese método; sus subclases lo redefinen para elegir qué notificación concreta entregar.
> Así, el flujo de envío permanece en un lugar, y la elección del producto cambia mediante el creador.

### Escena 4: Participantes

> En el ejemplo, Notificacion es la interfaz del producto. Declara enviar con un mensaje; avisar trabaja con ese contrato.
> EmailNotificacion y SmsNotificacion son productos concretos. Cada uno implementa enviar, aunque el canal real de entrega cambia.
> CreadorNotificacion es el creador. Define crearNotificacion y también la operación avisar, que contiene el trabajo común.

### Escena 5: Producto

> En TypeScript, crearNotificacion está marcado como abstracto y protegido. La clase base no elige un canal; obliga a cada subclase a decidirlo.
> CreadorEmail redefine el método y devuelve un EmailNotificacion. CreadorSms hace lo mismo con SmsNotificacion.
> El tipo de retorno es Notificacion, así avisar usa enviar sin preguntar qué clase concreta recibió.

### Escena 6: Recorrido

> Veamos el recorrido. El cliente crea un CreadorEmail y llama a avisar con el mensaje de confirmación del pedido.
> Avisar invoca crearNotificacion. Esa llamada llega a CreadorEmail, que produce el objeto EmailNotificacion.
> Después, avisar llama enviar sobre la interfaz Notificacion. El creador coordina la operación; el producto concreto realiza el envío.

### Escena 7: Dos variantes

> Si el cliente usa CreadorSms, el mismo método avisar recorre la misma operación, pero el producto ahora es SmsNotificacion.
> Por eso, el cliente cambia de canal al elegir otro creador. La operación de negocio no necesita ramas para Email y SMS.
> En la demo, ambas llamadas muestran mensajes distintos en consola. En una aplicación real, enviar conectaría con el proveedor del canal.

### Escena 8: Extensión

> Para sumar WhatsApp, crearíamos un producto WhatsAppNotificacion y un creador CreadorWhatsApp. Ambos respetan el contrato común.
> El resto del flujo puede seguir usando avisar y enviar. Agregar un canal significa extender las clases, no meter otra rama allí.
> Ojo: algún punto de entrada todavía debe elegir qué creador usar. Factory Method concentra la decisión; no la hace desaparecer.

### Escena 9: Cuándo usarlo

> Conviene cuando la clase usa productos de una interfaz, pero cada variante necesita una forma distinta de crearse.
> También ayuda si esperamos nuevas variantes y queremos mantener estable la operación que trabaja con ellas.
> Funciona mejor cuando los creadores concretos encajan con la estructura de herencia que ya tiene el diseño.

### Escena 10: Límite

> El costo es crear una jerarquía de creadores, y conservar al menos un punto del programa que conozca cuál instancia concreta elegir.
> Si solo hay dos objetos muy simples y la lógica apenas cambia, una función de fábrica o un if pequeño puede resultar más directo.

### Escena 11: Resumen

> Recuerda el recorrido: el creador declara el factory method, las subclases deciden el producto, y avisar llama a su interfaz común.
> El patrón es útil para variar la creación sin dispersar las dependencias sobre clases concretas.
