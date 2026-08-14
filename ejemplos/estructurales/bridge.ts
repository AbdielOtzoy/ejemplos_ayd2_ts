/**
 * Bridge
 *
 * Separamos el tipo de notificación de la tecnología que la entrega. Ambas
 * jerarquías pueden crecer de manera independiente.
 */

export interface CanalNotificacion {
  enviar(destinatario: string, mensaje: string): void;
}

export class CanalEmail implements CanalNotificacion {
  enviar(destinatario: string, mensaje: string): void {
    console.log(`Email a ${destinatario}: ${mensaje}`);
  }
}

export class CanalSms implements CanalNotificacion {
  enviar(destinatario: string, mensaje: string): void {
    console.log(`SMS a ${destinatario}: ${mensaje}`);
  }
}

export abstract class Notificacion {
  constructor(protected readonly canal: CanalNotificacion) {}

  abstract enviar(destinatario: string, mensaje: string): void;
}

export class NotificacionUrgente extends Notificacion {
  enviar(destinatario: string, mensaje: string): void {
    this.canal.enviar(destinatario, `[URGENTE] ${mensaje}`);
  }
}

export class NotificacionInformativa extends Notificacion {
  enviar(destinatario: string, mensaje: string): void {
    this.canal.enviar(destinatario, mensaje);
  }
}

export function demoBridge(): void {
  console.log("\n=== Bridge ===");

  new NotificacionUrgente(new CanalSms()).enviar("5555-1234", "Clase cancelada.");
  new NotificacionInformativa(new CanalEmail()).enviar("ana@usac.edu.gt", "Nueva lectura disponible.");
}
