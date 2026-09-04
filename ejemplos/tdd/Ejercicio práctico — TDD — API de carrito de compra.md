# Ejercicio práctico — TDD: API de carrito de compra

## Enunciado

Desarrollar una API REST mínima para administrar un carrito de compra y calcular el subtotal, el costo de envío y el total de una compra.

El ejercicio debe resolverse aplicando **Test-Driven Development (TDD)**. La API utilizará un catálogo fijo de productos creado en memoria y un único carrito en memoria. No se requiere autenticación, sesión de usuario, base de datos, pagos ni interfaz gráfica.

## Catálogo inicial

El servicio debe iniciar con estos productos disponibles:

| ID | Producto | Precio |
| --- | --- | ---: |
| `P001` | Cuaderno | Q25 |
| `P002` | Lapicero | Q5 |
| `P003` | Mochila | Q180 |

Los productos no se crean ni se modifican mediante la API. Sus precios permanecen fijos durante la ejecución del ejercicio.

## Funcionalidad requerida

### Consulta de productos

La API debe permitir consultar el catálogo de productos disponibles.

### Agregar productos al carrito

La API debe permitir agregar un producto indicando:

```json
{
  "productoId": "P001",
  "cantidad": 2
}
```

La cantidad debe ser un número entero positivo. Si se agrega nuevamente un producto que ya está en el carrito, su cantidad debe acumularse en una sola línea.

### Consulta del resumen del carrito

La API debe permitir consultar el resumen indicando una zona de entrega:

```text
GET /carrito/resumen?zona=local
```

Las zonas válidas son:

- `local`;
- `foranea`.

El resumen debe incluir los productos agregados, la cantidad, el precio unitario, el importe por producto, el subtotal, el costo de envío y el total.

Ejemplo de estructura esperada:

```json
{
  "zona": "local",
  "items": [
    {
      "productoId": "P001",
      "nombre": "Cuaderno",
      "cantidad": 2,
      "precioUnitario": 25,
      "importe": 50
    }
  ],
  "subtotal": 50,
  "envio": 25,
  "total": 75
}
```

### Vaciar el carrito

La API debe permitir vaciar el carrito para iniciar una nueva compra de ejemplo.

## Reglas de negocio

1. El importe de cada línea es `precio unitario × cantidad`.
2. El subtotal es la suma de los importes de todas las líneas.
3. El subtotal no cambia según la zona de entrega.
4. La zona únicamente determina el costo de envío.
5. Cuando el subtotal es menor que Q200:
   - la zona `local` tiene un envío de Q25;
   - la zona `foranea` tiene un envío de Q45.
6. Cuando el subtotal es igual o mayor que Q200, el envío es gratuito para ambas zonas.
7. El total es `subtotal + envío`.
8. Un producto inexistente, una cantidad inválida o una zona no reconocida deben producir un error claro y no deben modificar el estado del carrito.
9. Un carrito vacío debe devolver subtotal Q0, envío Q0 y total Q0 cuando se consulte con una zona válida.

## Comportamientos que deben quedar cubiertos

La solución debe permitir verificar, como mínimo, los siguientes casos:

| Situación | Resultado esperado |
| --- | --- |
| Consultar el catálogo inicial | Se encuentran los tres productos definidos. |
| Carrito vacío en zona `local` | Subtotal Q0, envío Q0 y total Q0. |
| Agregar dos cuadernos | Subtotal Q50. |
| Subtotal Q50 en zona `local` | Envío Q25 y total Q75. |
| Subtotal Q50 en zona `foranea` | Envío Q45 y total Q95. |
| Agregar una mochila y cuatro lapiceros | Subtotal exacto de Q200 y envío gratuito. |
| Subtotal mayor que Q200 | Envío gratuito en ambas zonas. |
| Agregar el mismo producto en solicitudes separadas | Una sola línea con la cantidad acumulada. |
| Agregar un producto inexistente | Error y carrito sin cambios. |
| Agregar cantidad cero, negativa o no entera | Error y carrito sin cambios. |
| Consultar una zona no reconocida | Error de validación. |
| Vaciar el carrito | El siguiente resumen muestra un carrito vacío. |

## Interfaz mínima sugerida

La API debe exponer operaciones equivalentes a las siguientes. La organización interna y el framework quedan a elección del estudiante.

| Operación | Método y ruta | Resultado esperado |
| --- | --- | --- |
| Listar productos | `GET /productos` | Catálogo inicial en memoria. |
| Agregar producto | `POST /carrito/items` | Producto agregado o cantidad acumulada. |
| Consultar resumen | `GET /carrito/resumen?zona=local` | Items, subtotal, envío y total. |
| Vaciar carrito | `DELETE /carrito` | Carrito sin items. |

## Alcance excluido

No forman parte del ejercicio:

- registro o autenticación de usuarios;
- sesiones o múltiples carritos;
- persistencia en una base de datos;
- creación, edición o eliminación de productos;
- descuentos, impuestos o cupones;
- procesamiento de pagos;
- inventario;
- interfaz web;
- integración con servicios externos.

## Entregable

El ejercicio debe entregar una API funcional con productos en memoria, el carrito y las reglas de cálculo indicadas, acompañada de pruebas automatizadas que permitan comprobar los comportamientos definidos y la conservación del requisito después de realizar cambios o refactorizaciones.

La implementación debe ser lo suficientemente pequeña para que el estudiante pueda explicar la relación entre cada requisito, cada prueba y el resultado observado.
