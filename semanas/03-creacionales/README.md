# Semana 03 — Patrones creacionales

[Presentación (PDF)](<./Semana 03 — Patrones de Diseño Creacionales.pdf>) · [Video Factory Method](./video/factory-method.mp4) · [Guion del video](./video/guion.md)

| Patrón | Problema | Razón para usarlo | Pregunta para discutir | Demo |
| --- | --- | --- | --- | --- |
| [Factory Method](./codigo/factory-method.ts) | Crear notificaciones por canal sin acoplar el servicio. | Delega la creación a subclases especializadas. | ¿Cuándo una fábrica simple sería suficiente? | `demoFactoryMethod` |
| [Abstract Factory](./codigo/abstract-factory.ts) | Crear componentes de una misma familia sin mezclarlos. | Mantiene compatibles los productos relacionados. | ¿Cuánto crece la fábrica al agregar familias? | `demoAbstractFactory` |
| [Singleton](./codigo/singleton.ts) | Centralizar una configuración única. | Controla la creación de una instancia compartida. | ¿La unicidad es necesaria o introduce estado global? | `demoSingleton` |
| [Builder](./codigo/builder.ts) | Construir un reporte con muchas opciones legibles. | Encadena pasos y valida el resultado al final. | ¿Cuándo conviene un objeto de opciones? | `demoBuilder` |
| [Prototype](./codigo/prototype.ts) | Crear variantes a partir de una configuración validada. | Clona una base y copia su estado mutable. | ¿La copia es superficial o profunda? | `demoPrototype` |

```bash
cd codigo
npx tsx -e "import('./singleton.ts').then(m => m.demoSingleton())"
```
