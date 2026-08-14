/**
 * Builder
 *
 * Problema: un reporte con muchos parámetros opcionales se vuelve ilegible si
 * se construye con un constructor lleno de booleanos, null y números.
 */

export type FormatoReporte = "PDF" | "CSV";

export class Reporte {
  constructor(
    public readonly nombre: string,
    public readonly conGraficos: boolean,
    public readonly formato: FormatoReporte,
    public readonly paginas: number,
    public readonly firmado: boolean,
  ) {}
}

export class ReporteBuilder {
  private conGraficos = false;
  private formato: FormatoReporte = "PDF";
  private paginas = 1;
  private firmado = false;

  constructor(private readonly nombre: string) {}

  agregarGraficos(): this {
    this.conGraficos = true;
    return this;
  }

  enFormato(formato: FormatoReporte): this {
    this.formato = formato;
    return this;
  }

  conPaginas(paginas: number): this {
    this.paginas = paginas;
    return this;
  }

  firmar(): this {
    this.firmado = true;
    return this;
  }

  build(): Reporte {
    if (this.nombre.trim() === "") {
      throw new Error("El nombre del reporte es obligatorio.");
    }

    if (!Number.isInteger(this.paginas) || this.paginas < 1) {
      throw new Error("El reporte debe tener al menos una página.");
    }

    return new Reporte(
      this.nombre,
      this.conGraficos,
      this.formato,
      this.paginas,
      this.firmado,
    );
  }
}

export function demoBuilder(): void {
  console.log("\n=== Builder ===");

  const reporte = new ReporteBuilder("ventas mensuales")
    .agregarGraficos()
    .enFormato("PDF")
    .conPaginas(30)
    .firmar()
    .build();

  console.log(reporte);
}

