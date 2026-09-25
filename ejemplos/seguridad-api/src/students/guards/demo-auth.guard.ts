import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentsService } from '../students.service';
import { DemoRequest } from '../student.types';

/**
 * Simula autenticación para la clase: no es un mecanismo real de seguridad.
 * El valor de x-user-id se busca en el catálogo fijo de usuarios sintéticos.
 */
@Injectable()
export class DemoAuthGuard implements CanActivate {
  constructor(private readonly studentsService: StudentsService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<DemoRequest>();
    const userId = this.readUserId(request.headers['x-user-id']);
    const identity = userId
      ? this.studentsService.findIdentity(userId)
      : undefined;

    if (!identity) {
      throw new UnauthorizedException(
        'Usa un x-user-id de demostración válido.',
      );
    }

    request.user = identity;
    return true;
  }

  private readUserId(
    header: string | string[] | undefined,
  ): string | undefined {
    return Array.isArray(header) ? header[0] : header;
  }
}
