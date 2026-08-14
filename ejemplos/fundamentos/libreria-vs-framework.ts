/**
 * Librería vs. framework
 *
 * En una librería, la aplicación llama una función cuando la necesita. En un
 * framework, el framework controla el flujo y llama al código de la aplicación.
 */

export function formatearNombre(nombre: string): string {
  return nombre.trim().toUpperCase();
}

export function demoLibreria(): void {
  const nombre = formatearNombre(" ana ");
  console.log(`La aplicación llamó a la librería: ${nombre}`);
}

export type Aplicacion = {
  iniciar(): void;
};

export class MiniFramework {
  ejecutar(aplicacion: Aplicacion): void {
    console.log("El framework inicia la aplicación.");
    aplicacion.iniciar();
    console.log("El framework finaliza el ciclo.");
  }
}

export function demoFramework(): void {
  const aplicacion: Aplicacion = {
    iniciar(): void {
      console.log("La aplicación ejecuta su lógica cuando el framework la llama.");
    },
  };

  new MiniFramework().ejecutar(aplicacion);
}

export function demoLibreriaVsFramework(): void {
  console.log("\n=== Librería vs. framework ===");
  demoLibreria();
  demoFramework();
}
