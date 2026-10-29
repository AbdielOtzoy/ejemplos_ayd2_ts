/**
 * Visitor
 *
 * Problema: necesitamos agregar reportes sobre cursos y estudiantes sin
 * modificar las clases que representan los datos académicos.
 */

export interface VisitanteAcademico {
  visitarCurso(curso: Curso): void;
  visitarEstudiante(estudiante: Estudiante): void;
}

export interface ElementoAcademico {
  aceptar(visitante: VisitanteAcademico): void;
}

export class Curso implements ElementoAcademico {
  constructor(
    public readonly codigo: string,
    public readonly nombre: string,
  ) {}

  aceptar(visitante: VisitanteAcademico): void {
    visitante.visitarCurso(this);
  }
}

export class Estudiante implements ElementoAcademico {
  constructor(
    public readonly carnet: string,
    public readonly nombre: string,
  ) {}

  aceptar(visitante: VisitanteAcademico): void {
    visitante.visitarEstudiante(this);
  }
}

export class ExportarCsvVisitor implements VisitanteAcademico {
  private readonly filas: string[] = [];

  visitarCurso(curso: Curso): void {
    this.filas.push(`CURSO,${curso.codigo},${curso.nombre}`);
  }

  visitarEstudiante(estudiante: Estudiante): void {
    this.filas.push(`ESTUDIANTE,${estudiante.carnet},${estudiante.nombre}`);
  }

  resultado(): string {
    return this.filas.join("\n");
  }
}

export class ContarElementosVisitor implements VisitanteAcademico {
  cursos = 0;
  estudiantes = 0;

  visitarCurso(_curso: Curso): void {
    this.cursos += 1;
  }

  visitarEstudiante(_estudiante: Estudiante): void {
    this.estudiantes += 1;
  }
}

export function demoVisitor(): void {
  console.log("\n=== Visitor ===");

  const elementos: ElementoAcademico[] = [
    new Curso("ADS2", "Análisis y Diseño de Sistemas 2"),
    new Estudiante("2026001", "Ana"),
  ];

  const csv = new ExportarCsvVisitor();
  for (const elemento of elementos) {
    elemento.aceptar(csv);
  }
  console.log(csv.resultado());

  const conteo = new ContarElementosVisitor();
  for (const elemento of elementos) {
    elemento.aceptar(conteo);
  }
  console.log(`Resumen: ${conteo.cursos} curso(s), ${conteo.estudiantes} estudiante(s).`);
}
