# Guion docente · Cloud, clase 2

**Costos y automatización en la nube**  
Análisis y Diseño de Sistemas 2 · 15 de octubre de 2026  
**Duración total: 100 minutos · 34 diapositivas**

Continuación de Cloud Clase 1. El grupo ya conoce la publicación de la web en Vercel y las bases de Docker y Linux. El docente explica el ejemplo existente de `ejemplos/cloud-clase-2`; no se requiere que los estudiantes aprovisionen sus propias VMs durante la sesión.

## Resultado esperado

Al terminar, el estudiante podrá identificar componentes del costo y explicar cómo observarlos; reconocer entradas y salidas de un módulo reutilizado; y seguir un playbook que compone roles, variables y handlers. La evidencia será anticipar los cambios de la demostración y responder las preguntas de cierre.

## Agenda

| Bloque | Ventana | Duración | Diapositivas |
|---|---|---:|---|
| Inicio y anuncios | 0–10 min | 10 min | 1–4 |
| Análisis de Costos en Nube (Cost Management) | 10–35 min | 25 min | 5–14 |
| Módulos y Reutilización de Código en Terraform | 35–50 min | 15 min | 15–22 |
| Ansible Playbooks y Roles para Automatización Compleja | 50–70 min | 20 min | 23–30 |
| Demostración del ejemplo existente | 70–95 min | 25 min | 31–33 |
| Cierre y preguntas | 95–100 min | 5 min | 34 |

## Preparación del docente

- Abrir presentación, editor, terminal y navegador. Tener disponibles las lecturas y el horario oficial si se explicarán durante los anuncios.
- Revisar Azure CLI, Terraform ≥ 1.6, Ansible, `curl`, la clave SSH configurada y las colecciones `community.general` y `ansible.posix` usadas por el ejemplo. Consultar `ansible-galaxy collection list`. El controlador de Ansible y sus dependencias deben estar listos antes de clase.
- Confirmar la cuenta y suscripción de Azure, cuotas, regiones permitidas, capacidad del tamaño elegido y tarifas actuales. Las restricciones de la cuenta descritas en el README corresponden a su ensayo; no son límites universales de Azure for Students.
- Ensayar antes de clase el recorrido de `ejemplos/cloud-clase-2/README.md` y confirmar la eliminación posterior. Tener capturas o salidas reales del ensayo para continuar si falla la red o Azure; identificarlas como evidencia previa.
- Mantener disponibles `ejemplos/cloud-clase-1/web/v1`, `web/v2`, `styles.css` y `assets`: el rol los reutiliza mediante rutas relativas.
- El inventario usa `~/.ssh/id_ed25519` desde `ansible.cfg`; debe corresponder a la clave pública enviada a las VMs. La configuración desactiva la comprobación de claves de host para esta demo: explicarlo como una simplificación del laboratorio, no como práctica de producción.
- No proyectar secretos, archivos de estado completos ni datos de facturación ajenos a la clase. La presentación muestra extractos del código; el editor permite consultar el archivo completo.

**Control del tiempo:** iniciar el bloque práctico al minuto 70. Si `apply` tarda, aprovechar la espera para recorrer salidas e inventario. Si Azure no permite crear recursos, explicar el código y usar evidencia real del ensayo. Reservar los últimos minutos de la demo para revisar `destroy`; no dejar recursos sin comprobar porque terminó el tiempo de exposición.

**Convenciones de lectura:** los comandos siguientes se ejecutan por el docente durante la clase, desde los directorios indicados. No se ejecutó infraestructura para preparar este material. Las tarifas de costos se verificaron en fuentes oficiales el 15 de octubre de 2026 y se expresan en USD. Los periodos, tamaños y cargas de los ejercicios son supuestos explícitos; los subtotales calculados no son facturas ni cotizaciones contractuales. Las tablas de VMs usan otras opciones y regiones para comparar, no el tamaño ni todas las regiones del ejemplo Azure.

## Cómo usar la ampliación

La explicación de costos ahora ocupa 25 minutos. Las bases de Terraform y Ansible se muestran en la presentación antes de ejecutar el ejemplo; por eso la demo aplica lo explicado en 25 minutos. Si se desea recorrer cada archivo con más calma, usar el guion como material de estudio y extender la sesión; no acelerar la limpieza de Azure.

La guía compartida de [Terraform y Ansible desde cero](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN) se usó como referencia pedagógica. Se contrastaron sus conceptos con el código y la documentación oficial. Aclaraciones que deben conservarse al explicar: `.terraform.lock.hcl` sí se versiona; borrar el estado no elimina recursos; módulos y roles comparten una finalidad de reutilización, pero no son idénticos; `--check` no equivale a una garantía completa; y una segunda ejecución no siempre reporta cero cambios.

## Supuestos de la comparación de precios

- Tarifas de lista bajo demanda, Linux, USD, sin contratos, Spot, impuestos, créditos promocionales ni descuentos educativos.
- AWS: t3.medium, 2 vCPU y 4 GiB, us-east-1, USD 0.0416/h. GCP: e2-medium, 2 vCPU y 4 GiB, us-central1, USD 0.03350571/h. Azure: Standard_B2s, 2 vCPU y 4 GiB, eastus, USD 0.0416/h. CPU nominal no implica rendimiento equivalente: revisar créditos y capacidad sostenida.
- Proyecciones para una VM durante 2, 24 y 730 horas. Las 730 horas son una convención de mes promedio; la factura real usa el consumo efectivo.
- Caso AWS: disco gp3 de 30 GiB, rendimiento base, USD 0.08 por unidad de capacidad/mes y una IPv4 pública a USD 0.005/h. La tarifa de disco usa la unidad GB-mes en la página de precios y GiB en las especificaciones del volumen. Se conserva el precio unitario publicado sin convertir esa capacidad a GB decimales para este ejercicio de aprovisionamiento.
- Cloud Run: us-central1, facturación por solicitudes, 1 vCPU y 0.5 GiB. Escenarios supuestos de 20 o 730 horas activas facturables agregadas y un millón de solicitudes. Subtotales brutos antes de capa gratuita y extras. No son una comparación de rendimiento equivalente con las VMs de 4 GiB.
- Redondear a centavos al final. Las fuentes de cada tabla están también en las notas de la presentación. La consulta de precios no crea recursos ni necesita desplegar infraestructura.

## Desarrollo por diapositiva

## 1. Costos y automatización en la nube

**Duración:** 1 min · **Ventana:** 0–1 min

**Explicación sugerida**

Esta sesión continúa los temas pendientes de la clase anterior. Ya vimos una publicación en una plataforma administrada; hoy retomamos la misma web y examinamos su operación sobre máquinas virtuales. La pregunta es cómo controlar el gasto y repetir un despliegue sin copiar configuraciones. El ejemplo ya está preparado: el objetivo de la demostración es leer sus decisiones y comprobar sus efectos, no escribir toda la infraestructura desde cero.

**Pregunta:** ¿Qué responsabilidades recuperamos al administrar nuestras propias VMs?

**Respuesta esperada:** El sistema operativo, los paquetes, la configuración del servidor y la operación, además de la aplicación.

**Qué mostrar:** Abrir la presentación y tener disponible ejemplos/cloud-clase-2/README.md.

**Transición:** Primero, veamos la agenda y los avisos del curso.

## 2. Agenda

**Duración:** 2 min · **Ventana:** 1–3 min

**Explicación sugerida**

