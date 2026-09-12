import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3001";
const SUMMARY_URL = `${BASE_URL}/carrito/resumen?zona=local`;

// Carga esperada para una ejecución local y fácil de explicar en clase.
export const options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "20s", target: 10 },
    { duration: "10s", target: 0 }
  ],
  thresholds: {
    // Objetivos didácticos, no un SLA universal de producción.
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"]
  }
};

export function setup(): void {
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

  // Simula el tiempo entre consultas de un usuario.
  sleep(1);
}
