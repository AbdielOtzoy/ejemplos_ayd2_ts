# Ejemplos prácticos: patrones de diseño

Ejemplos en TypeScript para la clase **Análisis y Diseño de Sistemas 2**. El orden y los escenarios siguen las presentaciones de [`presentaciones/`](./presentaciones/).

## Estructura

```text
ejemplos/
├── src/
│   ├── fundamentos/      # patrones, librerías y frameworks
│   ├── solid/            # principios SOLID de la semana 02
│   ├── creacionales/     # cómo se crean los objetos
│   ├── estructurales/    # cómo se ensamblan los objetos
│   ├── comportamiento/    # cómo colaboran los objetos
│   └── index.ts           # ejecuta todas las demostraciones
└── dist/                  # salida generada por TypeScript

presentaciones/            # materiales PDF y PPTX de las clases
```

Las presentaciones usan el formato `Semana NN — Tema.ext`, con dos dígitos en el número de semana para conservar el orden cronológico.

## Semana 02: fundamentos, SOLID y frameworks

Los ejemplos de esta semana muestran los cinco principios SOLID y la diferencia entre llamar una librería y ser llamado por un framework:

1. SRP — separar cálculo, reporte y persistencia.
2. OCP — agregar tipos de empleado sin modificar el cálculo de nómina.
3. LSP — modelar capacidades para que las subclases sean sustituibles.
4. ISP — dividir una interfaz grande en contratos por capacidad.
5. DIP — inyectar repositorios detrás de una abstracción.
6. Librería vs. framework — comparar quién controla el flujo.

Archivos:

```text
ejemplos/src/solid/srp.ts
ejemplos/src/solid/ocp.ts
ejemplos/src/solid/lsp.ts
ejemplos/src/solid/isp.ts
ejemplos/src/solid/dip.ts
ejemplos/src/fundamentos/libreria-vs-framework.ts
```

## Semana 03: patrones creacionales

Los ejemplos creacionales ya existentes corresponden a esta semana y se encuentran en `ejemplos/src/creacionales/`.

## Patrones creacionales

1. Factory Method — crear notificaciones por canal.
2. Abstract Factory — crear familias de componentes de interfaz compatibles.
3. Singleton — centralizar una configuración única y controlada.
4. Builder — construir un reporte con opciones legibles.
5. Prototype — clonar una configuración ya validada.

## Patrones de comportamiento

6. Observer — notificar a estudiantes suscritos cuando un curso publica material.
7. Command — encapsular acciones del portal académico para reutilizarlas desde botones.
8. Chain of Responsibility — validar una inscripción mediante una cadena de comprobaciones.
9. Visitor — agregar reportes sin modificar las clases de cursos y estudiantes.
10. Mediator — coordinar los controles de un formulario de inscripción.

## Semana 04: patrones estructurales

La presentación desarrolla cuatro patrones y presenta dos más como referencia:

1. Adapter — traducir una interfaz antigua para que pueda colaborar con el portal.
2. Proxy — controlar el acceso y retrasar la creación de un objeto pesado.
3. Facade — ocultar varios pasos detrás de una interfaz simple.
4. Decorator — agregar funcionalidades por composición y en tiempo de ejecución.
5. Bridge — separar la abstracción de la tecnología que la implementa.
6. Flyweight — compartir estado común entre muchos objetos parecidos.

Los ejemplos se encuentran en `ejemplos/src/estructurales/`. Composite no se implementa porque únicamente aparece en la portada de la presentación y no se desarrolla durante la clase.

La idea central de los ejemplos creacionales es separar el código que **usa** un objeto del código que decide **cómo se crea**. En los ejemplos de comportamiento, la atención está en cómo los objetos colaboran y se comunican. Los ejemplos de SOLID muestran cómo distribuir responsabilidades y dependencias. Cada ejemplo incluye un caso de uso, una implementación y una demostración breve en `src/index.ts`.

## Ejecutar

Requiere Node.js 18 o superior.

