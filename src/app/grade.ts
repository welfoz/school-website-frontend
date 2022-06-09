import {Student} from "./students";
import {Subject} from "./subject";


export interface Grade {
  id : number;
  mark : number;
  student: Student;
  subject: Subject;
}

export interface GradeForForm {
  id : number;
  mark : number;
  student: Student;
  subject: Subject;
  gradeForm: any;
}
