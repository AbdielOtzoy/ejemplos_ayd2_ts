# API de salud

API mínima para el ejemplo de TDD. Expone únicamente el endpoint `GET /health` en el puerto `3001`.

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
