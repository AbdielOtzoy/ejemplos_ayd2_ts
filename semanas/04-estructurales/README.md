# Semana 04 — Patrones estructurales

[Presentación (PDF)](<./Semana 04 — Patrones de Diseño Estructurales.pdf>)

| Patrón | Problema | Razón para usarlo | Pregunta para discutir | Demo |
| --- | --- | --- | --- | --- |
| [Adapter](./codigo/adapter.ts) | Conectar una interfaz nueva con una pasarela antigua. | Traduce el contrato sin modificar el código legado. | ¿Dónde deben vivir las conversiones y validaciones? | `demoAdapter` |
| [Proxy](./codigo/proxy.ts) | Retrasar y controlar el acceso a un objeto pesado. | Conserva la misma interfaz y carga bajo demanda. | ¿Cómo se manejan errores, caché y concurrencia? | `demoProxy` |
| [Facade](./codigo/facade.ts) | Ocultar varios pasos de registro al cliente. | Expone una operación simple sobre un subsistema. | ¿La fachada se convierte en un objeto demasiado grande? | `demoFacade` |
| [Decorator](./codigo/decorator.ts) | Combinar extras sin crear una subclase por combinación. | Agrega comportamiento por composición en tiempo de ejecución. | ¿El orden de envoltura cambia el resultado? | `demoDecorator` |
| [Bridge](./codigo/bridge.ts) | Hacer evolucionar notificaciones y canales por separado. | Separa la abstracción de su implementación. | ¿Qué dimensión debe variar de forma independiente? | `demoBridge` |
| [Flyweight](./codigo/flyweight.ts) | Muchos objetos repiten el mismo estilo. | Comparte el estado intrínseco y conserva la posición aparte. | ¿El ahorro de memoria compensa la complejidad? | `demoFlyweight` |

Composite aparece en la portada de la presentación, pero no se desarrolla en clase.

```bash
cd codigo
npx tsx -e "import('./adapter.ts').then(m => m.demoAdapter())"
```
