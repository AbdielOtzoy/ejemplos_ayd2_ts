import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { DemoAuthGuard } from './guards/demo-auth.guard';
import { StudentAccessGuard } from './guards/student-access.guard';
import { DemoRequest } from './student.types';
import { StudentsService } from './students.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('students')
// Reto 1: la identidad se valida, pero todavía no se valida la propiedad
// del recurso. La clase cambia esta línea a:
// @UseGuards(DemoAuthGuard, StudentAccessGuard)
@UseGuards(DemoAuthGuard)
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly auditService: AuditService,
  ) {}

  @Get(':studentId/grades')
  getGrades(
    @Param('studentId') studentId: string,
    @Req() request: DemoRequest,
  ) {
    const result = this.studentsService.getGrades(studentId);

    // Reto 3: se registra el resultado completo, incluyendo calificaciones.
    this.auditService.record({
      actorId: request.user?.id,
      action: 'read-grades',
      resourceId: studentId,
      result,
    });

    return result;
  }

  @Get(':studentId/profile')
  getProfile(
    @Param('studentId') studentId: string,
    @Req() request: DemoRequest,
  ) {
    const result = this.studentsService.getProfile(studentId);

    // Reto 3: se registra el perfil completo, incluyendo internalNotes.
    this.auditService.record({
      actorId: request.user?.id,
      action: 'read-profile',
      resourceId: studentId,
      result,
    });

    return result;
  }

  @Patch(':studentId/profile')
  updateProfile(
    @Param('studentId') studentId: string,
    @Body() body: Record<string, unknown>,
    @Req() request: DemoRequest,
  ) {
    // Reto 2: cambiar Record<string, unknown> por UpdateProfileDto.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dtoTypeHint: UpdateProfileDto | undefined = undefined;
    const result = this.studentsService.updateProfile(studentId, body);

    // Reto 3: no se debe registrar el body ni el resultado completo.
    this.auditService.record({
      actorId: request.user?.id,
      action: 'update-profile',
      resourceId: studentId,
      body,
      result,
    });

    return result;
  }
}
