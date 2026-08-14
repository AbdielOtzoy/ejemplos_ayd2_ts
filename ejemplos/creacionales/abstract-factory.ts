/**
 * Abstract Factory
 *
 * Problema: una aplicación multiplataforma debe crear botones y ventanas de
 * la misma familia; no queremos mezclar un botón Windows con una ventana Linux.
 */

export interface Boton {
  dibujar(): void;
}

export interface Ventana {
  abrir(): void;
}

export interface FabricaUI {
  crearBoton(): Boton;
  crearVentana(): Ventana;
}

class BotonWindows implements Boton {
  dibujar(): void {
    console.log("Dibujando botón con estilo Windows.");
  }
}

class VentanaWindows implements Ventana {
  abrir(): void {
    console.log("Abriendo ventana con estilo Windows.");
  }
}

class BotonLinux implements Boton {
  dibujar(): void {
    console.log("Dibujando botón con estilo Linux.");
  }
}

class VentanaLinux implements Ventana {
  abrir(): void {
    console.log("Abriendo ventana con estilo Linux.");
  }
}

export class FabricaWindows implements FabricaUI {
  crearBoton(): Boton {
    return new BotonWindows();
  }

  crearVentana(): Ventana {
    return new VentanaWindows();
  }
}

export class FabricaLinux implements FabricaUI {
  crearBoton(): Boton {
    return new BotonLinux();
  }

  crearVentana(): Ventana {
    return new VentanaLinux();
  }
}

/** El cliente solo conoce la fábrica abstracta y los productos abstractos. */
function renderizarPantalla(fabrica: FabricaUI): void {
  fabrica.crearBoton().dibujar();
  fabrica.crearVentana().abrir();
}

export function demoAbstractFactory(): void {
  console.log("\n=== Abstract Factory ===");
  console.log("Familia seleccionada: Linux");
  renderizarPantalla(new FabricaLinux());
}

