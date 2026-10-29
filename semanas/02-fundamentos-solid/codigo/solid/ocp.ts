/**
 * OCP - Open/Closed Principle
 *
 * El cálculo de nómina acepta nuevos tipos de empleado mediante nuevas clases,
 * sin editar la función que recorre la colección.
 */

export interface EmpleadoPagable {
  nombre: string;
  calcularPago(): number;
}

export class EmpleadoTiempoCompleto implements EmpleadoPagable {
  constructor(
    public readonly nombre: string,
    private readonly salarioMensual: number,
  ) {}

  calcularPago(): number {
    return this.salarioMensual;
  }
}

export class EmpleadoPorHora implements EmpleadoPagable {
  constructor(
    public readonly nombre: string,
    private readonly horas: number,
    private readonly pagoPorHora: number,
  ) {}

  calcularPago(): number {
    return this.horas * this.pagoPorHora;
  }
}

export function calcularNomina(empleados: EmpleadoPagable[]): void {
  for (const empleado of empleados) {
    console.log(`${empleado.nombre}: Q${empleado.calcularPago()}`);
  }
}

export function demoOcp(): void {
  console.log("\n=== OCP ===");

  calcularNomina([
    new EmpleadoTiempoCompleto("Ana", 8000),
    new EmpleadoPorHora("Luis", 40, 35),
  ]);
}
