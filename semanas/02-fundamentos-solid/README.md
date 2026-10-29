# Semana 02 — Fundamentos y SOLID

[Presentación (PDF)](<./Semana 02 — Patrones de Diseño, SOLID, Frameworks y Librerías.pdf>) · [Video](./video/solid.mp4) · [Guion del video](./video/guion.md)

| Ejemplo | Problema | Razón para usarlo | Pregunta para discutir | Demo |
| --- | --- | --- | --- | --- |
| [Librería vs. framework](./codigo/fundamentos/libreria-vs-framework.ts) | Entender quién controla el flujo de ejecución. | Contrasta una llamada explícita con inversión de control. | ¿Cuánta autonomía conserva la aplicación? | `demoLibreriaVsFramework` |
| [SRP](./codigo/solid/srp.ts) | Una clase calcula, reporta y persiste a la vez. | Separa responsabilidades y razones para cambiar. | ¿Dónde termina cada responsabilidad? | `demoSrp` |
| [OCP](./codigo/solid/ocp.ts) | La nómina debe admitir nuevos tipos de empleado. | Extiende mediante nuevas implementaciones sin editar el cálculo. | ¿La abstracción realmente representa las variaciones? | `demoOcp` |
| [LSP](./codigo/solid/lsp.ts) | No todas las aves pueden volar. | Modela capacidades para mantener la sustitución válida. | ¿Qué contrato se rompería con una herencia incorrecta? | `demoLsp` |
| [ISP](./codigo/solid/isp.ts) | Una interfaz grande obliga a implementar métodos innecesarios. | Divide el contrato por capacidades de cliente. | ¿Cuándo varias interfaces pequeñas se vuelven ruido? | `demoIsp` |
| [DIP](./codigo/solid/dip.ts) | El servicio no debe depender de un repositorio concreto. | Inyecta una abstracción y permite cambiar el detalle. | ¿Quién compone las dependencias en una aplicación real? | `demoDip` |

```bash
cd codigo/solid
npx tsx -e "import('./srp.ts').then(m => m.demoSrp())"
```
