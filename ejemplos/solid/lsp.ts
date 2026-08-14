/**
 * LSP - Liskov Substitution Principle
 *
 * Una subclase debe poder sustituir a su clase base sin romper las
 * expectativas del cliente. Por eso "volar" no pertenece a todas las aves.
 */

export class Ave {
  constructor(public readonly nombre: string) {}

  comer(): void {
    console.log(`${this.nombre} está comiendo.`);
  }
}

export abstract class AveVoladora extends Ave {
  abstract volar(): void;
}

export class Aguila extends AveVoladora {
  volar(): void {
    console.log(`${this.nombre} está volando.`);
  }
}

export class Pinguino extends Ave {
  nadar(): void {
    console.log(`${this.nombre} está nadando.`);
  }
}

export function alimentar(ave: Ave): void {
  ave.comer();
}

export function hacerVolar(ave: AveVoladora): void {
  ave.volar();
}

export function demoLsp(): void {
  console.log("\n=== LSP ===");

  const aguila = new Aguila("Águila");
  const pinguino = new Pinguino("Pingüino");

  alimentar(aguila);
  alimentar(pinguino);
  hacerVolar(aguila);
  pinguino.nadar();
}
