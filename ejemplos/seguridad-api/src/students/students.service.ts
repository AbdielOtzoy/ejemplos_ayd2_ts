import { Injectable, NotFoundException } from '@nestjs/common';
import { createDemoStudents } from './student-data';
import {
  DemoIdentity,
  Grade,
  StudentRecord,
} from './student.types';

@Injectable()
export class StudentsService {
  private students = createDemoStudents();

  findIdentity(userId: string): DemoIdentity | undefined {
    const student = this.students[userId];
    return student
      ? { id: student.id, role: student.role }
      : undefined;
  }

  getGrades(studentId: string): { studentId: string; grades: Grade[] } {
    const student = this.getStudent(studentId);
    return {
      studentId: student.id,
      grades: student.grades.map((grade) => ({ ...grade })),
    };
  }

  getProfile(studentId: string): StudentRecord {
    const student = this.getStudent(studentId);

    // Reto 3: se devuelve el registro completo, incluidos datos internos.
    return this.cloneStudent(student);
  }

  updateProfile(
    studentId: string,
    updates: Record<string, unknown>,
  ): StudentRecord {
    const student = this.getStudent(studentId);

    // Reto 2: mass assignment intencional para que el grupo observe el riesgo.
    Object.assign(student, updates);
    return this.cloneStudent(student);
  }

  reset(): void {
    this.students = createDemoStudents();
  }

  private getStudent(studentId: string): StudentRecord {
    const student = this.students[studentId];

    if (!student) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

    return student;
  }

  private cloneStudent(student: StudentRecord): StudentRecord {
    return {
      ...student,
      grades: student.grades.map((grade) => ({ ...grade })),
    };
  }
}
