/**
 * Command
 *
 * Problema: distintos botones del portal necesitan ejecutar operaciones del
 * sistema sin conocer cómo están implementadas.
 */

export interface Comando {
  ejecutar(): void;
}

export class PortalAcademico {
  private readonly inscritos = new Set<string>();

  inscribir(estudiante: string, curso: string): void {
    this.inscritos.add(`${estudiante}::${curso}`);
    console.log(`${estudiante} quedó inscrito en ${curso}.`);
  }

  cancelar(estudiante: string, curso: string): void {
    this.inscritos.delete(`${estudiante}::${curso}`);
    console.log(`${estudiante} canceló su inscripción en ${curso}.`);
  }

  estaInscrito(estudiante: string, curso: string): boolean {
    return this.inscritos.has(`${estudiante}::${curso}`);
  }
}

export class InscribirCommand implements Comando {
  constructor(
    private readonly portal: PortalAcademico,
    private readonly estudiante: string,
    private readonly curso: string,
  ) {}

  ejecutar(): void {
    this.portal.inscribir(this.estudiante, this.curso);
  }
}

export class CancelarInscripcionCommand implements Comando {
  constructor(
    private readonly portal: PortalAcademico,
    private readonly estudiante: string,
    private readonly curso: string,
  ) {}

  ejecutar(): void {
    this.portal.cancelar(this.estudiante, this.curso);
  }
}

export class Boton {
  constructor(private comando: Comando) {}

  cambiarComando(comando: Comando): void {
    this.comando = comando;
  }

  hacerClic(): void {
    this.comando.ejecutar();
  }
}

export function demoCommand(): void {
  console.log("\n=== Command ===");

  const portal = new PortalAcademico();
  const inscribir = new InscribirCommand(portal, "Ana", "ADS2");
  const cancelar = new CancelarInscripcionCommand(portal, "Ana", "ADS2");
  const boton = new Boton(inscribir);

  boton.hacerClic();
  console.log(`¿Sigue inscrita? ${portal.estaInscrito("Ana", "ADS2")}`);

  boton.cambiarComando(cancelar);
  boton.hacerClic();
  console.log(`¿Sigue inscrita? ${portal.estaInscrito("Ana", "ADS2")}`);
}
