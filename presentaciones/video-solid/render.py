#!/usr/bin/env python3
"""Video SOLID; reutiliza el render educativo del curso."""
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('render_base', ROOT.parent / 'video-factory-method' / 'render.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
m.ROOT = ROOT
m.WORK = ROOT / '.render'
m.SCENES = [
('Introducción', 'Principios\nSOLID', 'Diseñar para entender\ny cambiar con confianza.', 'intro', 'Cinco principios para gestionar responsabilidades y dependencias.'),
('SRP', 'Una razón\npara cambiar', 'Responsabilidad única.', 'srp', 'Cálculo, reporte y persistencia separados.'),
('OCP', 'Extender el\ncomportamiento', 'Abierto a extensión;\ncerrado a modificación.', 'ocp', 'La nómina usa EmpleadoPagable y admite nuevos tipos.'),
('LSP', 'Sustituir sin\nromper contratos', 'Sustitución de Liskov.', 'lsp', 'Ave permite comer; AveVoladora añade volar.'),
('ISP', 'Interfaces\npor capacidad', 'Segregación de interfaces.', 'isp', 'Imprimible, Escaneable y Faxable son capacidades independientes.'),
('DIP', 'Depender de\nabstracciones', 'Inversión de dependencias.', 'dip', 'UsuarioService recibe RepositorioUsuarios.'),
('En conjunto', 'Cómo se\ncomplementan', 'Cambios con alcance\nmás predecible.', 'together', 'Responsabilidades, contratos y dependencias trabajan juntos.'),
('Límites', 'Aplicar con\ncriterio', 'La complejidad también\ntiene un costo.', 'limits', 'Evitar clases e interfaces sin una necesidad concreta.'),
('Resumen', 'Cinco preguntas\npara revisar', 'SOLID como guía\nde diseño.', 'summary', 'Preguntas prácticas para revisar los cinco principios.'),
]
texts = [
['¿Por qué un cambio pequeño termina afectando tantas partes del programa? Muchas veces, el problema está en cómo repartimos responsabilidades y conectamos las clases.',
 'SOLID reúne cinco principios de diseño orientado a objetos. Sirven para razonar sobre cambios, contratos y dependencias, usando ejemplos concretos del curso.'],
['La S significa responsabilidad única. Una clase debería tener una razón coherente para cambiar, ligada a una responsabilidad del sistema.',
 'En nuestro ejemplo, CalculadoraPago calcula el salario, ReporteHoras genera el reporte y RepositorioEmpleados se encarga de guardar los datos.',
 'Una modificación en el formato del reporte llega a ReporteHoras. Cambiar la fórmula de pago afecta a CalculadoraPago, sin mezclar ambas decisiones.',
 'Esto no significa que cada clase deba tener un solo método. La pregunta es qué cambios pertenecen a la misma responsabilidad.'],
['La O significa abierto y cerrado. Queremos extender un comportamiento sin modificar repetidamente la lógica estable que ya utiliza ese comportamiento.',
 'La función calcularNomina recorre objetos que cumplen EmpleadoPagable. Cada empleado proporciona su propio método calcularPago, y la función utiliza ese contrato.',
 'EmpleadoTiempoCompleto devuelve su salario mensual. EmpleadoPorHora multiplica las horas por la tarifa. La nómina trabaja igual con ambos tipos.',
 'Si aparece un empleado por comisión, podemos incorporar otra implementación. El punto donde construimos la colección todavía debe elegir los objetos adecuados.'],
['La L corresponde a sustitución de Liskov. Un subtipo debe poder utilizarse donde se espera su tipo base, respetando las promesas de comportamiento.',
 'Si todas las aves prometieran volar, un pingüino rompería esa expectativa. Lanzar un error desde volar no resolvería el problema del contrato.',
 'El ejemplo define Ave con comer, y AveVoladora añade la capacidad de volar. Aguila extiende AveVoladora; Pinguino extiende solamente Ave.',
 'Alimentar acepta ambas aves. HacerVolar exige AveVoladora. Además de las firmas, debemos respetar resultados, condiciones válidas y expectativas sobre errores.'],
['La I significa segregación de interfaces. Un cliente debería depender de las operaciones que realmente necesita, evitando contratos enormes con capacidades ajenas.',
 'Tenemos tres interfaces: Imprimible, Escaneable y Faxable. Una impresora básica implementa Imprimible, mientras una multifuncional puede implementar las tres.',
 'La función imprimirDocumento recibe un Imprimible. Puede usar ambos dispositivos sin exigir escaneo o fax, ni obligar a implementar métodos vacíos.'],
['La D significa inversión de dependencias. La lógica de alto nivel y los detalles técnicos deben apoyarse en abstracciones adecuadas.',
 'UsuarioService recibe un RepositorioUsuarios por constructor. Ese contrato declara buscarPorCorreo, que es la operación que el servicio necesita para saludar.',
 'RepositorioEnMemoria y RepositorioSqlSimulado implementan el mismo contrato. Podemos elegir cualquiera al construir el servicio, sin cambiar su lógica de saludo.',
 'Pasar una dependencia por constructor es inyección de dependencias. La inversión consiste en orientar el diseño hacia el contrato, separándolo de los detalles concretos.'],
['Los principios se complementan. Responsabilidad única organiza los motivos de cambio, mientras abierto y cerrado permite agregar variantes alrededor de contratos estables.',
 'Liskov protege las expectativas de esos contratos. Segregación mantiene pequeñas las capacidades necesarias, e inversión reduce la dependencia directa sobre detalles técnicos.'],
['Aplicarlos exige criterio. Crear una interfaz para cada clase o una jerarquía para cada decisión puede aumentar el trabajo sin mejorar el diseño.',
 'Empieza por cambios reales, límites claros y contratos que puedas explicar. Extrae una abstracción cuando represente una necesidad concreta del programa.'],
['Para revisar tu diseño, pregunta: ¿qué hace cambiar esta clase? ¿Cómo agrego una variante? ¿Puedo sustituir sus implementaciones sin sorpresas?',
 'Después revisa: ¿cada cliente recibe solo las capacidades necesarias? ¿La lógica de negocio depende de un contrato adecuado? Esas cinco preguntas resumen SOLID.']
]
m.CUES = [(i, text) for i, group in enumerate(texts) for text in group]
original_label = m.label
def label(draw, xy, value, *args, **kwargs):
    value = value.replace('PATRONES CREACIONALES', 'DISEÑO DE SOFTWARE').replace('FACTORY METHOD', 'SOLID')
    return original_label(draw, xy, value, *args, **kwargs)
m.label = label
rows = {
'intro': [('S · Responsabilidad', 'un motivo coherente de cambio'), ('O · Extensión', 'variantes sobre un contrato'), ('L · Sustitución', 'promesas de comportamiento'), ('I · Interfaces', 'capacidades necesarias'), ('D · Dependencias', 'lógica orientada a abstracciones')],
'srp': [('CalculadoraPago', 'calcular salario'), ('ReporteHoras', 'generar reporte'), ('RepositorioEmpleados', 'guardar datos')],
'ocp': [('EmpleadoPagable', 'calcularPago()'), ('Tiempo completo', 'salario mensual'), ('Por hora', 'horas × tarifa'), ('Nueva variante', 'otra implementación')],
'lsp': [('Ave', 'comer() · águila y pingüino'), ('AveVoladora', 'volar() · águila'), ('Contrato respetado', 'hacerVolar recibe AveVoladora')],
'isp': [('Imprimible', 'impresora básica y multifuncional'), ('Escaneable', 'multifuncional'), ('Faxable', 'multifuncional')],
'dip': [('UsuarioService', 'recibe el contrato por constructor'), ('RepositorioUsuarios', 'buscarPorCorreo(correo)'), ('Implementaciones', 'memoria · SQL simulado')],
 'together': [('Responsabilidades', 'organizar motivos de cambio'), ('Contratos', 'extender y sustituir con confianza'), ('Dependencias', 'capacidades pequeñas y abstracciones')],
'limits': [('Necesidad concreta', 'partir de cambios reales'), ('Contrato claro', 'explicar qué promete'), ('Costo razonable', 'evitar jerarquías innecesarias')],
'summary': [('S', '¿Por qué cambia esta clase?'), ('O', '¿Cómo agrego una variante?'), ('L', '¿La sustitución respeta el contrato?'), ('I', '¿Qué capacidades necesita el cliente?'), ('D', '¿De qué depende la lógica?')]
}
def diagram(draw, kind):
    data = rows[kind]
    height = 66 if len(data) == 5 else 78
    gap = 12 if len(data) == 5 else 17
    top = 139 if len(data) >= 4 else 175
    for i, (title, body) in enumerate(data):
        y = top + i * (height + gap)
        color = [m.TEAL,m.GOLD,m.BLUE,m.CORAL,m.TEAL][i]
        m.rounded(draw, (625,y,1175,y+height),m.PANEL,(46,64,95),18)
        label(draw,(647,y+10),title,21,color)
        label(draw,(647,y+39),body,16,m.MUTED)
m.diagram = diagram
if __name__ == '__main__':
    m.main()
    (ROOT / 'factory-method.mp4').rename(ROOT / 'solid.mp4')
    for name in ('guion.md','storyboard.md'):
        p = ROOT / name
        p.write_text(p.read_text().replace('Factory Method','Principios SOLID').replace('ejemplos/creacionales/factory-method.ts','ejemplos/solid/'), encoding='utf-8')
