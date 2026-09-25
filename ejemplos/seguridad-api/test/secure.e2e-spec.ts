import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { AuditService } from '../src/students/audit.service';
import { StudentsService } from '../src/students/students.service';
import { createTestApp } from './test-app';

describe('Contrato seguro — se vuelve verde durante la clase', () => {
  let app: INestApplication;
  let studentsService: StudentsService;

  beforeAll(async () => {
    app = await createTestApp();
    studentsService = app.get(StudentsService);
  });

  beforeEach(() => studentsService.reset());

  afterAll(async () => app.close());

  it('rechaza que un estudiante consulte las notas de otro', async () => {
    await request(app.getHttpServer())
      .get('/students/student-2/grades')
      .set('x-user-id', 'student-1')
      .expect(403);
  });

  it('permite al estudiante consultar sus propias notas', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/student-1/grades')
      .set('x-user-id', 'student-1')
      .expect(200);

    expect(response.body.studentId).toBe('student-1');
  });

  it('permite al docente consultar las notas de cualquier estudiante', async () => {
    await request(app.getHttpServer())
      .get('/students/student-2/grades')
      .set('x-user-id', 'teacher-1')
      .expect(200);
  });

  it('rechaza propiedades no autorizadas del perfil', async () => {
    await request(app.getHttpServer())
      .patch('/students/student-1/profile')
      .set('x-user-id', 'student-1')
      .send({
        displayName: 'Ana actualizada',
        role: 'teacher',
        internalNotes: 'No debería aceptarse',
      })
      .expect(400);
  });

  it('acepta un cambio válido y conserva el rol', async () => {
    const response = await request(app.getHttpServer())
      .patch('/students/student-1/profile')
      .set('x-user-id', 'student-1')
      .send({ displayName: 'Ana actualizada', phone: '555-0199' })
      .expect(200);

    expect(response.body.displayName).toBe('Ana actualizada');
    expect(response.body.phone).toBe('555-0199');
    expect(response.body.role).toBe('student');
  });

  it('no expone ni registra datos internos del perfil', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/student-1/profile')
      .set('x-user-id', 'student-1')
      .expect(200);

    expect(response.body).toEqual({
      id: 'student-1',
      displayName: 'Ana López',
      email: 'ana@example.test',
    });

    const lastAudit = app.get(AuditService).getLastEntry();
    expect(lastAudit).not.toContain('internalNotes');
    expect(lastAudit).not.toContain('grades');
  });
});
