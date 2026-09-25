import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { DemoAuthGuard } from './guards/demo-auth.guard';
import { StudentAccessGuard } from './guards/student-access.guard';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  controllers: [StudentsController],
  providers: [
    AuditService,
    DemoAuthGuard,
    StudentAccessGuard,
    StudentsService,
  ],
  exports: [AuditService, StudentsService],
})
export class StudentsModule {}
