import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { AuditService } from '../src/students/audit.service';
import { StudentsService } from '../src/students/students.service';
import { createTestApp } from './test-app';

describe('Observaciones de la versión inicial insegura', () => {
  let app: INestApplication;
  let studentsService: StudentsService;

  beforeAll(async () => {
    app = await createTestApp();
    studentsService = app.get(StudentsService);
  });

  beforeEach(() => studentsService.reset());

  afterAll(async () => app.close());

  it('permite que un estudiante consulte las notas de otro', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/student-2/grades')
      .set('x-user-id', 'student-1')
      .expect(200);

    expect(response.body.studentId).toBe('student-2');
    expect(response.body.grades).toHaveLength(2);
  });

  it('acepta propiedades no autorizadas en una actualización', async () => {
    const response = await request(app.getHttpServer())
      .patch('/students/student-1/profile')
      .set('x-user-id', 'student-1')
      .send({
        displayName: 'Ana actualizada',
        role: 'teacher',
        internalNotes: 'Dato modificado durante la demostración',
      })
      .expect(200);

    expect(response.body.role).toBe('teacher');
    expect(response.body.internalNotes).toContain('Dato modificado');
  });

  it('devuelve y registra información interna del perfil', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/student-1/profile')
      .set('x-user-id', 'student-1')
      .expect(200);

    expect(response.body.internalNotes).toBeTruthy();

    const lastAudit = app.get(AuditService).getLastEntry();
    expect(lastAudit).toContain('internalNotes');
  });
});
