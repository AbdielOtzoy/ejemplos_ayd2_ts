# Guion — Principios SOLID

Duración: 4.72 min · Voz: Paulina (español de México) · Formato: 16:9, 1280 × 720.

## Narración

### Escena 1: Introducción

> ¿Por qué un cambio pequeño termina afectando tantas partes del programa? Muchas veces, el problema está en cómo repartimos responsabilidades y conectamos las clases.
> SOLID reúne cinco principios de diseño orientado a objetos. Sirven para razonar sobre cambios, contratos y dependencias, usando ejemplos concretos del curso.

### Escena 2: SRP

> La S significa responsabilidad única. Una clase debería tener una razón coherente para cambiar, ligada a una responsabilidad del sistema.
> En nuestro ejemplo, CalculadoraPago calcula el salario, ReporteHoras genera el reporte y RepositorioEmpleados se encarga de guardar los datos.
> Una modificación en el formato del reporte llega a ReporteHoras. Cambiar la fórmula de pago afecta a CalculadoraPago, sin mezclar ambas decisiones.
> Esto no significa que cada clase deba tener un solo método. La pregunta es qué cambios pertenecen a la misma responsabilidad.

### Escena 3: OCP

> La O significa abierto y cerrado. Queremos extender un comportamiento sin modificar repetidamente la lógica estable que ya utiliza ese comportamiento.
> La función calcularNomina recorre objetos que cumplen EmpleadoPagable. Cada empleado proporciona su propio método calcularPago, y la función utiliza ese contrato.
> EmpleadoTiempoCompleto devuelve su salario mensual. EmpleadoPorHora multiplica las horas por la tarifa. La nómina trabaja igual con ambos tipos.
> Si aparece un empleado por comisión, podemos incorporar otra implementación. El punto donde construimos la colección todavía debe elegir los objetos adecuados.

### Escena 4: LSP

> La L corresponde a sustitución de Liskov. Un subtipo debe poder utilizarse donde se espera su tipo base, respetando las promesas de comportamiento.
> Si todas las aves prometieran volar, un pingüino rompería esa expectativa. Lanzar un error desde volar no resolvería el problema del contrato.
> El ejemplo define Ave con comer, y AveVoladora añade la capacidad de volar. Aguila extiende AveVoladora; Pinguino extiende solamente Ave.
> Alimentar acepta ambas aves. HacerVolar exige AveVoladora. Además de las firmas, debemos respetar resultados, condiciones válidas y expectativas sobre errores.

### Escena 5: ISP

> La I significa segregación de interfaces. Un cliente debería depender de las operaciones que realmente necesita, evitando contratos enormes con capacidades ajenas.
> Tenemos tres interfaces: Imprimible, Escaneable y Faxable. Una impresora básica implementa Imprimible, mientras una multifuncional puede implementar las tres.
> La función imprimirDocumento recibe un Imprimible. Puede usar ambos dispositivos sin exigir escaneo o fax, ni obligar a implementar métodos vacíos.

### Escena 6: DIP

> La D significa inversión de dependencias. La lógica de alto nivel y los detalles técnicos deben apoyarse en abstracciones adecuadas.
> UsuarioService recibe un RepositorioUsuarios por constructor. Ese contrato declara buscarPorCorreo, que es la operación que el servicio necesita para saludar.
> RepositorioEnMemoria y RepositorioSqlSimulado implementan el mismo contrato. Podemos elegir cualquiera al construir el servicio, sin cambiar su lógica de saludo.
> Pasar una dependencia por constructor es inyección de dependencias. La inversión consiste en orientar el diseño hacia el contrato, separándolo de los detalles concretos.

### Escena 7: En conjunto

> Los principios se complementan. Responsabilidad única organiza los motivos de cambio, mientras abierto y cerrado permite agregar variantes alrededor de contratos estables.
> Liskov protege las expectativas de esos contratos. Segregación mantiene pequeñas las capacidades necesarias, e inversión reduce la dependencia directa sobre detalles técnicos.

### Escena 8: Límites

> Aplicarlos exige criterio. Crear una interfaz para cada clase o una jerarquía para cada decisión puede aumentar el trabajo sin mejorar el diseño.
> Empieza por cambios reales, límites claros y contratos que puedas explicar. Extrae una abstracción cuando represente una necesidad concreta del programa.

### Escena 9: Resumen

> Para revisar tu diseño, pregunta: ¿qué hace cambiar esta clase? ¿Cómo agrego una variante? ¿Puedo sustituir sus implementaciones sin sorpresas?
> Después revisa: ¿cada cliente recibe solo las capacidades necesarias? ¿La lógica de negocio depende de un contrato adecuado? Esas cinco preguntas resumen SOLID.
