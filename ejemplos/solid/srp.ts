/**
 * SRP - Single Responsibility Principle
 *
 * Cada clase tiene una sola razón para cambiar: calcular, reportar o guardar.
 */

export type Empleado = {
  nombre: string;
  horasTrabajadas: number;
  pagoPorHora: number;
};

export class CalculadoraPago {
  calcular(empleado: Empleado): number {
    return empleado.horasTrabajadas * empleado.pagoPorHora;
  }
}

export class ReporteHoras {
  generar(empleado: Empleado): string {
    return `${empleado.nombre} trabajó ${empleado.horasTrabajadas} horas.`;
  }
}

export class RepositorioEmpleados {
  guardar(empleado: Empleado): void {
    console.log(`Empleado guardado: ${empleado.nombre}.`);
  }
}

export function demoSrp(): void {
  console.log("\n=== SRP ===");

  const empleado = {
    nombre: "Ana",
    horasTrabajadas: 40,
    pagoPorHora: 25,
  };

  const calculadora = new CalculadoraPago();
  const reporte = new ReporteHoras();
  const repositorio = new RepositorioEmpleados();

  console.log(`Pago: Q${calculadora.calcular(empleado)}`);
  console.log(reporte.generar(empleado));
  repositorio.guardar(empleado);
}
