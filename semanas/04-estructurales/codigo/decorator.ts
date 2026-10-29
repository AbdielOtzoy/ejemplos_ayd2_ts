/**
 * Decorator
 *
 * Las opciones del café se apilan por composición y no mediante una subclase
 * para cada combinación posible.
 */

export interface Bebida {
  descripcion(): string;
  costo(): number;
}

export class Cafe implements Bebida {
  descripcion(): string {
    return "Café";
  }

  costo(): number {
    return 10;
  }
}

abstract class Extra implements Bebida {
  constructor(protected readonly bebida: Bebida) {}

  abstract descripcion(): string;
  abstract costo(): number;
}

export class Leche extends Extra {
  descripcion(): string {
    return `${this.bebida.descripcion()} + leche`;
  }

  costo(): number {
    return this.bebida.costo() + 3;
  }
}

export class Azucar extends Extra {
  descripcion(): string {
    return `${this.bebida.descripcion()} + azúcar`;
  }

  costo(): number {
    return this.bebida.costo() + 1;
  }
}

export function demoDecorator(): void {
  console.log("\n=== Decorator ===");

  const bebida: Bebida = new Azucar(new Leche(new Cafe()));
  console.log(`${bebida.descripcion()}: Q${bebida.costo()}`);
}
