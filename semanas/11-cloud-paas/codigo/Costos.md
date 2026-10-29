# Consumo y costos en Vercel

Fuentes consultadas el 8 de octubre de 2026. El caso publica una web estática. No crea una VM, disco o IP en GCP. No usa funciones serverless ni optimización dinámica de imágenes.

## Qué revisar

Transferencia de archivos y solicitudes CDN son consumos del ejemplo. También existen límites de build y otras condiciones por plan. Si posteriormente agregamos funciones o servicios adicionales, tendrían unidades y límites propios.

La documentación de [Hobby](https://vercel.com/docs/plans/hobby) publica **100 GB de Fast Data Transfer** y **1 000 000 de CDN Requests** incluidos. Restringe Hobby a uso personal no comercial. Confirmar si la cuenta y el uso del docente son adecuados; el ejemplo académico no supone automáticamente elegibilidad. Revisar las condiciones antes de clase.

En Hobby exceder un límite no implica que podamos continuar pagando una tarifa incremental: puede ser necesario esperar a que se restablezca el uso. En planes de pago hay cargos y herramientas de gestión propios. No extrapolar un comportamiento entre planes.

## Ejercicio numérico, no factura

Supuesto didáctico: cada visita descarga 2 MB decimales (HTML, CSS e imagen en conjunto) y realiza 3 solicitudes a la plataforma. Sin reutilización de caché del navegador ni visitas parciales. Los 2 MB son una hipótesis para calcular, no una medición de esta web.

| Escenario | Transferencia estimada | Solicitudes estimadas |
|---|---:|---:|
| 10 000 visitas | 10 000 × 2 MB = 20 GB | 30 000 |
| 100 000 visitas | 100 000 × 2 MB = 200 GB | 300 000 |

En el primer escenario estas dos métricas quedan por debajo de las cuotas citadas, si no hay otro consumo relevante. En el segundo, la transferencia excede los 100 GB aunque las solicitudes no exceden 1 000 000. Una misma cuenta puede tener varios proyectos; el consumo agregado y la ventana de medición del plan también importan.

El ejemplo demuestra por qué reducir el tamaño de imágenes ayuda. La CDN puede reducir accesos a la fuente gestionada, pero servir la respuesta al visitante sigue transfiriendo datos. La caché del navegador puede evitar solicitudes y descargas; no se supone ese ahorro en el cálculo.

## Qué mostrar en el panel

1. Identificar cuenta y proyecto del ejemplo.
2. Abrir Usage y seleccionar el período mostrado por la plataforma.
3. Leer métricas y unidades, diferenciando la cuota incluida del uso real.
4. Consultar el plan y las condiciones de exceso o controles disponibles.
5. Retirar el proyecto de demostración cuando ya no se necesite, verificando antes su identidad.

No prometer consumo ilimitado ni presentar un monto USD calculado con tarifas que no corresponden al plan. El ejercicio enseña consumo, cuotas y decisiones de costo. Para una cotización de pago, usar [precios y consumo CDN](https://vercel.com/docs/manage-cdn-usage) con plan y ubicación pertinentes.