```bash
cd ejemplos
npm install
npm run build
npm start
```

Para revisar un patrón concreto, abre uno de estos archivos:

```text
ejemplos/src/solid/srp.ts
ejemplos/src/solid/ocp.ts
ejemplos/src/solid/lsp.ts
ejemplos/src/solid/isp.ts
ejemplos/src/solid/dip.ts
ejemplos/src/fundamentos/libreria-vs-framework.ts
ejemplos/src/creacionales/factory-method.ts
ejemplos/src/creacionales/abstract-factory.ts
ejemplos/src/creacionales/singleton.ts
ejemplos/src/creacionales/builder.ts
ejemplos/src/creacionales/prototype.ts
ejemplos/src/comportamiento/observer.ts
ejemplos/src/comportamiento/command.ts
ejemplos/src/comportamiento/chain-of-responsibility.ts
ejemplos/src/comportamiento/visitor.ts
ejemplos/src/comportamiento/mediator.ts
ejemplos/src/estructurales/adapter.ts
ejemplos/src/estructurales/proxy.ts
ejemplos/src/estructurales/facade.ts
ejemplos/src/estructurales/decorator.ts
ejemplos/src/estructurales/bridge.ts
ejemplos/src/estructurales/flyweight.ts
```

## Guía rápida de selección

| Problema | Patrón | Pregunta clave |
| --- | --- | --- |
| Elegir una variante de un producto | Factory Method | ¿Qué creador decide el tipo exacto? |
| Crear productos relacionados y compatibles | Abstract Factory | ¿Cómo evitamos mezclar familias? |
| Garantizar una instancia única | Singleton | ¿La unicidad es realmente necesaria? |
| Construir un objeto con muchas opciones | Builder | ¿Hay parámetros opcionales o pasos? |
| Reutilizar un objeto ya configurado | Prototype | ¿Copiar es más conveniente que reconstruir? |

### Guía rápida: comportamiento

| Problema | Patrón | Pregunta clave |
| --- | --- | --- |
| Muchos objetos necesitan enterarse de un cambio | Observer | ¿Quién quiere recibir la notificación? |
| Una acción puede venir de botones, menús o atajos | Command | ¿Puedo convertir la solicitud en un objeto? |
| Varias validaciones deben ejecutarse en orden | Chain of Responsibility | ¿Quién procesa o detiene la solicitud? |
| Necesito nuevos algoritmos sobre clases existentes | Visitor | ¿Puedo separar el algoritmo de los datos? |
| Muchos controles se conocen entre sí | Mediator | ¿Puede un objeto coordinar la conversación? |

### Guía rápida: estructurales

| Problema | Patrón | Pregunta clave |
| --- | --- | --- |
| Dos interfaces incompatibles deben colaborar | Adapter | ¿Puedo traducir la interfaz sin modificar el código existente? |
| Necesito controlar o retrasar el acceso a un objeto | Proxy | ¿Qué lógica debe ocurrir antes de delegar? |
| Un subsistema tiene demasiados pasos para el cliente | Facade | ¿Cuál es la operación simple que realmente necesita? |
| Quiero agregar funcionalidades combinables | Decorator | ¿Puedo envolver el objeto en lugar de crear subclases? |
| Dos jerarquías deben evolucionar por separado | Bridge | ¿Qué parte varía: la abstracción o la implementación? |
| Muchos objetos comparten información repetida | Flyweight | ¿Qué estado puede almacenarse una sola vez? |

## Enfoque didáctico

En cada patrón conviene explicar cuatro cosas: **problema → patrón elegido → razón → riesgo**. Los ejemplos son pequeños de forma intencional para que se pueda observar la responsabilidad de cada clase sin distraerse con una aplicación completa.

> Nota: Refactoring.Guru sirve como referencia conceptual y de estructura. Los escenarios y el código de este repositorio están escritos para la clase y no son una copia literal de su contenido.

Referencia: [patrones creacionales en Refactoring.Guru](https://refactoring.guru/design-patterns/creational-patterns).
