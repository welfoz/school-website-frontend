export  interface Student {
  id : number;
  firstname : string;
  email : string;
  lastname : string;
  subjectSet: Set<subjectIdSet>;
}

export interface subjectIdSet {
  id: number;
  name: string;
}

export  interface studentDetails {
  id : number;
  firstname : string;
  lastname : string;
}