La sesión conserva cien minutos: diez de inicio, veinticinco para comparar costos reales y modelos de servicio, quince para Terraform, veinte para Ansible, veinticinco de demostración y cinco de cierre. La teoría utiliza el mismo ejemplo que se abrirá en terminal, por lo que parte de su recorrido ya se explica antes del bloque práctico. Las preguntas breves sirven para comprobar comprensión sin convertir cada diapositiva en una lectura extensa.

**Pregunta:** ¿Qué evidencia permitiría saber que una automatización es repetible?

**Respuesta esperada:** Comparar el estado y los resultados de ejecuciones sucesivas bajo las mismas condiciones.

**Qué mostrar:** Presentar los bloques y sus tiempos. No ejecutar herramientas todavía.

**Transición:** Antes del contenido técnico, revisemos los anuncios importantes.

## 3. Anuncios importantes

**Duración:** 4 min · **Ventana:** 3–7 min

**Explicación sugerida**

Hacer una pausa para explicar los tres avisos: lectura de la práctica 2, lectura de la hoja de calificación de la fase 3 y horarios de calificación. Pedir que identifiquen dudas sobre lo que deben leer y sobre su participación en la calificación. Esta diapositiva funciona como recordatorio; las fechas, enlaces y franjas horarias se comunican oralmente o mediante el canal habitual del curso. No atribuir requisitos a documentos que no se están mostrando.

**Pregunta:** ¿Qué duda necesitan aclarar sobre las lecturas o los horarios?

**Respuesta esperada:** Recoger dudas concretas y resolverlas con la información oficial del curso.

**Qué mostrar:** Abrir los documentos y el horario oficial únicamente si el docente los tiene disponibles.

**Transición:** Retomemos ahora el punto en el que quedó la clase anterior.

## 4. La misma web, otras responsabilidades

**Duración:** 3 min · **Ventana:** 7–10 min

**Explicación sugerida**

La aplicación que sirve de ejemplo se conserva. En la clase anterior Docker se usó localmente y Vercel recibió los archivos del sitio. Ahora el ejemplo de cloud-clase-2 reutiliza la web de cloud-clase-1 y la sirve con Nginx en Azure. Separamos dos trabajos: preparar infraestructura y configurar el software dentro de ella. La separación es una decisión de este ejemplo; no significa que cada herramienta sea incapaz de realizar otras tareas. Tampoco dos VMs implican por sí solas alta disponibilidad: aquí no hay balanceador ni se demuestra recuperación ante fallas.

**Pregunta:** ¿Quién instala y configura Nginx en el ejemplo de hoy?

**Respuesta esperada:** Ansible; Terraform prepara las VMs, la red y otros recursos de Azure.

**Qué mostrar:** ejemplos/cloud-clase-2/README.md: estructura y recorrido.

**Transición:** Antes de crear recursos, necesitamos entender qué puede generar gasto.

## 5. Componentes del costo

**Duración:** 2 min · **Ventana:** 10–12 min

**Explicación sugerida**

Usar el código como lista de recursos que debemos cotizar: azurerm_linux_virtual_machine, os_disk y azurerm_public_ip. Pedir a los estudiantes que eviten estimar mirando únicamente la VM. La región, el tamaño, la duración y el tráfico previsto cambian el cálculo. Los cargos de servicios opcionales solo aplican si se habilitan. La estimación debe declarar moneda y periodo; después se compara con el consumo registrado en el ámbito correcto. No usar la frase «unos centavos» del README como una cotización actual de las tres máquinas.

**Pregunta:** Si apagamos la aplicación, ¿desaparecen todos los componentes del costo?

**Respuesta esperada:** No. Pueden conservarse discos, IPs u otros recursos con cargos propios.

**Qué mostrar:** terraform/modules/web_server/main.tf: VM, disco e IP pública.

**Transición:** Hagamos una cuenta sencilla con una tarifa ficticia.

**Fuentes:** [cost](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis), [billing](https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing). Consultadas el 15 de octubre de 2026.

## 6. VMs pequeñas: recursos y precio por hora

**Duración:** 3 min · **Ventana:** 12–15 min

**Explicación sugerida**

Comparar tres opciones para una web pequeña con Linux, compra bajo demanda y sin compromisos: AWS t3.medium en us-east-1, GCP e2-medium en us-central1 y Azure Standard_B2s en eastus. Cada una anuncia 2 vCPU y 4 GiB, pero no representan la misma CPU sostenida. T3 y B2s usan créditos de ráfaga; e2-medium es de núcleo compartido y sostiene aproximadamente una vCPU total. Son opciones de entrada, no un benchmark de rendimiento equivalente. Las tarifas corresponden solo al cómputo, consultadas el 15 de octubre de 2026. El precio Azure se consultó directamente en Retail Prices API: meter B2s, Consumption, sin Windows ni Spot. B2s es un tamaño anterior y se usa para comparación, no es el B2ats_v2 de nuestra demo.

**Pregunta:** ¿La fila más barata garantiza mejor rendimiento para nuestra aplicación?

**Respuesta esperada:** No. Primero hay que contrastar CPU sostenida, memoria, latencia, carga y servicios incluidos.

**Qué mostrar:** Mostrar las tres filas, las regiones y las fuentes en las notas. Aclarar que son precios de lista, no una cotización contractual.

**Transición:** Convirtamos el precio por hora en periodos de uso conocidos.

| Proveedor / VM | Región | Recursos | USD / hora |
|---|---|---|---|
| AWS · t3.medium | us-east-1 | 2 vCPU · 4 GiB | 0.04160000 |
| GCP · e2-medium | us-central1 | 2 vCPU · 4 GiB | 0.03350571 |
| Azure · B2s | eastus | 2 vCPU · 4 GiB | 0.04160000 |

