/**
 * DIP - Dependency Inversion Principle
 *
 * El servicio de alto nivel depende de una abstracción. El repositorio de
 * memoria y el repositorio SQL son detalles intercambiables.
 */

export interface RepositorioUsuarios {
  buscarPorCorreo(correo: string): string | undefined;
}

export class RepositorioEnMemoria implements RepositorioUsuarios {
  private readonly usuarios = new Map([["ana@usac.edu.gt", "Ana"]]);

  buscarPorCorreo(correo: string): string | undefined {
    return this.usuarios.get(correo);
  }
}

export class RepositorioSqlSimulado implements RepositorioUsuarios {
  buscarPorCorreo(correo: string): string | undefined {
    console.log(`SELECT nombre FROM usuarios WHERE correo = '${correo}'`);
    return correo === "luis@usac.edu.gt" ? "Luis" : undefined;
  }
}

export class UsuarioService {
  constructor(private readonly repositorio: RepositorioUsuarios) {}

  saludar(correo: string): void {
    const nombre = this.repositorio.buscarPorCorreo(correo);
    console.log(nombre ? `Bienvenido, ${nombre}.` : "Usuario no encontrado.");
  }
}

export function demoDip(): void {
  console.log("\n=== DIP ===");

  new UsuarioService(new RepositorioEnMemoria()).saludar("ana@usac.edu.gt");
  new UsuarioService(new RepositorioSqlSimulado()).saludar("luis@usac.edu.gt");
}
