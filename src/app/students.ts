export  interface  Student {
  id : number;
  firstname : string;
  email : string;
  lastname : string;
  subjectSet: Set<subjectIdSet>;
}

export interface subjectIdSet {
  id: number;
}

interface StudentList extends Array<Student>{}

