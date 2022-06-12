import {Grade, GradeForStudent} from "./grade";
import {minimalGrade} from "./subject";

export  interface Student {
  id?: number;
  firstname?: string;
  email?: string;
  lastname?: string;
  subjectSet: Set<subjectIdSet>;
  gradeList: GradeForStudent[];
}

export interface subjectIdSet {
  id: number;
  name: string;
  description: string;
}

export  interface studentDetails {
  id : number;
  firstname : string;
  lastname : string;
}


export interface subjectGradesForStudent {
  id?: number;
  subject?: string;
  description?: string;
  grades?: minimalGrade[];
  total?: string;
}
