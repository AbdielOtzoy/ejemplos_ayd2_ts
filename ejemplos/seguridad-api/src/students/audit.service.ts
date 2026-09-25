import { Injectable, Logger } from '@nestjs/common';

/**
 * Registro mínimo en memoria para que la clase pueda observar qué se está
 * escribiendo en la bitácora. En un sistema real se usaría un sink seguro.
 */
@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);
  private lastEntry = '';

  // Reto 3: esta firma amplia permite que el controlador registre el payload
  // completo. La solución restringe la entrada a metadatos de auditoría.
  record(event: Record<string, unknown>): void {
    this.lastEntry = JSON.stringify(event);
    this.logger.log(this.lastEntry);
  }

  getLastEntry(): string {
    return this.lastEntry;
  }
}
