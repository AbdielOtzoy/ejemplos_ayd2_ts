/**
 * Proxy
 *
 * El proxy mantiene la misma interfaz que la imagen real y retrasa la carga
 * pesada hasta que alguien realmente necesita mostrarla.
 */

export interface Imagen {
  mostrar(): void;
}

export class ImagenReal implements Imagen {
  constructor(private readonly archivo: string) {
    this.cargarDesdeServidor();
  }

  private cargarDesdeServidor(): void {
    console.log(`Cargando ${this.archivo} desde el servidor...`);
  }

  mostrar(): void {
    console.log(`Mostrando ${this.archivo} en alta resolución.`);
  }
}

export class ImagenProxy implements Imagen {
  private imagenReal?: ImagenReal;

  constructor(private readonly archivo: string) {}

  mostrar(): void {
    if (!this.imagenReal) {
      this.imagenReal = new ImagenReal(this.archivo);
    }

    this.imagenReal.mostrar();
  }
}

export function demoProxy(): void {
  console.log("\n=== Proxy ===");

  const imagen: Imagen = new ImagenProxy("campus-4k.png");
  console.log("El proxy se creó sin cargar la imagen.");
  imagen.mostrar();
  imagen.mostrar();
}