**Fuentes:** [awsprice](https://docs.aws.amazon.com/prescriptive-guidance/latest/optimize-costs-microsoft-workloads/right-size-selection.html), [awscpu](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-credits-baseline-concepts.html), [gcpprice](https://cloud.google.com/products/compute/pricing/general-purpose?hl=es-419), [gcpcpu](https://docs.cloud.google.com/compute/docs/general-purpose-machines), [azureprice](https://prices.azure.com/api/retail/prices?%24filter=armRegionName+eq+%27eastus%27+and+armSkuName+eq+%27Standard_B2s%27+and+priceType+eq+%27Consumption%27&currencyCode=USD), [azurespec](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/bv1-series). Consultadas el 15 de octubre de 2026.

## 7. Una VM por horas, días o meses

**Duración:** 2 min · **Ventana:** 15–17 min

**Explicación sugerida**

El cálculo multiplica la tarifa por las horas. AWS y Azure: 0.0416 × 2 = 0.0832; × 24 = 0.9984; × 730 = 30.368. GCP: 0.03350571 × 2 = 0.06701142; × 24 = 0.80413704; × 730 = 24.4591683. Redondeamos a centavos solo al mostrar el resultado final. Las 730 horas son una convención de mes promedio; un mes real tiene otra duración. Estas cifras son una proyección de consumo a tarifa publicada, no una factura completa. No descuentan capas gratuitas, créditos educativos ni compromisos. No incluyen discos, direcciones públicas, impuestos, tráfico ni cargos adicionales por créditos CPU de AWS Unlimited.

**Pregunta:** ¿Cuánto pagarían por tres máquinas iguales encendidas todo el mes?

**Respuesta esperada:** Solo de cómputo: AWS o Azure USD 91.10; GCP USD 73.38, multiplicando los importes sin redondear por tres.

**Qué mostrar:** Resolver una multiplicación con la clase y distinguir precio unitario de subtotal.

**Transición:** La VM necesita otros recursos; añadamos algunos a la cuenta.

| Una VM | 2 horas | 24 horas | 730 horas |
|---|---|---|---|
| AWS · t3.medium | USD 0.08 | USD 1.00 | USD 30.37 |
| GCP · e2-medium | USD 0.07 | USD 0.80 | USD 24.46 |
| Azure · B2s | USD 0.08 | USD 1.00 | USD 30.37 |

**Fuentes:** [awsprice](https://docs.aws.amazon.com/prescriptive-guidance/latest/optimize-costs-microsoft-workloads/right-size-selection.html), [gcpprice](https://cloud.google.com/products/compute/pricing/general-purpose?hl=es-419), [azureprice](https://prices.azure.com/api/retail/prices?%24filter=armRegionName+eq+%27eastus%27+and+armSkuName+eq+%27Standard_B2s%27+and+priceType+eq+%27Consumption%27&currencyCode=USD), [awsbilling](https://aws.amazon.com/ec2/pricing/on-demand/). Consultadas el 15 de octubre de 2026.

## 8. AWS: la VM no es toda la cuenta

**Duración:** 3 min · **Ventana:** 17–20 min

**Explicación sugerida**

Construir un subtotal realista para una VM t3.medium de Linux en us-east-1 durante 730 horas. Cómputo: USD 30.368. Un disco EBS gp3 de 30 unidades de capacidad facturadas a USD 0.08 por mes: USD 2.40, usando rendimiento base y sin IOPS o throughput extra. Una IPv4 pública a USD 0.005 por hora: USD 3.65. Suma sin redondear: USD 36.418, que se muestra como USD 36.42. Este sigue siendo un subtotal parcial: faltan transferencia de datos, copias de respaldo, balanceador o NAT si se usan, observabilidad adicional, impuestos y posibles créditos CPU. La VM sola sugería USD 30.37: el disco y la IP ya incrementaron esa estimación. Los recursos conservados pueden seguir generando cargos aunque se detenga el cómputo.

**Pregunta:** ¿Qué falta antes de presentar USD 36.42 como presupuesto completo?

**Respuesta esperada:** La demanda de tráfico, respaldos, servicios de red y otros cargos aplicables, además de condiciones comerciales e impuestos.

**Qué mostrar:** Relacionar cada renglón con un recurso que tendría una aplicación desplegada.

**Transición:** Una plataforma administrada puede cobrar usando unidades diferentes.

| Componente | Supuesto de uso | USD / mes |
|---|---|---|
| VM t3.medium | 0.0416 × 730 h | 30.37 |
| Disco EBS gp3 · 30 GiB | 30 × 0.08 / mes | 2.40 |
| Una IPv4 pública | 0.005 × 730 h | 3.65 |
| Subtotal parcial | Sin tráfico ni otros extras | 36.42 |

**Fuentes:** [awsprice](https://docs.aws.amazon.com/prescriptive-guidance/latest/optimize-costs-microsoft-workloads/right-size-selection.html), [ebs](https://aws.amazon.com/blogs/storage/migrate-your-amazon-ebs-volumes-from-gp2-to-gp3-and-save-up-to-20-on-costs/), [ebspricing](https://aws.amazon.com/ebs/pricing/), [ipv4](https://aws.amazon.com/vpc/pricing/), [awsbilling](https://aws.amazon.com/ec2/pricing/on-demand/). Consultadas el 15 de octubre de 2026.

## 9. Cloud Run: precio por consumo activo

**Duración:** 2 min · **Ventana:** 20–22 min

**Explicación sugerida**

Cloud Run es una plataforma administrada para contenedores. Para este ejercicio usar us-central1 y facturación basada en solicitudes. Las unidades activas cuestan USD 0.000024 por vCPU-segundo, USD 0.0000025 por GiB-segundo y USD 0.40 por millón de solicitudes. Este modelo no es el único de Cloud Run y no representa todas las PaaS. Si varias solicitudes comparten una instancia concurrentemente, no se suman sus duraciones para cobrar varias veces la misma CPU asignada. Se debe estimar el tiempo de instancia facturable y el escalado. La cuenta también puede incluir arranque, instancias mínimas, red, builds, registro de imágenes y otros servicios.

**Pregunta:** ¿Un millón de solicitudes basta para calcular el costo de la plataforma?

**Respuesta esperada:** No. También necesitamos CPU, memoria, tiempo facturable de instancia, concurrencia y configuración de escalado.

**Qué mostrar:** Identificar cada unidad en la página oficial de precios y contrastarla con VM-hora.

**Transición:** Veamos dos usos hipotéticos con esas tarifas reales.

| Recurso activo | Unidad | Tarifa USD |
|---|---|---|
| CPU | vCPU-segundo | 0.000024 |
| Memoria | GiB-segundo | 0.0000025 |
| Solicitudes | 1 millón | 0.40 |

**Fuentes:** [cloudrun](https://cloud.google.com/run/pricing), [scaling](https://docs.cloud.google.com/run/docs/about-instance-autoscaling). Consultadas el 15 de octubre de 2026.

## 10. Cloud Run: tráfico intermitente o continuo

**Duración:** 3 min · **Ventana:** 22–25 min

**Explicación sugerida**

Usar un mismo tamaño de 1 vCPU y 0.5 GiB y un millón de solicitudes al mes, sin instancias mínimas. En el escenario intermitente suponemos 20 horas de tiempo activo facturable agregado entre todas las instancias: 72,000 segundos. CPU = USD 1.728, RAM = USD 0.09 y solicitudes = USD 0.40: subtotal USD 2.218, mostrado USD 2.22. En el segundo escenario suponemos 730 horas activas agregadas: 2,628,000 segundos. CPU = USD 63.072, RAM = USD 3.285 y solicitudes = USD 0.40: USD 66.757, mostrado USD 66.76. Son escenarios brutos antes de capa gratuita, no facturas; si esa franquicia está disponible puede reducir estos importes. Arranques u otra actividad facturable deben incluirse en las horas estimadas. No comparar estos subtotales como equivalentes de rendimiento a las VMs de 4 GiB.

**Pregunta:** ¿Por qué cambió el costo si el número de solicitudes es el mismo?

**Respuesta esperada:** Porque aumentó el tiempo activo facturable de las instancias; una solicitud más lenta o mayor escalado también consume recursos.

**Qué mostrar:** Mostrar las fórmulas y pedir identificar qué supuesto tendría que medirse en una aplicación real.

**Transición:** El costo y la operación ayudan a elegir entre PaaS y máquinas virtuales.

| Escenario supuesto | CPU + RAM | Solicitudes | Subtotal bruto |
|---|---|---|---|
| 20 h activas / mes | USD 1.82 | USD 0.40 | USD 2.22 |
| 730 h activas / mes | USD 66.36 | USD 0.40 | USD 66.76 |

**Fuentes:** [cloudrun](https://cloud.google.com/run/pricing), [scaling](https://docs.cloud.google.com/run/docs/about-instance-autoscaling). Consultadas el 15 de octubre de 2026.

## 11. Cuándo conviene PaaS o una VM

**Duración:** 3 min · **Ventana:** 25–28 min

**Explicación sugerida**

Usar esta matriz como criterio de arquitectura y no como regla de precio universal. Una web o API compatible con la plataforma y un equipo pequeño suelen favorecer PaaS: se delega más operación. Una carga intermitente puede favorecer una plataforma capaz de escalar a cero, revisando cold starts, mínimos y restricciones. Un sistema que exige acceso al sistema operativo, paquetes especiales o procesos no compatibles puede necesitar una VM. Una carga sostenida se debe cotizar en ambos modelos, incluyendo tiempo humano de parches, respaldos, observabilidad y recuperación. Una VM de menor tarifa no es necesariamente la opción de menor costo total. PaaS no significa sin servidores ni sin responsabilidades: el equipo conserva código, datos, permisos y configuración. Para la web estática de la clase anterior conviene evaluar hosting estático antes de administrar tres VMs.

**Pregunta:** Para una web estática del curso, ¿qué comprarían primero: tres VMs o hosting estático?

**Respuesta esperada:** Evaluaría hosting estático administrado; las VMs del ejemplo tienen una finalidad de aprendizaje.

**Qué mostrar:** Pedir a la clase justificar el modelo para una API con picos y para un sistema legado que requiere control del SO.

**Transición:** Después del modelo de servicio, elegimos la modalidad de compra.

| Situación | Primera opción a evaluar | Motivo |
|---|---|---|
| Web/API compatible; poco equipo de operación | PaaS | Menos administración de servidores |
| Carga intermitente; tolera arranque en frío | PaaS con escalado a cero | Menos capacidad ociosa |
| Control del SO o software especial | VM / IaaS | Mayor control del entorno |
| Carga estable todo el día | Cotizar ambos | Comparar servicio + operación |

**Fuentes:** [paas](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree), [scaling](https://docs.cloud.google.com/run/docs/about-instance-autoscaling). Consultadas el 15 de octubre de 2026.

## 12. Modalidades de compra y ahorro

**Duración:** 2 min · **Ventana:** 28–30 min

**Explicación sugerida**

Bajo demanda es adecuado para empezar y medir, pagando el uso sin asumir un compromiso largo. Los compromisos de gasto o recursos pueden reducir la tarifa cuando existe una base estable y conocida, pero pagar capacidad no utilizada puede anular el ahorro. Los modelos Spot o interrumpibles son útiles para trabajos que pueden reintentarse y toleran desalojo; no son un reemplazo directo de una VM que debe estar siempre disponible. No fijar un porcentaje de ahorro universal: depende del proveedor, región, tamaño, plazo y disponibilidad. Antes de comprar un compromiso, reducir recursos ociosos, dimensionar con mediciones y estimar la demanda. Los créditos educativos y niveles gratuitos tienen condiciones; no equivalen a infraestructura permanentemente gratuita.

**Pregunta:** ¿Usarían una VM interrumpible como única instancia de un examen en línea?

**Respuesta esperada:** No, si el servicio requiere continuidad y no está diseñado para tolerar interrupciones.

**Qué mostrar:** Contrastar un laboratorio de dos horas con una carga medida y estable durante un año.

**Transición:** La estimación inicial se debe contrastar con el consumo real.

**Fuentes:** [awsbilling](https://aws.amazon.com/ec2/pricing/on-demand/), [gcpprice](https://cloud.google.com/products/compute/pricing/general-purpose?hl=es-419). Consultadas el 15 de octubre de 2026.

## 13. Estimación y consumo real

**Duración:** 3 min · **Ventana:** 30–33 min

**Explicación sugerida**

Plantear una investigación sencilla: el gasto supera la estimación. Primero fijar periodo y suscripción o grupo de recursos; luego desglosar por servicio o recurso para ubicar la diferencia. En este ejemplo revisaría si quedaron máquinas activas más tiempo de lo esperado o si omití un componente. Los datos de costos pueden tardar en aparecer: una vista vacía inmediatamente después del despliegue no demuestra costo cero. Las etiquetas environment y curso aparecen en las VMs del código, pero no en todos los recursos; no asumir que un filtro por etiqueta reúne automáticamente todo el costo del ambiente.

**Pregunta:** Si la factura es mayor que la estimación, ¿qué revisarían primero?

**Respuesta esperada:** El periodo y alcance de la comparación, y luego qué recursos y servicios explican la diferencia.

**Qué mostrar:** Si está disponible, mostrar Cost Analysis sin exponer datos ajenos a la clase. Alternativa: explicar el recorrido verbalmente.

**Transición:** La medición se complementa con avisos y decisiones de limpieza.

**Fuentes:** [cost](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis). Consultadas el 15 de octubre de 2026.

## 14. Presupuestos, alertas y limpieza

**Duración:** 2 min · **Ventana:** 33–35 min

**Explicación sugerida**

Un presupuesto permite seguir un importe y configurar avisos; detener recursos requiere una acción adicional o automatización explícita. En Azure, una VM detenida y todavía asignada puede seguir cobrando cómputo. La desasignación elimina ese cargo de cómputo, pero pueden continuar cargos de discos y otros recursos. En la práctica terminaremos con terraform destroy y comprobaremos los recursos gestionados. El comando no elimina recursos ajenos al estado ni borra consumo ya acumulado. La limpieza debe hacerse sobre la suscripción y el estado correctos.

**Pregunta:** ¿Llegar al presupuesto apaga automáticamente las tres VMs?

**Respuesta esperada:** No; el aviso por sí solo no detiene recursos.

**Qué mostrar:** Señalar el paso de cierre del README. La eliminación se ejecutará al final de la demostración.

**Transición:** Además del gasto, debemos controlar la duplicación de la infraestructura.

**Fuentes:** [budget](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets), [billing](https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing). Consultadas el 15 de octubre de 2026.

## 15. Terraform: provider y recurso

**Duración:** 2 min · **Ventana:** 35–37 min

**Explicación sugerida**

El provider azurerm traduce operaciones de Terraform a la API de Azure; local permite generar un archivo en la computadora del docente. Un resource declara una entidad gestionada. En el ejemplo, azurerm_resource_group es el tipo y this es la etiqueta local; name es el nombre real enviado a Azure. Leer estos tres nombres evita confundir la dirección del código con el nombre de la nube. Terraform describe el estado deseado y determina las operaciones necesarias; no es una lista de comandos SSH.

**Pregunta:** ¿Cambiar la etiqueta local this y cambiar name son exactamente la misma operación?

**Respuesta esperada:** No. La etiqueta forma parte de la dirección de Terraform; name es una propiedad del recurso real. Un cambio requiere revisar el plan y, si corresponde, mover direcciones de estado.

**Qué mostrar:** terraform/versions.tf y modules/web_server/main.tf.

**Transición:** Las referencias indican relaciones entre recursos.

**Fragmento proyectado:**

```hcl
resource "azurerm_resource_group" "this" {
  name     = "rg-${local.prefix}"
  location = var.location
}
```

**Fuentes:** [providers](https://developer.hashicorp.com/terraform/language/providers), [resources](https://developer.hashicorp.com/terraform/language/resources), [reference](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN). Consultadas el 15 de octubre de 2026.

## 16. Dependencias y memoria del estado

**Duración:** 2 min · **Ventana:** 37–39 min

**Explicación sugerida**

Las referencias entre atributos permiten inferir dependencias: por ejemplo, la red lee el grupo de recursos y la interfaz lee subred e IP. El grafo determina el orden; escribir un bloque primero no impone por sí mismo el orden de creación. El estado relaciona direcciones Terraform con IDs reales. En este ejemplo ambas llamadas comparten estado de la raíz. No borrar terraform.tfstate para volver a empezar: los recursos pueden permanecer y una nueva ejecución puede producir conflictos o intentar duplicarlos. Se debe conservar y recuperar el estado. El archivo puede contener datos sensibles. En trabajo de equipo se evalúa un backend remoto con controles de acceso y bloqueo compatibles.

**Pregunta:** ¿Borrar el estado elimina las VMs en Azure?

**Respuesta esperada:** No. Borra la relación local con esos recursos y complica su administración.

**Qué mostrar:** Leer una referencia resource_group_name y una dirección en state list; evitar proyectar el estado completo.

**Transición:** Con esa memoria, Terraform puede mostrar un plan antes de aplicar.

**Fuentes:** [state](https://developer.hashicorp.com/terraform/language/state), [resources](https://developer.hashicorp.com/terraform/language/resources), [reference](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN). Consultadas el 15 de octubre de 2026.

## 17. Comandos y lectura del plan

**Duración:** 2 min · **Ventana:** 39–41 min

**Explicación sugerida**

init prepara providers, módulos y backend; validate revisa coherencia de la configuración, no disponibilidad ni cuotas; plan anticipa operaciones y apply las ejecuta. Mostrar + crear, ~ actualizar, - destruir y -/+ reemplazar. Si se guarda un plan aprobado con plan -out, se puede aplicar ese archivo; el comando apply sin archivo vuelve a planificar. La lockfile .terraform.lock.hcl fija selecciones de providers y se versiona junto al código; el estado y la carpeta .terraform no. Esta distinción corrige una simplificación del material de referencia. plan no es una cotización, no garantiza que Azure tenga capacidad y puede usar lecturas de datos o actualizar metadatos locales.

**Pregunta:** ¿Un plan válido garantiza que la suscripción tenga cuota para crear las tres VMs?

**Respuesta esperada:** No. La disponibilidad y cuota se comprueban en el proveedor y pueden impedir apply.

**Qué mostrar:** versions.tf y, durante la demo, salida de terraform plan.

**Transición:** Ahora relacionemos esas bases con el problema de copiar configuraciones.

| Comando | Para qué se usa |
|---|---|
| init / validate | Preparar dependencias / revisar configuración |
| plan / apply | Revisar cambios / ejecutar operaciones |
| output / state list | Consultar salidas / listar direcciones gestionadas |
| destroy | Revisar y eliminar los recursos gestionados |

**Fuentes:** [lock](https://developer.hashicorp.com/terraform/language/files/dependency-lock), [providers](https://developer.hashicorp.com/terraform/language/providers), [reference](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN). Consultadas el 15 de octubre de 2026.

## 18. La duplicación complica los cambios

**Duración:** 2 min · **Ventana:** 41–43 min

**Explicación sugerida**

Abrir 00-sin-modulos/main.tf y buscar la regla de SSH. El ejemplo pretende mostrar cómo dos copias se separan con el tiempo: una puede conservar una regla distinta. Un módulo reúne recursos relacionados para reutilizarlos cambiando entradas. No basta con mover archivos a una carpeta; la configuración raíz debe llamar al módulo. Tampoco un módulo vuelve segura cualquier entrada: admin_cidr puede recibir un rango demasiado amplio si el operador lo proporciona. El beneficio concreto es mantener una definición común que se pueda revisar y corregir.

**Pregunta:** Si corregimos una regla en una copia, ¿se corrige automáticamente la otra?

**Respuesta esperada:** No. Con duplicación hay que localizar y mantener cada copia.

**Qué mostrar:** terraform/00-sin-modulos/main.tf y luego terraform/modules/web_server/main.tf.

**Transición:** Veamos las entradas y salidas de esa definición compartida.

**Fuentes:** [modules](https://developer.hashicorp.com/terraform/language/modules/develop). Consultadas el 15 de octubre de 2026.

## 19. El contrato de un módulo

**Duración:** 2 min · **Ventana:** 43–45 min

**Explicación sugerida**

Explicar el módulo web_server con la analogía de parámetros, cuerpo y resultado. environment participa en nombres y etiquetas; instance_count controla cuántas IPs, interfaces y VMs se crean mediante count. admin_cidr determina el origen autorizado para SSH. La salida public_ips recoge las direcciones creadas y permite que la raíz genere el inventario. Esta analogía ayuda a leer, pero un módulo no es una función que se ejecute una sola vez y desaparezca: sus recursos quedan identificados en el estado. main.tf, variables.tf y outputs.tf son una convención de organización.

**Pregunta:** ¿Qué información necesita Ansible que Terraform descubre al crear las VMs?

**Respuesta esperada:** Sus direcciones IP públicas, expuestas por el módulo.

**Qué mostrar:** modules/web_server/variables.tf → main.tf → outputs.tf.

**Transición:** El mismo contrato puede usarse con parámetros distintos.

**Fuentes:** [modules](https://developer.hashicorp.com/terraform/language/modules/develop). Consultadas el 15 de octubre de 2026.

## 20. Una definición, dos ambientes

**Duración:** 2 min · **Ventana:** 45–47 min

**Explicación sugerida**

Mostrar las dos llamadas reales y aclarar que el extracto omite entradas para proyectarlo. Las llamadas comparten source, pero environment, location, instance_count y address_space permiten producir recursos diferentes. En el repositorio staging usa la región location y producción prod_location. Cada instancia tiene su grupo de recursos y red; no comparten una red por el hecho de usar el mismo módulo. Señalar module.staging y module.prod en las direcciones del estado. Son dos ambientes dentro de una misma configuración raíz y un mismo estado: aquí no se enseña aislamiento mediante estados separados.

**Pregunta:** ¿Compartir el código del módulo significa compartir la misma VM o red?

**Respuesta esperada:** No. Cada llamada define su propia instancia de los recursos.

**Qué mostrar:** terraform/main.tf y, durante la demostración, terraform state list.

**Transición:** Las salidas conectan esta infraestructura con la configuración del software.

**Fragmento proyectado:**

```hcl
module "staging" {
  source         = "./modules/web_server"
  environment    = "staging"
  instance_count = 1
  # otras entradas en el archivo
}

module "prod" {
  source         = "./modules/web_server"
  environment    = "prod"
  instance_count = 2
  # otras entradas en el archivo
}
```

**Fuentes:** [calls](https://developer.hashicorp.com/terraform/language/block/module). Consultadas el 15 de octubre de 2026.

## 21. count: varias VMs sin copiar bloques

**Duración:** 2 min · **Ventana:** 47–49 min

**Explicación sugerida**

instance_count vale uno en staging y dos en producción. El módulo usa count en IP, interfaz y VM; count.index permite enlazar cada interfaz con su IP y cada VM con su interfaz. Los índices comienzan en cero. La referencia web[1] identifica la segunda instancia del recurso, no una segunda definición del módulo. El operador [*] recoge un atributo de todas las instancias. La dirección completa module.prod.azurerm_linux_virtual_machine.web[1] combina llamada, tipo, etiqueta e índice. Si cambiamos la cantidad, debemos revisar el plan: reducir count puede proponer destruir instancias; no es un cambio puramente documental.

**Pregunta:** ¿Cuántas VMs propone crear count cuando instance_count vale dos?

**Respuesta esperada:** Dos instancias del recurso, con índices 0 y 1.

**Qué mostrar:** modules/web_server/main.tf: count en IPs, NICs y VMs; outputs.tf para [*].

**Transición:** Esas direcciones e IPs se exponen mediante salidas.

**Fragmento proyectado:**

```hcl
count = var.instance_count

# Referencia a la interfaz de cada VM:
azurerm_network_interface.web[count.index].id

# IP de todas las copias:
azurerm_public_ip.web[*].ip_address
```

**Fuentes:** [count](https://developer.hashicorp.com/terraform/language/meta-arguments/count), [reference](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN). Consultadas el 15 de octubre de 2026.

## 22. Salidas e inventario de Ansible

**Duración:** 1 min · **Ventana:** 49–50 min

**Explicación sugerida**

Seguir el dato, no memorizar comandos: las IPs nacen en recursos de Azure, el módulo las expone y la raíz las entrega a templatefile. inventory.tftpl crea los grupos staging y prod, y web reúne ambos como hijos. local_file escribe el resultado en ansible/inventory.ini. El inventario generado no se edita manualmente: una siguiente ejecución puede sobrescribirlo. Terraform no está ejecutando los roles de Ansible en este ejemplo; después el docente invoca ansible-playbook.

**Pregunta:** ¿Generar inventory.ini ya instala Nginx?

**Respuesta esperada:** No. Solo deja los destinos preparados para que Ansible los utilice.

**Qué mostrar:** terraform/inventory.tftpl y el recurso local_file de terraform/main.tf.

**Transición:** Ahora veamos cómo Ansible utiliza esos destinos.

**Fragmento proyectado:**

```hcl
output "public_ips" {
  value = azurerm_public_ip.web[*].ip_address
}

# La raíz usa las IPs de ambas llamadas:
staging = module.staging.public_ips
prod    = module.prod.public_ips
```

**Fuentes:** [calls](https://developer.hashicorp.com/terraform/language/block/module). Consultadas el 15 de octubre de 2026.

## 23. Ansible: conexión e inventario

**Duración:** 2 min · **Ventana:** 50–52 min

**Explicación sugerida**

Ansible se ejecuta desde el equipo controlador y en este ejemplo conecta por SSH como azureuser, usando la clave configurada en ansible.cfg. El inventario organiza destinos por grupos; web contiene staging y prod como grupos hijos. No instalar un agente persistente no elimina los requisitos del destino: estos módulos de Linux requieren Python y permisos adecuados. ping de Ansible prueba que puede conectar y ejecutar su módulo, no usa ICMP. El inventario de la diapositiva presenta nombres simbólicos para leer la estructura; en la demo el archivo generado contiene las IPs reales.

**Pregunta:** ¿Por qué el grupo web alcanza a las máquinas de ambos ambientes?

**Respuesta esperada:** Porque contiene a staging y prod en [web:children].

**Qué mostrar:** ansible.cfg y el inventario generado; ansible-inventory --graph durante la demo.

**Transición:** Cada tarea llama un módulo de Ansible.

**Fragmento proyectado:**

```yaml
[staging]
<IP de staging>

[prod]
<IP de prod 0>
<IP de prod 1>

[web:children]
staging
prod
```

**Fuentes:** [plays](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html), [reference](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN). Consultadas el 15 de octubre de 2026.

## 24. Módulo y tarea en Ansible

**Duración:** 3 min · **Ventana:** 52–55 min

**Explicación sugerida**

Un módulo de Ansible implementa una operación concreta. apt gestiona paquetes, copy publica archivos, template escribe un archivo a partir de variables y service controla servicios. Una task invoca ese módulo con argumentos y un nombre legible. Leer state: present como el estado que se desea comprobar, no como una orden para reinstalar siempre. En la estrategia lineal por defecto, la secuencia de tareas se aplica a los hosts del conjunto activo; no todas las estrategias de Ansible tienen exactamente ese orden. Distinguir el término módulo: en Terraform agrupa configuración y recursos reutilizables; en Ansible suele referirse a la unidad de operación invocada por la tarea.

**Pregunta:** ¿Un módulo de Terraform y ansible.builtin.apt son el mismo concepto?

**Respuesta esperada:** No. El primero agrupa infraestructura; el segundo implementa una operación que una tarea utiliza.

**Qué mostrar:** roles/webserver/tasks/main.yml: tarea Instalar nginx.

**Transición:** El play selecciona equipos y compone ese trabajo.

**Fragmento proyectado:**

```yaml
- name: Instalar nginx
  ansible.builtin.apt:
    name: nginx
    state: present
```

**Fuentes:** [plays](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html), [reference](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN). Consultadas el 15 de octubre de 2026.

## 25. Playbooks: tareas sobre un inventario

**Duración:** 2 min · **Ventana:** 55–57 min

**Explicación sugerida**

Un inventario indica a qué equipos conectarse. Un play relaciona un grupo de equipos con tareas y opciones de ejecución; un playbook contiene uno o más plays. En site.yml, hosts: web selecciona staging y prod mediante el inventario generado. become: true solicita elevación de privilegios para instalar paquetes y escribir configuración. common prepara paquetes y zona horaria; webserver instala y configura la web. Leer el playbook de arriba abajo permite anticipar el recorrido antes de ejecutarlo. YAML exige respetar la indentación.

**Pregunta:** ¿Qué cambiaría si el play seleccionara hosts: staging?

**Respuesta esperada:** Ese play actuaría sobre los destinos de staging en lugar del grupo web completo.

**Qué mostrar:** ansible/site.yml y terraform/inventory.tftpl.

**Transición:** La organización en roles permite separar responsabilidades dentro del playbook.

**Fragmento proyectado:**

```yaml
- hosts: web
  become: true
  roles:
    - common
    - webserver
```

**Fuentes:** [plays](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html). Consultadas el 15 de octubre de 2026.

## 26. Organización del rol webserver

**Duración:** 3 min · **Ventana:** 57–60 min

**Explicación sugerida**

Comparar playbook-plano.yml con site.yml. El playbook plano es válido y se puede ejecutar otra vez; el problema didáctico es que mezcla tareas concretas y resulta menos cómodo extraerlas para otros proyectos. El rol agrupa archivos relacionados bajo una estructura que Ansible reconoce. No se necesitan todas las carpetas posibles de un rol. En nuestro caso defaults proporciona una configuración inicial, tasks describe el trabajo, templates construye el archivo del servidor y handlers declara la recarga. Mantener common separado permite distinguir la preparación general del sistema de la publicación de la web.

**Pregunta:** ¿En qué archivo buscarían la plantilla que cambia los encabezados HTTP?

**Respuesta esperada:** roles/webserver/templates/site.conf.j2.

**Qué mostrar:** ansible/playbook-plano.yml y las cuatro rutas del rol webserver.

**Transición:** Los mismos roles pueden producir versiones distintas mediante variables.

**Fuentes:** [roles](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html). Consultadas el 15 de octubre de 2026.

## 27. Variables y plantillas por ambiente

**Duración:** 3 min · **Ventana:** 60–63 min

**Explicación sugerida**

Mostrar que no duplicamos el rol para cada ambiente. Los archivos de group_vars cambian ambiente y web_version. Los defaults del rol aportan otros valores, como web_port y web_root. En este caso las variables de grupo reemplazan los defaults; una variable extra con -e puede reemplazar el valor para una ejecución. Seguir web_version hasta la selección del HTML y hasta X-Version en site.conf.j2. La promoción por línea de comandos no guarda el cambio en group_vars/prod.yml: una ejecución posterior sin -e recuperará v1 si el archivo continúa igual. Para persistir la promoción se debe cambiar la variable del archivo correspondiente.

**Pregunta:** ¿La opción -e web_version=v2 modifica group_vars/prod.yml?

**Respuesta esperada:** No. Cambia el valor efectivo para esa ejecución.

**Qué mostrar:** group_vars/staging.yml, group_vars/prod.yml, defaults/main.yml y templates/site.conf.j2.

**Transición:** Además de elegir valores, necesitamos evitar cambios innecesarios.

**Fuentes:** [roles](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html). Consultadas el 15 de octubre de 2026.

## 28. La plantilla activa el handler

**Duración:** 3 min · **Ventana:** 63–66 min

**Explicación sugerida**

La tarea template toma site.conf.j2, reemplaza variables y compara el resultado con el destino. Si cambia el archivo, reporta changed y notifica Recargar nginx. El handler con ese nombre usa el módulo service con state: reloaded. En nuestro play los handlers se ejecutan normalmente después de los roles; varias notificaciones del mismo handler se agrupan. Hay mecanismos de vaciado anticipado y políticas de fallas, por lo que «siempre al final» sería demasiado absoluto. web_version cambia también X-Version en la configuración: por eso la promoción del ejemplo produce una recarga. Cambiar solo HTML no exige necesariamente recargar Nginx y la tarea copy del ejemplo no tiene notify.

**Pregunta:** ¿Por qué cambiar la versión causa una recarga en este ejemplo?

**Respuesta esperada:** Porque web_version se usa en X-Version; cambia la plantilla y su tarea notifica al handler.

**Qué mostrar:** Comparar tasks/main.yml, templates/site.conf.j2 y handlers/main.yml.

**Transición:** Repetir el playbook permite comprobar que los cambios necesarios convergen.

**Fragmento proyectado:**

```yaml
- name: Configurar sitio de nginx
  ansible.builtin.template:
    src: site.conf.j2
    dest: /etc/nginx/sites-available/default
    mode: "0644"
  notify: Recargar nginx
```

**Fuentes:** [handlers](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_handlers.html), [reference](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN). Consultadas el 15 de octubre de 2026.

## 29. Idempotencia y resultados

**Duración:** 2 min · **Ventana:** 66–68 min

**Explicación sugerida**

La idempotencia permite repetir una operación conservando el estado deseado cuando las condiciones no cambian. Revisar PLAY RECAP por host: ok incluye tareas correctas y changed es un subconjunto de ellas; no sumar ambos como si fueran grupos excluyentes. failed indica una tarea con error; unreachable señala que Ansible no pudo ejecutar en el host por un problema de conexión. Leer siempre el mensaje concreto. Una repetición inmediata de site.yml puede mostrar changed=0, pero una caché de paquetes vencida, variables diferentes o cambios externos pueden alterar el resultado. Comparar las ejecuciones permite distinguir convergencia de una tarea que reporta cambios innecesarios.

**Pregunta:** Si la segunda ejecución reporta cambios, ¿qué revisarían antes de concluir que algo falló?

**Respuesta esperada:** La tarea que cambió, sus entradas, la caché y cualquier modificación externa; no asumir una causa solo por el contador.

**Qué mostrar:** roles/webserver/tasks/main.yml y handlers/main.yml.

**Transición:** Con estos conceptos, recorramos la demostración completa.

**Fuentes:** [plays](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html), [handlers](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_handlers.html). Consultadas el 15 de octubre de 2026.

## 30. Comandos para revisar y limitar cambios

**Duración:** 2 min · **Ventana:** 68–70 min

**Explicación sugerida**

Antes de ejecutar, leer inventario y comprobar sintaxis. --check predice cambios en los módulos que lo soportan; --diff añade diferencias de contenido cuando están disponibles. No es una prueba completa ni garantiza que una primera instalación funcione: tareas posteriores pueden depender de archivos que el modo de comprobación no creó. Revisar tareas con check_mode: false, que sí pueden ejecutarse. --diff puede mostrar información sensible. --limit reduce los hosts y -e cambia variables efectivas, sin editar los archivos del repositorio. Usar primero --syntax-check y --list-hosts para errores simples. El resumen distingue failed de unreachable, pero hay que leer la causa concreta: un fallo de tarea no prueba por sí solo que toda la conectividad esté bien.

**Pregunta:** ¿Que --check no reporte cambios demuestra que toda la automatización funcionará?

**Respuesta esperada:** No. Depende del soporte de los módulos y de condiciones de ejecución que una simulación puede no reproducir.

**Qué mostrar:** Leer los comandos; en la demo limitar la promoción a prod y revisar el resumen por host.

**Transición:** Con esas herramientas podemos explicar la ejecución del ejemplo sin adivinar los efectos.

| Comando u opción | Qué permite revisar |
|---|---|
| ansible-inventory --graph | Grupos y destinos del inventario |
| site.yml --syntax-check | Sintaxis del playbook |
| site.yml --check --diff | Predicción y diferencias cuando hay soporte |
| site.yml --limit prod -e web_version=v2 | Alcance y versión de una ejecución |

**Fuentes:** [check](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_checkmode.html), [reference](https://claude.ai/artifact/MvXoQYtxyDShTEwZK1F2NN). Consultadas el 15 de octubre de 2026.

## 31. Demo 1 · Infraestructura e inventario

**Duración:** 9 min · **Ventana:** 70–79 min

**Explicación sugerida**

Minutos 70–73: contrastar el código duplicado y el módulo. Minutos 73–77: revisar cuenta, variables, init y plan; aplicar si la infraestructura no se preparó antes. Minutos 77–79: seguir las IPs al inventario y mostrar state list. Si apply tarda, usar la espera para explicar el puente. No prometer una cantidad fija de cambios: leer el plan. Si Azure falla, usar evidencia real del ensayo y aclarar que es previa.

**Pregunta:** ¿Qué prueba que las dos llamadas del módulo tienen recursos independientes?

**Respuesta esperada:** Sus direcciones module.staging y module.prod en el estado y sus nombres o IPs distintos.

**Qué mostrar:** Usar los comandos completos del bloque de demostración 1 del guion.

**Transición:** El inventario ya permite conectar Ansible a las máquinas.

### Comandos · Demo 1

Desde la raíz del repositorio:

```bash
cd ejemplos/cloud-clase-2/terraform
az login
az account show -o table
export ARM_SUBSCRIPTION_ID="$(az account show --query id -o tsv)"
export TF_VAR_admin_cidr="$(curl -4 -fsS https://ifconfig.me)/32"
```

Confirmar que `TF_VAR_admin_cidr` contiene la IP pública correcta seguida de `/32` y que `ARM_SUBSCRIPTION_ID` corresponde a la suscripción del ejemplo. Si la consulta de IP falla, corregir el valor antes de continuar. No usar `0.0.0.0/0` para resolver un problema de conexión.

Abrir `00-sin-modulos/main.tf` solo para leerlo; **no aplicar esa configuración**. Compararlo con `main.tf` y el módulo. Después ejecutar desde el directorio `terraform` principal:

```bash
terraform init
terraform plan
terraform apply
terraform output
terraform state list
cat ../ansible/inventory.ini
```

Leer el plan antes de confirmar. Comprobar las IPs: una de staging y dos de producción; relacionarlas con los grupos del inventario. `terraform plan` muestra cambios de infraestructura, no una cotización del proveedor. El estado de ambas llamadas está en la misma raíz. No publicar su contenido completo.


**Fuentes:** [calls](https://developer.hashicorp.com/terraform/language/block/module). Consultadas el 15 de octubre de 2026.

## 32. Demo 2 · Playbook, roles y repetición

**Duración:** 9 min · **Ventana:** 79–88 min

**Explicación sugerida**

Minutos 79–81: verificar conexión y el playbook plano. Minutos 81–85: ejecutar site.yml y recorrer los roles en la salida. Minutos 85–88: repetir inmediatamente, leer qué cambió y comprobar la web y sus encabezados. Este bloque aplica los conceptos explicados; no volver a leer cada archivo entero. Si changed no es cero, identificar la tarea y sus entradas antes de concluir que hay un error.

**Pregunta:** ¿Cómo distinguirían un cambio esperado de una pérdida de idempotencia?

**Respuesta esperada:** Identificando la tarea y verificando si cambiaron entradas, caché o estado externo.

**Qué mostrar:** Usar el bloque de demostración 2; abrir navegador y consultar encabezados con curl.

**Transición:** Ahora cambiaremos solo el alcance de producción y comprobaremos el handler.

### Comandos · Demo 2

Partiendo del directorio `terraform` de la demo anterior:

```bash
cd ../ansible
ansible web -m ping
ansible-playbook playbook-plano.yml
ansible-playbook site.yml
ansible-playbook site.yml
```

Comparar el resumen de las dos ejecuciones de `site.yml`. Verificar cada tarea que reporte `changed`; la caché de paquetes tiene `cache_valid_time: 3600`, por lo que el momento de ejecución también importa. No volver a ejecutar el playbook plano después de los roles: usa otra ruta de publicación y solo se muestra como contraste inicial.

Obtener las IPs sin copiarlas manualmente:

```bash
STAGING_IP="$(cd ../terraform && terraform output -json staging_ips | python3 -c 'import json,sys; print(json.load(sys.stdin)[0])')"
PROD_IP="$(cd ../terraform && terraform output -json prod_ips | python3 -c 'import json,sys; print(json.load(sys.stdin)[0])')"
curl -sI "http://$STAGING_IP" | grep -i '^X-'
curl -sI "http://$PROD_IP" | grep -i '^X-'
```

Abrir también ambas direcciones en el navegador. Resultado esperado según las variables del repositorio: staging con `X-Ambiente: staging` y `X-Version: v2`; producción con `X-Ambiente: prod` y `X-Version: v1`. Repetir la comprobación para la segunda IP de producción si se quiere contrastar ambos hosts; las dos deben recibir la misma versión del grupo.


**Fuentes:** [plays](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html), [handlers](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_handlers.html). Consultadas el 15 de octubre de 2026.

## 33. Demo 3 · Promoción y cierre de recursos

**Duración:** 7 min · **Ventana:** 88–95 min

**Explicación sugerida**

Minutos 88–91: promover v2 con --limit prod y -e, comprobar la plantilla y el handler. Aclarar que la variable extra es temporal. Minutos 91–95: revisar y ejecutar destroy y comprobar el estado y los recursos de Azure. Si tarda, mantener la eliminación visible durante el cierre y confirmar que finaliza. Eliminar recursos no borra el consumo acumulado.

**Pregunta:** ¿Terraform destroy elimina un recurso que creamos manualmente y no está gestionado por este estado?

**Respuesta esperada:** No necesariamente. Debemos revisar el alcance del estado y verificar qué recursos permanecen.

**Qué mostrar:** Usar el bloque de demostración 3 del guion y revisar los recursos restantes.

**Transición:** Cerremos relacionando las decisiones de costo y automatización.

### Comandos · Demo 3

Desde `ansible`, conservando `PROD_IP` del paso anterior:

```bash
ansible-playbook site.yml --limit prod -e web_version=v2
curl -sI "http://$PROD_IP" | grep -i '^X-'
```

Mostrar que la tarea de plantilla cambia y notifica al handler en producción. El contenido HTML también se actualiza. `--limit prod` afecta a todos los hosts que coinciden con ese grupo, en este caso dos. Comprobar `X-Version: v2` y abrir la web.

Para explicar persistencia, mostrar `group_vars/prod.yml`: sigue declarando `web_version: v1`. Editar ese valor sería la forma de guardar la promoción; para esta demostración basta con explicarlo. Una siguiente ejecución sin `-e` volverá a aplicar lo que declara el archivo.

Cerrar los recursos del ejemplo:

```bash
cd ../terraform
terraform destroy
terraform state list
```

Antes de confirmar la eliminación, revisar el plan y verificar que es el estado del ejemplo. Al terminar correctamente, `state list` debería quedar vacío de recursos gestionados. Revisar también en Azure que los recursos de los grupos `rg-ads2-staging` y `rg-ads2-prod` se hayan eliminado. No confundir la desaparición de los recursos con una factura de cero: el consumo previo permanece y los datos pueden tardar en actualizarse.

Si falla una eliminación, leer el error y completar la limpieza después de resolverlo. No borrar el archivo de estado para ocultar recursos pendientes.


**Fuentes:** [handlers](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_handlers.html), [billing](https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing). Consultadas el 15 de octubre de 2026.

## 34. Preguntas de cierre

**Duración:** 5 min · **Ventana:** 95–100 min

**Explicación sugerida**

Reservar tres minutos para respuestas y dos para dudas. Pedir que cada respuesta incluya evidencia del recorrido: un recurso que permanezca, una llamada al módulo o la tarea que contiene notify. Relacionar el costo con la duración y la limpieza; la reutilización con una definición compartida y recursos propios por llamada; la idempotencia con comparar estado deseado y actual. Retomar el objetivo de hoy: poder explicar qué se crea, cómo se configura y cómo se controla el consumo. Si quedan dudas de la práctica 2 o de la HC de la fase 3, remitir a las lecturas anunciadas sin añadir requisitos nuevos.

**Pregunta:** Responder las tres preguntas proyectadas y recoger dudas finales.

**Respuesta esperada:** 1) Discos, IPs u otros recursos conservados; incluso cómputo si solo está detenida y asignada. 2) Se comparte la definición; cada llamada conserva sus recursos. 3) Un cambio reportado por la tarea template que notifica Recargar nginx.

**Qué mostrar:** Confirmar el resultado final de destroy antes de cerrar la sesión.

**Transición:** Fin de la clase.

## Contingencias para la demostración

| Situación | Qué revisar o explicar |
|---|---|
| Azure rechaza región, tamaño o cuota | Consultar las restricciones actuales de la suscripción. No asumir que la capacidad del ensayo sigue disponible. Continuar con el código y la evidencia previa si no se resuelve dentro del tiempo. |
| Terraform no encuentra suscripción | Revisar `az account show` y `ARM_SUBSCRIPTION_ID` en la terminal que ejecuta Terraform. |
| Falta la clave pública | Verificar `ssh_public_key_path` y que corresponda a la clave privada de Ansible. |
| Ansible no conecta | Revisar IP administrativa, regla SSH, usuario `azureuser`, clave, estado de las VMs e inventario generado. Si cambió la IP del docente, actualizar la variable y revisar un nuevo plan. |
| Falta `community.general.timezone` o el callback | Comprobar las colecciones antes de la sesión y preparar las dependencias del controlador. |
| Segunda ejecución con cambios | Localizar la tarea: caché, diferencias de variables o cambios externos. Explicar el resultado observado. |
| Promoción sin recarga | Confirmar si la plantilla realmente cambió; si ya tenía v2, la ausencia de recarga puede ser el comportamiento correcto. |
| Eliminación incompleta | Conservar el estado, revisar el error y completar la eliminación. Verificar los recursos en Azure. |

## Evidencias mínimas de comprensión

- **Costos:** el estudiante menciona al menos un componente distinto al cómputo y explica que una alerta no es un límite automático de gasto.
- **Terraform:** identifica la definición compartida y las dos llamadas; explica que tienen recursos propios.
- **Ansible:** sigue `web_version` hasta la plantilla y reconoce la tarea que notifica al handler.
- **Operación:** identifica la evidencia de limpieza y distingue consumo acumulado de recursos todavía activos.
