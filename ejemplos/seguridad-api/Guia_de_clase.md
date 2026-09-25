# Guía de clase: proteger una API académica

## Propósito

Que el grupo conecte una vulnerabilidad observable con tres elementos del
análisis de seguridad:

1. El riesgo que se quiere evitar.
2. El control de diseño que lo reduce.
3. La prueba que demuestra si el control funciona.

La actividad está pensada para aproximadamente 35–45 minutos. Se trabaja con
usuarios, calificaciones y perfiles completamente ficticios.

## Preparación del docente

```bash
cd ejemplos/seguridad-api
npm install
npm run build
npm run test:baseline
npm run start:dev
```

Antes de iniciar, aclarar que `x-user-id` es una identidad simulada. La clase
no está construyendo un login ni un sistema de autenticación; está estudiando
qué puede hacer cada identidad una vez que el sistema dice reconocerla.

## Mapa rápido del caso

| Elemento | En el ejemplo |
| --- | --- |
| Activos | Calificaciones y perfiles de estudiantes |
| Actores | Estudiante, docente y cliente de la API |
| Amenaza | Consultar o modificar información ajena |
| Vulnerabilidad | Falta de autorización, entrada sin validar y respuesta excesiva |
| Controles | Guarda, DTO/ValidationPipe y DTO de respuesta/auditoría |
| Prueba | Código de estado, contenido permitido y ausencia de datos sensibles |

---

## Reto 1 — ¿Quién puede leer este expediente?

### Objetivo

Distinguir autenticación de autorización y detectar un acceso indebido a nivel
de objeto, conocido en este ejercicio como BOLA/IDOR.

### Analogía

La tarjeta de identificación permite entrar al edificio, pero no significa que
la persona pueda abrir cualquier expediente archivado. Primero se reconoce al
visitante; después se comprueba qué expediente puede consultar.

### Reproducción

Ejecutar:

```bash
curl -i \
  -H "x-user-id: student-1" \
  http://127.0.0.1:3002/students/student-2/grades
```

### Resultado inicial

La API devuelve `200` y las notas de `student-2`. El header permitió reconocer
al usuario, pero nunca se comprobó que pudiera acceder al `studentId` de la
ruta.

### Pregunta para el grupo

> ¿Qué dato de la solicitud está decidiendo qué expediente se devuelve y en
> qué lugar del código debería comprobarse que ese dato pertenece al usuario?

### Pista progresiva

1. Busquen la línea `@UseGuards` del controlador.
2. Identifiquen qué hace `DemoAuthGuard` y qué responsabilidad todavía falta.
3. Revisen `StudentAccessGuard`.

### Solución

En `src/students/students.controller.ts`, cambiar:

```ts
@UseGuards(DemoAuthGuard)
```

por:

```ts
@UseGuards(DemoAuthGuard, StudentAccessGuard)
```

La guarda permite al dueño del recurso y al rol `teacher`. En cualquier otro
caso responde `403 Forbidden`.

### Confirmación

```bash
curl -i \
  -H "x-user-id: student-1" \
  http://127.0.0.1:3002/students/student-2/grades

curl -i \
  -H "x-user-id: student-1" \
  http://127.0.0.1:3002/students/student-1/grades

curl -i \
  -H "x-user-id: teacher-1" \
  http://127.0.0.1:3002/students/student-2/grades
```

Los resultados esperados son `403`, `200` y `200`, respectivamente.

### Transición

> Ya comprobamos quién puede tocar el expediente. Ahora veremos si esa persona
> puede cambiar cualquier campo del expediente una vez que tiene permiso para
> editarlo.

---

## Reto 2 — ¿Qué campos puede modificar el cliente?

### Objetivo

Detectar mass assignment y conectar la validación de entrada con el diseño de
un DTO explícito.

### Analogía

Un formulario de cambio de teléfono no debería permitir que el usuario escriba
manualmente “soy docente” en la misma ficha. El servidor debe aceptar solo los
campos que forman parte de esa operación.

### Reproducción

```bash
curl -i -X PATCH \
  -H "Content-Type: application/json" \
  -H "x-user-id: student-1" \
  -d '{"displayName":"Ana actualizada","role":"teacher","internalNotes":"Dato modificado"}' \
  http://127.0.0.1:3002/students/student-1/profile
```

