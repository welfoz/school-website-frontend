import {studentDetails} from "./students";
import {Grade} from "./grade";
import {minimalTeacher, Teacher} from "./teacher";


export interface Subject {
  id : number;
  name : string;
  description: string;
  studentSet: studentDetails[];
  gradeList: Grade[];
  teacher?: minimalTeacher;
}

export interface SubjectGrades {
  student?: studentGrades[];
  id?: number;
  name?: string;
  description?: string;
}

export interface studentGrades {
  grades?: Grade[];
  firstname?: string;
  lastname?: string;
  student_id?: number;
  gradeForm?: any;
}

export interface minimalGrade {
  grade_id?: number;
  mark?: number;
}

export interface minimalSubject {
  id: number;
}
