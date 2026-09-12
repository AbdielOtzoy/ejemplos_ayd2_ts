import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3001";
const SUMMARY_URL = `${BASE_URL}/carrito/resumen?zona=local`;

// Un spike representa un aumento repentino de tráfico.
export const options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "5s", target: 100 },
    { duration: "15s", target: 100 },
    { duration: "5s", target: 5 },
    { duration: "10s", target: 0 }
  ]
};

export function setup(): void {
  // Evita que una ejecución anterior afecte este escenario.
  const response = http.del(`${BASE_URL}/carrito`);

  if (response.status !== 204) {
    throw new Error(`No se pudo limpiar el carrito. HTTP ${response.status}`);
  }
}

export default function (): void {
  const response = http.get(SUMMARY_URL);

  check(response, {
    "el resumen responde 200": (res) => res.status === 200,
    "la respuesta contiene el total": (res) =>
      typeof res.body === "string" && res.body.includes('"total"')
  });

  sleep(1);
}
