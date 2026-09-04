import { createServer } from "node:http";
import { Cart } from "./cart";

const port = 3001;
const cart = new Cart();

const server = createServer((request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (request.method === "GET") {
    const requestUrl = new URL(
      request.url ?? "/",
      `http://${request.headers.host ?? "localhost"}`
    );

    if (requestUrl.pathname === "/carrito/resumen") {
      const zona = requestUrl.searchParams.get("zona");

      if (zona !== "local" && zona !== "foranea") {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: "La zona debe ser local o foranea" }));
        return;
      }

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(cart.getSummary(zona)));
      return;
    }
  }

  if (request.method === "POST" && request.url === "/carrito/items") {
    let body = "";

    request.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      try {
        const { productoId, cantidad } = JSON.parse(body);
        const item = cart.addProduct(productoId, cantidad);
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify(item));
      } catch (error) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({ error: error instanceof Error ? error.message : "Solicitud inválida" })
        );
      }
    });
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: "Not found" }));
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`API activa en http://localhost:${port}`);
  });
}

export { server };
