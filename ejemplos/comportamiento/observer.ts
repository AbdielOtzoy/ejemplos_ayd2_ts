/**
 * Observer
 *
 * Problema: un curso publica material y varias personas necesitan enterarse
 * sin que el curso conozca los detalles de cada estudiante.
 */

export interface Observador {
  actualizar(mensaje: string): void;
}

export interface Sujeto {
  suscribir(observador: Observador): void;
  cancelar(observador: Observador): void;
}

export class Curso implements Sujeto {
  private readonly observadores: Observador[] = [];

  constructor(public readonly nombre: string) {}

  suscribir(observador: Observador): void {
    if (!this.observadores.includes(observador)) {
      this.observadores.push(observador);
    }
  }

  cancelar(observador: Observador): void {
    const indice = this.observadores.indexOf(observador);
    if (indice >= 0) {
      this.observadores.splice(indice, 1);
    }
  }

  publicarMaterial(titulo: string): void {
    const mensaje = `${this.nombre}: nuevo material publicado - ${titulo}`;
    for (const observador of this.observadores) {
      observador.actualizar(mensaje);
    }
  }
}

export class Estudiante implements Observador {
  constructor(public readonly nombre: string) {}

  actualizar(mensaje: string): void {
    console.log(`[${this.nombre}] recibió: ${mensaje}`);
  }
}

export function demoObserver(): void {
  console.log("\n=== Observer ===");

  const curso = new Curso("Análisis y Diseño de Sistemas 2");
  const ana = new Estudiante("Ana");
  const luis = new Estudiante("Luis");

  curso.suscribir(ana);
  curso.suscribir(luis);
  curso.publicarMaterial("Ejercicio de patrones");

  curso.cancelar(luis);
  curso.publicarMaterial("Solución comentada");
}
