# API educativa de seguridad con NestJS

Esta API representa un portal académico ficticio. Está diseñada para iniciar
con tres problemas de seguridad intencionales y resolverlos progresivamente
durante una clase de Análisis y Diseño de Sistemas 2.

> **Advertencia:** la versión inicial es deliberadamente insegura. Ejecuta el
> ejercicio únicamente en local, con los datos sintéticos incluidos. No la
> publiques ni la conectes a información real.

## Requisitos

- Node.js 20.11 o superior.
- npm.

## Instalación y ejecución

```bash
cd ejemplos/seguridad-api
npm install
npm run build
npm run start:dev
```

La API escucha únicamente en `http://127.0.0.1:3002`.

Usuarios disponibles para la demostración:

| Header `x-user-id` | Rol | Alcance esperado después de las correcciones |
| --- | --- | --- |
| `student-1` | Estudiante | Sus propios datos |
| `student-2` | Estudiante | Sus propios datos |
| `teacher-1` | Docente | Datos de cualquier estudiante |

El header simula una identidad para concentrar la clase en autorización. No
representa autenticación real y no debe sustituir un mecanismo de identidad en
un sistema productivo.

## Rutas

| Método | Ruta | Propósito |
| --- | --- | --- |
| `GET` | `/health` | Verificar que la API está disponible |
| `GET` | `/students/:studentId/grades` | Consultar calificaciones |
| `GET` | `/students/:studentId/profile` | Consultar perfil |
| `PATCH` | `/students/:studentId/profile` | Actualizar perfil |

## Reproducir la versión inicial

Consultar las notas de otro estudiante:

```bash
curl -i \
  -H "x-user-id: student-1" \
  http://127.0.0.1:3002/students/student-2/grades
```

La respuesta inicial es `200`, aunque `student-1` está leyendo datos de
`student-2`.

Enviar propiedades que el formulario no debería poder modificar:

```bash
curl -i -X PATCH \
  -H "Content-Type: application/json" \
  -H "x-user-id: student-1" \
  -d '{"displayName":"Ana actualizada","role":"teacher","internalNotes":"Dato modificado"}' \
  http://127.0.0.1:3002/students/student-1/profile
```

La respuesta inicial acepta `role` e `internalNotes` porque el controlador
recibe cualquier propiedad y el servicio usa `Object.assign`.

Observar datos internos del perfil:

```bash
curl -i \
  -H "x-user-id: student-1" \
  http://127.0.0.1:3002/students/student-1/profile
```

La respuesta y la bitácora inicial contienen información que no es necesaria
para el cliente.

## Pruebas para la clase

Las pruebas de observación documentan el comportamiento vulnerable inicial:

```bash
npm run test:baseline
```

Las pruebas de contrato seguro describen el comportamiento esperado después de
resolver los tres retos. Es normal que comiencen fallando:

```bash
npm run test:secure
```

Después de cada corrección se puede ejecutar un caso específico con Jest, por
ejemplo:

```bash
npx vitest run test/secure.e2e-spec.ts \
  -t "rechaza que un estudiante consulte las notas de otro"
```

## Secuencia recomendada

1. Ejecutar `npm run test:baseline` y reproducir los tres comportamientos.
2. Resolver autorización conectando `StudentAccessGuard`.
3. Resolver mass assignment conectando `UpdateProfileDto` y endureciendo
   `ValidationPipe`.
4. Minimizar respuestas y registrar únicamente metadatos de auditoría.
5. Ejecutar `npm run test:secure` y relacionar cada resultado con el riesgo,
   el control y la prueba.

Las instrucciones detalladas para el docente están en
[`Guia_de_clase.md`](./Guia_de_clase.md).
