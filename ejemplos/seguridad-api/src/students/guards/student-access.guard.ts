import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DemoRequest } from '../student.types';

/**
 * Solución del reto 1: autorización a nivel de objeto.
 *
 * La guarda existe desde el inicio, pero no se conecta al controlador hasta
 * que el grupo identifica el problema de BOLA/IDOR.
 */
@Injectable()
export class StudentAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<DemoRequest>();
    const identity = request.user;
    const requestedStudentId = request.params.studentId;

    if (!identity) {
      throw new UnauthorizedException('La identidad no está disponible.');
    }

    const mayReadAnyStudent = identity.role === 'teacher';
    const isOwner = identity.id === requestedStudentId;

    if (!mayReadAnyStudent && !isOwner) {
      throw new ForbiddenException(
        'No puedes acceder al expediente de otro estudiante.',
      );
    }

    return true;
  }
}
