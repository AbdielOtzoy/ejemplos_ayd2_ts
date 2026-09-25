import { INestApplication, ValidationPipe } from '@nestjs/common';

/**
 * Configuración inicial para la clase.
 *
 * Está intencionalmente incompleta: al inicio no hay DTOs conectados a las
 * rutas y las opciones de whitelist están desactivadas. El grupo las cambia
 * durante el segundo reto de seguridad.
 */
export function configureApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
    }),
  );
}
