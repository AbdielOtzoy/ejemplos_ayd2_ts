/**
 * Mediator
 *
 * Problema: los controles de un formulario se conocen entre sí y cada cambio
 * termina produciendo muchas dependencias directas.
 */

export interface MediadorFormulario {
  notificar(emisor: string, evento: string): void;
}

export class FormularioInscripcion implements MediadorFormulario {
  private cursoSeleccionado = "";
  private horarioSeleccionado = "";

  constructor(
    private readonly curso: CampoCurso,
    private readonly horario: CampoHorario,
    private readonly guardar: BotonGuardar,
  ) {}

  notificar(emisor: string, evento: string): void {
    if (emisor === "curso" && evento === "seleccionado") {
      this.cursoSeleccionado = this.curso.valor;
      this.horario.habilitar();
      console.log(`El formulario habilitó horarios para ${this.cursoSeleccionado}.`);
    }

    if (emisor === "horario" && evento === "seleccionado") {
      this.horarioSeleccionado = this.horario.valor;
    }

    if (emisor === "guardar" && evento === "clic") {
      if (!this.cursoSeleccionado || !this.horarioSeleccionado) {
        console.log("No se puede guardar: faltan datos.");
        return;
      }

      console.log(
        `Inscripción guardada: ${this.cursoSeleccionado} - ${this.horarioSeleccionado}.`,
      );
    }
  }
}

export class CampoCurso {
  valor = "";

  constructor(private readonly mediador: MediadorFormulario) {}

  seleccionar(valor: string): void {
    this.valor = valor;
    this.mediador.notificar("curso", "seleccionado");
  }
}

export class CampoHorario {
  valor = "";
  private habilitado = false;

  constructor(private readonly mediador: MediadorFormulario) {}

  habilitar(): void {
    this.habilitado = true;
  }

  seleccionar(valor: string): void {
    if (!this.habilitado) {
      console.log("Selecciona un curso antes de elegir horario.");
      return;
    }
    this.valor = valor;
    this.mediador.notificar("horario", "seleccionado");
  }
}

export class BotonGuardar {
  constructor(private readonly mediador: MediadorFormulario) {}

  hacerClic(): void {
    this.mediador.notificar("guardar", "clic");
  }
}

export function demoMediator(): void {
  console.log("\n=== Mediator ===");

  let formulario!: FormularioInscripcion;
  const curso = new CampoCurso({ notificar: (emisor, evento) => formulario.notificar(emisor, evento) });
  const horario = new CampoHorario({ notificar: (emisor, evento) => formulario.notificar(emisor, evento) });
  const guardar = new BotonGuardar({ notificar: (emisor, evento) => formulario.notificar(emisor, evento) });
  formulario = new FormularioInscripcion(curso, horario, guardar);

  guardar.hacerClic();
  curso.seleccionar("ADS2");
  horario.seleccionar("Jueves 17:20");
  guardar.hacerClic();
}
