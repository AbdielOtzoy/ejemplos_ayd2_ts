import type { AddressInfo } from "node:net";
import { server } from "./server";

let baseUrl = "";

function getBaseUrl(): string {
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("La API todavía no está escuchando en un puerto");
  }

  return `http://127.0.0.1:${(address as AddressInfo).port}`;
}

describe("API del carrito", () => {
  beforeAll((done) => {
    server.listen(0, "127.0.0.1", () => {
      baseUrl = getBaseUrl();
      done();
    });
  });

  beforeEach(async () => {
    // Cada prueba inicia con un estado independiente.
    const response = await fetch(`${baseUrl}/carrito`, { method: "DELETE" });
    expect(response.status).toBe(204);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("responde correctamente al endpoint de salud", async () => {
    const response = await fetch(`${baseUrl}/health`);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });

  it("agrega un producto y devuelve el resumen correcto", async () => {
    const addResponse = await fetch(`${baseUrl}/carrito/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productoId: "P001", cantidad: 2 })
    });

    const summaryResponse = await fetch(
      `${baseUrl}/carrito/resumen?zona=local`
    );

    expect(addResponse.status).toBe(201);
    expect(summaryResponse.status).toBe(200);
    await expect(summaryResponse.json()).resolves.toMatchObject({
      subtotal: 50,
      envio: 25,
      total: 75
    });
  });

  it("rechaza una zona inválida sin alterar el carrito", async () => {
    const response = await fetch(
      `${baseUrl}/carrito/resumen?zona=desconocida`
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "La zona debe ser local o foranea"
    });
  });
});
