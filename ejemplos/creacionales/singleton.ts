/**
 * Singleton
 *
 * Solo conviene si la aplicación necesita una configuración única. El
 * constructor privado impide que el cliente cree otra instancia con `new`.
 */

export class ConfiguracionApp {
  private static instancia: ConfiguracionApp | undefined;

  private constructor(public readonly ambiente: "desarrollo" | "produccion") {}

  static obtenerInstancia(): ConfiguracionApp {
    if (!ConfiguracionApp.instancia) {
      ConfiguracionApp.instancia = new ConfiguracionApp("produccion");
    }

    return ConfiguracionApp.instancia;
  }
}

export function demoSingleton(): void {
  console.log("\n=== Singleton ===");

  const configuracionA = ConfiguracionApp.obtenerInstancia();
  const configuracionB = ConfiguracionApp.obtenerInstancia();

  console.log(`Ambiente: ${configuracionA.ambiente}`);
  console.log(`¿Es la misma instancia? ${configuracionA === configuracionB}`);
}

