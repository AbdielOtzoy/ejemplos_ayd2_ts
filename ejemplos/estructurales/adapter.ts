/**
 * Adapter
 *
 * Permite que el portal use una pasarela antigua cuya interfaz no puede
 * modificarse.
 */

export interface Pago {
  cobrar(monto: number): boolean;
}

export class PasarelaAntigua {
  procesarPago(valor: string): "OK" | "FAIL" {
    console.log(`Pasarela antigua recibió: ${valor}`);
    return valor !== "0.00" ? "OK" : "FAIL";
  }
}

export class PasarelaAntiguaAdapter implements Pago {
  constructor(private readonly pasarela: PasarelaAntigua) {}

  cobrar(monto: number): boolean {
    if (monto <= 0) {
      return false;
    }

    return this.pasarela.procesarPago(monto.toFixed(2)) === "OK";
  }
}

export function demoAdapter(): void {
  console.log("\n=== Adapter ===");

  const pago: Pago = new PasarelaAntiguaAdapter(new PasarelaAntigua());
  console.log(`Pago aprobado: ${pago.cobrar(199.99)}`);
  console.log(`Pago rechazado: ${pago.cobrar(0)}`);
}
