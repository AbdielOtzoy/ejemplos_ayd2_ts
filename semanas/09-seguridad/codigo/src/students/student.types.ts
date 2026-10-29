export type StudentRole = 'student' | 'teacher';

export interface Grade {
  course: string;
  score: number;
}

export interface StudentRecord {
  id: string;
  role: StudentRole;
  displayName: string;
  email: string;
  phone: string;
  internalNotes: string;
  grades: Grade[];
}

export interface DemoIdentity {
  id: string;
  role: StudentRole;
}

export interface DemoRequest {
  user?: DemoIdentity;
  params: Record<string, string | undefined>;
  headers: Record<string, string | string[] | undefined>;
}
