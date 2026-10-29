import { StudentRecord } from './student.types';

export function createDemoStudents(): Record<string, StudentRecord> {
  return {
    'student-1': {
      id: 'student-1',
      role: 'student',
      displayName: 'Ana López',
      email: 'ana@example.test',
      phone: '555-0101',
      internalNotes: 'Requiere seguimiento académico; dato solo para personal autorizado.',
      grades: [
        { course: 'Análisis y Diseño de Sistemas 2', score: 92 },
        { course: 'Bases de Datos', score: 88 },
      ],
    },
    'student-2': {
      id: 'student-2',
      role: 'student',
      displayName: 'Bruno Méndez',
      email: 'bruno@example.test',
      phone: '555-0102',
      internalNotes: 'Tiene una reunión pendiente con coordinación.',
      grades: [
        { course: 'Análisis y Diseño de Sistemas 2', score: 78 },
        { course: 'Bases de Datos', score: 84 },
      ],
    },
    'teacher-1': {
      id: 'teacher-1',
      role: 'teacher',
      displayName: 'Carla Docente',
      email: 'carla@example.test',
      phone: '555-0103',
      internalNotes: 'Cuenta de demostración para explicar el rol docente.',
      grades: [],
    },
  };
}
