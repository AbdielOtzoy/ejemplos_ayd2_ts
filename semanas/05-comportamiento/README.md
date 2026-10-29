# Semana 05 — Patrones de comportamiento

[Presentación (PDF)](<./Semana 05 — Patrones de Diseño de Comportamiento.pdf>)

| Patrón | Problema | Razón para usarlo | Pregunta para discutir | Demo |
| --- | --- | --- | --- | --- |
| [Observer](./codigo/observer.ts) | Avisar a varios estudiantes cuando cambia un curso. | Desacopla al emisor de sus suscriptores. | ¿Quién cancela suscripciones y evita fugas? | `demoObserver` |
| [Command](./codigo/command.ts) | Botones distintos deben ejecutar operaciones del portal. | Convierte una solicitud en un objeto intercambiable. | ¿Dónde se guardarían historial y deshacer? | `demoCommand` |
| [Chain of Responsibility](./codigo/chain-of-responsibility.ts) | Encadenar validaciones que pueden detener una inscripción. | Distribuye el procesamiento entre pasos independientes. | ¿Qué ocurre si ningún eslabón procesa la solicitud? | `demoChainOfResponsibility` |
| [Visitor](./codigo/visitor.ts) | Agregar reportes sin cambiar las clases de datos. | Separa operaciones de la estructura visitada. | ¿Qué costo tiene agregar un nuevo tipo de elemento? | `demoVisitor` |
| [Mediator](./codigo/mediator.ts) | Evitar que los controles de un formulario se conozcan entre sí. | Centraliza la coordinación de eventos. | ¿El mediador termina concentrando demasiada lógica? | `demoMediator` |

```bash
cd codigo
npx tsx -e "import('./observer.ts').then(m => m.demoObserver())"
```
