# API de salud

API mínima para el ejemplo de TDD y pruebas no funcionales. Escucha en el puerto `3001`.

## Ejecutar

```bash
npm install
npm run build
npm start
```

## Ejecutar pruebas

```bash
npm test
```

Las pruebas de `src/cart.test.ts` comprueban agregar productos, acumular cantidades y rechazar productos o cantidades inválidas.

## Comprobar

```bash
curl http://localhost:3001/health
```

Respuesta esperada:

```json
{"status":"ok"}
```

Para agregar un producto al carrito:

```bash
curl -X POST http://localhost:3001/carrito/items \
  -H 'Content-Type: application/json' \
  -d '{"productoId":"P001","cantidad":2}'
```

Para limpiar el carrito antes de iniciar un escenario:

```bash
curl -X DELETE http://localhost:3001/carrito
```

## Pruebas de carga y estrés con k6

Con la API ejecutándose en una terminal, usar k6 desde otra:

```bash
npm run perf:load
npm run perf:stress
npm run perf:spike
npm run perf:soak
```

La prueba de carga usa una demanda esperada y aplica objetivos de errores y tiempo de respuesta. La prueba de estrés aumenta progresivamente los usuarios virtuales y deja que el grupo observe cuándo aparece degradación. La prueba spike aumenta el tráfico de forma repentina. La prueba soak mantiene una carga moderada para observar la estabilidad durante varios minutos.

Si la API usa otra dirección, se puede cambiar con `BASE_URL`:

```bash
BASE_URL=http://localhost:3001 npm run perf:load
```

Los escenarios k6 están escritos en TypeScript. Se pueden validar sin ejecutarlos con:

```bash
npm run check:perf
```
