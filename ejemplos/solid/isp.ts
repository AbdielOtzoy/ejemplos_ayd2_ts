/**
 * ISP - Interface Segregation Principle
 *
 * Los clientes dependen de capacidades pequeñas, no de una interfaz enorme
 * que les obliga a implementar métodos que no necesitan.
 */

export interface Imprimible {
  imprimir(documento: string): void;
}

export interface Escaneable {
  escanear(): string;
}

export interface Faxable {
  enviarFax(numero: string): void;
}

export class ImpresoraBasica implements Imprimible {
  imprimir(documento: string): void {
    console.log(`Imprimiendo: ${documento}.`);
  }
}

export class Multifuncional implements Imprimible, Escaneable, Faxable {
  imprimir(documento: string): void {
    console.log(`Imprimiendo: ${documento}.`);
  }

  escanear(): string {
    return "documento-escaneado.pdf";
  }

  enviarFax(numero: string): void {
    console.log(`Fax enviado a ${numero}.`);
  }
}

export function imprimirDocumento(dispositivo: Imprimible, documento: string): void {
  dispositivo.imprimir(documento);
}

export function demoIsp(): void {
  console.log("\n=== ISP ===");

  const impresora = new ImpresoraBasica();
  const multifuncional = new Multifuncional();

  imprimirDocumento(impresora, "reporte de notas");
  imprimirDocumento(multifuncional, "reporte de notas");
  console.log(`Archivo: ${multifuncional.escanear()}`);
  multifuncional.enviarFax("5555-1234");
}
