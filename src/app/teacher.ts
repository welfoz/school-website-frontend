import {Subject} from "./subject";

export interface Teacher {
  id : number;
  firstname : string;
  lastname: string;
  subjects: Subject[];
}


export interface subjectIdTeacher {
  id: number;
  name: string;
}

export interface minimalTeacher {
  id : number;
  firstname : string;
  lastname: string;
}
