import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

/**
 * DTO que se conecta durante el segundo reto.
 *
 * Mientras la clase trabaja con la versión inicial, el controlador recibe un
 * Record<string, unknown> y por eso acepta cualquier propiedad.
 */
export class UpdateProfileDto {
  @IsString()
  @Length(2, 50)
  displayName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;
}