### Resultado inicial

La API devuelve `200` y conserva las propiedades no autorizadas porque el
servicio aplica `Object.assign(student, updates)`.

### Pregunta para el grupo

> Si el cliente envía un campo que no aparece en el formulario, ¿debería el
> servidor ignorarlo, rechazarlo o guardarlo?

### Pista progresiva

1. Busquen el tipo usado en `@Body()`.
2. Revisen `UpdateProfileDto`.
3. Revisen las opciones de `ValidationPipe` en `src/app-config.ts`.

### Solución

En `src/app-config.ts`, cambiar las opciones a:

```ts
new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
})
```

En el controlador, cambiar:

```ts
@Body() body: Record<string, unknown>
```

por:

```ts
@Body() body: UpdateProfileDto
```

El DTO permite únicamente `displayName` y `phone`, con sus reglas de tipo y
longitud.

### Confirmación

El payload con `role` e `internalNotes` debe responder `400`. Este payload debe
responder `200`:

```json
{
  "displayName": "Ana actualizada",
  "phone": "555-0199"
}
```

Además, el rol debe seguir siendo `student`.

### Transición

> La autorización y la validación protegen la operación. Todavía falta decidir
> cuánto debe devolver la API y qué información debe quedar registrada en la
> bitácora.

---

## Reto 3 — ¿La respuesta revela más de lo necesario?

### Objetivo

Aplicar minimización de datos y diseñar un registro de auditoría útil sin
guardar cuerpos completos ni información sensible.

### Analogía

Cuando un cajero confirma una operación, entrega el recibo necesario; no
imprime todas las notas internas del sistema ni el expediente completo del
cliente.

### Reproducción

```bash
curl -i \
  -H "x-user-id: student-1" \
  http://127.0.0.1:3002/students/student-1/profile
```

Revisar también la terminal donde corre NestJS. La versión inicial devuelve y
registra `internalNotes`, `role`, `grades` o el resultado completo de la
operación.

### Pregunta para el grupo

> ¿Qué campos necesita realmente la interfaz para mostrar el perfil? ¿Qué
> información sería innecesaria o peligrosa en una bitácora?

### Pista progresiva

1. Separa el modelo interno de la respuesta pública.
2. Define una respuesta mínima: `id`, `displayName` y `email`.
3. Haz que la auditoría reciba solo actor, acción, recurso y resultado.

### Solución

En `StudentsService.getProfile`, devolver únicamente:

```ts
return {
  id: student.id,
  displayName: student.displayName,
  email: student.email,
};
```

En `AuditService`, restringir el evento a metadatos:

```ts
interface AuditEvent {
  actorId: string;
  action: string;
  resourceId: string;
  outcome: 'success' | 'denied';
}

record(event: AuditEvent): void {
  this.lastEntry = JSON.stringify(event);
  this.logger.log(this.lastEntry);
}
```

Finalmente, en el controlador reemplazar los campos `result` y `body` por:

```ts
this.auditService.record({
  actorId: request.user?.id ?? 'unknown',
  action: 'read-profile',
  resourceId: studentId,
  outcome: 'success',
});
```

Aplicar el mismo criterio a las rutas de calificaciones y actualización.

### Confirmación

La respuesta de perfil debe ser exactamente:

```json
{
  "id": "student-1",
  "displayName": "Ana López",
  "email": "ana@example.test"
}
```

La bitácora debe contener el actor, la acción, el recurso y el resultado, pero
no `internalNotes`, `grades`, `body` ni el perfil completo.

### Transición

> El control no está completo hasta que podemos repetir la comprobación. Por
> eso convertimos cada observación en una prueba automatizada.

---

## Cierre y conexión con seguridad

Ejecutar:

```bash
npm run build
npm run test:secure
```

Relacionar los resultados con la triada de seguridad:

- Confidencialidad: evitar leer calificaciones ajenas y no exponer notas
  internas.
- Integridad: impedir que un estudiante se convierta en docente mediante un
  campo enviado por el cliente.
- Disponibilidad: mantener rutas simples, respuestas controladas y pruebas
  repetibles.

Cerrar con la pregunta:

> ¿Qué riesgo, control y prueba agregarían si esta API tuviera una base de
> datos real y un login con tokens?
