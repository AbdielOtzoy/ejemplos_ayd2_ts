/**
 * Facade
 *
 * La fachada coordina validación, almacenamiento y token para que el cliente
 * no tenga que conocer todos los pasos del registro.
 */

class ValidadorEmail {
  esValido(email: string): boolean {
    return email.includes("@");
  }
}

class Hasher {
  generar(valor: string): string {
    return `hash(${valor})`;
  }
}

class RepositorioUsuarios {
  guardar(email: string, passwordHash: string): void {
    console.log(`Usuario guardado: ${email} con ${passwordHash}.`);
  }
}

class EmisorToken {
  emitir(email: string): string {
    return `token-${email}`;
  }
}

export class AuthFacade {
  private readonly validador = new ValidadorEmail();
  private readonly hasher = new Hasher();
  private readonly repositorio = new RepositorioUsuarios();
  private readonly emisor = new EmisorToken();

  registrar(email: string, password: string): string | undefined {
    if (!this.validador.esValido(email)) {
      console.log("Registro rechazado: correo inválido.");
      return undefined;
    }

    this.repositorio.guardar(email, this.hasher.generar(password));
    return this.emisor.emitir(email);
  }
}

export function demoFacade(): void {
  console.log("\n=== Facade ===");

  const auth = new AuthFacade();
  console.log(`Token: ${auth.registrar("ana@usac.edu.gt", "secreto")}`);
  auth.registrar("correo-invalido", "secreto");
}
