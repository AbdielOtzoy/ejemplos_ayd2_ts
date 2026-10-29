/**
 * Flyweight
 *
 * Muchos marcadores del campus comparten el mismo estilo. El estado común se
 * almacena una sola vez y cada marcador conserva únicamente su posición.
 */

export class EstiloMarcador {
  constructor(
    public readonly icono: string,
    public readonly color: string,
  ) {}
}

export class FabricaEstilos {
  private readonly estilos = new Map<string, EstiloMarcador>();

  obtener(icono: string, color: string): EstiloMarcador {
    const clave = `${icono}:${color}`;
    let estilo = this.estilos.get(clave);

    if (!estilo) {
      estilo = new EstiloMarcador(icono, color);
      this.estilos.set(clave, estilo);
    }

    return estilo;
  }

  cantidadCompartida(): number {
    return this.estilos.size;
  }
}

export class MarcadorCampus {
  constructor(
    public readonly edificio: string,
    public readonly x: number,
    public readonly y: number,
    public readonly estilo: EstiloMarcador,
  ) {}

  dibujar(): void {
    console.log(`${this.edificio} en (${this.x}, ${this.y}) con ${this.estilo.icono}/${this.estilo.color}`);
  }
}

export function demoFlyweight(): void {
  console.log("\n=== Flyweight ===");

  const fabrica = new FabricaEstilos();
  const estiloAula = fabrica.obtener("aula", "azul");
  const marcadores = [
    new MarcadorCampus("Edificio T-3", 10, 20, estiloAula),
    new MarcadorCampus("Biblioteca", 40, 60, estiloAula),
  ];

  for (const marcador of marcadores) {
    marcador.dibujar();
  }

  console.log(`Estilos compartidos: ${fabrica.cantidadCompartida()}`);
  console.log(`¿Comparten estilo? ${marcadores[0].estilo === marcadores[1].estilo}`);
}
