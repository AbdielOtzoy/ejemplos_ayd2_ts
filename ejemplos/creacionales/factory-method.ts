/**
 * Factory Method
 *
 * Problema: el servicio no debería conocer EmailNotificacion, SmsNotificacion
 * ni cada nuevo canal que se agregue.
 */

export interface Notificacion {
  enviar(mensaje: string): void;
}

export class EmailNotificacion implements Notificacion {
  enviar(mensaje: string): void {
    console.log(`Email enviado: ${mensaje}`);
  }
}

export class SmsNotificacion implements Notificacion {
  enviar(mensaje: string): void {
    console.log(`SMS enviado: ${mensaje}`);
  }
}

/** Creator: declara el Factory Method y contiene la operación común. */
export abstract class CreadorNotificacion {
  protected abstract crearNotificacion(): Notificacion;

  avisar(mensaje: string): void {
    const notificacion = this.crearNotificacion();
    notificacion.enviar(mensaje);
  }
}

export class CreadorEmail extends CreadorNotificacion {
  protected crearNotificacion(): Notificacion {
    return new EmailNotificacion();
  }
}

export class CreadorSms extends CreadorNotificacion {
  protected crearNotificacion(): Notificacion {
    return new SmsNotificacion();
  }
}

export function demoFactoryMethod(): void {
  console.log("\n=== Factory Method ===");

  const canalEmail = new CreadorEmail();
  const canalSms = new CreadorSms();

  canalEmail.avisar("Tu pedido fue confirmado.");
  canalSms.avisar("Tu pedido está listo para recoger.");
}

