/**
 * Chain of Responsibility
 *
 * Problema: una inscripción debe pasar por varias validaciones, pero cada
 * validación debe poder detener la solicitud sin llenar un método gigante.
 */

export type SolicitudInscripcion = {
  estudiante: string;
  autenticado: boolean;
  tienePrerequisito: boolean;
  cuposDisponibles: number;
};

export abstract class Validador {
  private siguiente?: Validador;

  enlazar(siguiente: Validador): Validador {
    this.siguiente = siguiente;
    return siguiente;
  }

  manejar(solicitud: SolicitudInscripcion): boolean {
    if (!this.validar(solicitud)) {
      return false;
    }

    return this.siguiente?.manejar(solicitud) ?? true;
  }

  protected abstract validar(solicitud: SolicitudInscripcion): boolean;
}

export class ValidarAutenticacion extends Validador {
  protected validar(solicitud: SolicitudInscripcion): boolean {
    if (!solicitud.autenticado) {
      console.log("Rechazada: el estudiante no está autenticado.");
      return false;
    }
    return true;
  }
}

export class ValidarPrerequisito extends Validador {
  protected validar(solicitud: SolicitudInscripcion): boolean {
    if (!solicitud.tienePrerequisito) {
      console.log("Rechazada: falta el prerrequisito del curso.");
      return false;
    }
    return true;
  }
}

export class ValidarCupo extends Validador {
  protected validar(solicitud: SolicitudInscripcion): boolean {
    if (solicitud.cuposDisponibles < 1) {
      console.log("Rechazada: no quedan cupos disponibles.");
      return false;
    }
    console.log(`Aprobada: ${solicitud.estudiante} puede inscribirse.`);
    return true;
  }
}

export function crearCadenaDeInscripcion(): Validador {
  const autenticacion = new ValidarAutenticacion();
  const prerequisito = new ValidarPrerequisito();
  const cupo = new ValidarCupo();

  autenticacion.enlazar(prerequisito).enlazar(cupo);
  return autenticacion;
}

export function demoChainOfResponsibility(): void {
  console.log("\n=== Chain of Responsibility ===");

  const cadena = crearCadenaDeInscripcion();

  cadena.manejar({
    estudiante: "Ana",
    autenticado: false,
    tienePrerequisito: true,
    cuposDisponibles: 3,
  });

  cadena.manejar({
    estudiante: "Luis",
    autenticado: true,
    tienePrerequisito: true,
    cuposDisponibles: 3,
  });
}
