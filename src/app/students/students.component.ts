import {Component, forwardRef, OnInit} from '@angular/core';
import { StudentService } from '../student.service';
import {Student, subjectGradesForStudent, subjectIdSet} from '../students';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SubjectService} from "../subject.service";
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import {TokenStorageService} from "../auth/token-storage.service";
import {SubjectGrades} from "../subject";
import {GradeForStudent} from "../grade";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StudentsComponent),
      multi: true
    }
  ]
})
export class StudentsComponent implements OnInit {
  student: Student = {gradeList: [], subjectSet: new Set<subjectIdSet>()};
  selectedStudent? : Student;
  subjectsGrades: subjectGradesForStudent[] = [];

  studentId: string;

  displayedColumns: string[] = ['subject', 'description'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  displayedGradesColumns: string[] = [];
  // form variables
  selectedSubjects = [];
  dropdownSettings:IDropdownSettings={};
  dropDownForm: FormGroup;
  dropDownFormUnregister: FormGroup;
  currentSubjectsID: Set<subjectIdSet> = new Set();

  // form patch student infos
  formStudentInfo: any = {};
  patchInfosResponse?: String;
  constructor(private studentService: StudentService, private subjectService: SubjectService, private fb:FormBuilder, private token: TokenStorageService) {
    this.dropDownForm = fb.group({
      mySubjects: [this.selectedSubjects],
    });
    this.dropDownFormUnregister = fb.group({
      ToUnRegister: [this.currentSubjectsID],
    });
    this.studentId = token.getId();
  }




  ngOnInit(): void {
    this.getById();
    // init the forms
    this.dropdownSettings = {
      idField: "id",
      textField: "name",
      disabledField: "true",
      allowSearchFilter: true,
      enableCheckAll: false,
      maxHeight: 80
    };
    this.dropDownForm = this.fb.group({
      mySubjects: [this.selectedSubjects],
    });
    this.dropDownFormUnregister = this.fb.group({
      ToUnRegister: [this.currentSubjectsID],
    });

  }

  getSubjects(): void {
    this.subjectService.getSubjects()
      .subscribe(subjectList => {
        this.subjectService.subjectList = subjectList.filter(
          subject => {
            let alreadyRegistered: boolean = false;
            this.student.subjectSet.forEach(sub => {
              if (sub.id == subject.id) {
                alreadyRegistered = true;
              }
            });
            return !alreadyRegistered;
          }
        );
    // this.dropDownList = this.subjectService.subjectList;
      });
  }

  setSubjectsGrades(): void{

    // init subject Grades
    let grades: GradeForStudent[] = JSON.parse(JSON.stringify(this.student.gradeList));
    let maxGrades: number = 0;
    let numberOfGrades: number = 0;
    let totalNumberOfSubjets: number = 0;
    let sumTotal: number = 0;
    this.student.subjectSet.forEach(subject => {

      let subjectGrades: subjectGradesForStudent = {
        id: subject.id,
        description: subject.description,
        subject: subject.name,
        grades: []
      };
      let total: number = 0;
      grades.forEach(grade => {
        if (grade.subject?.id == subject.id) {
          subjectGrades.grades?.push({grade_id: grade.id, mark: grade.mark});
          numberOfGrades++;
          total += grade.mark ? +grade.mark : 0;
        }
      })
      if (maxGrades < numberOfGrades) {
        maxGrades = numberOfGrades;
      }
      // console.log(total);
      subjectGrades.total = (total/numberOfGrades).toFixed(2);
      sumTotal += total/numberOfGrades;
      totalNumberOfSubjets++;
      numberOfGrades = 0;
      total = 0;
      this.subjectsGrades.push(subjectGrades);
    })
    this.subjectsGrades.push({
      id: 0,
      description: "",
      subject: "TOTAL",
      grades: [],
      total: (sumTotal/totalNumberOfSubjets).toFixed(2)
    });
    console.log(this.subjectsGrades);


    // set displayGradesColumns
    for (let i = 1; i<=maxGrades; i++) {
      this.displayedColumns.push('grade' + '(' + i + ')');
      this.displayedGradesColumns.push('grade' + '(' + i + ')');
    }

    this.displayedColumns.push('total');
    console.log(this.displayedColumns);

  }

  getById(): void {
    this.studentService.getStudent(this.studentId)
      .subscribe(student => {
        this.student = student;
        this.getSubjects();
        this.currentSubjectsID = student.subjectSet;
        this.setSubjectsGrades();
      });
  }

  pathStudentInfos(): void {

    const firstname: String = this.formStudentInfo.firstname.trim();
    const lastname: String = this.formStudentInfo.lastname.trim();
    const email: String = this.formStudentInfo.email.trim();
    this.studentService.pathStudent({firstname, lastname, email} as Student, this.studentId)
      .subscribe( {
        error: () => {},
        complete: () => {
          console.log("student infos updated !");
        }

      })
  }

  // [7, 8, 9]
  register(subjectSet : Set<subjectIdSet>): void {
    const id = parseInt(this.studentId);
    this.studentService.registerPatch({subjectSet, id} as Student)
      .subscribe( {
        // next: (student: Student) => { this.studentService.studentList?.push(student); },
        // error: () => {},
        complete: () => {
          // if (this.studentService.studentList != undefined) {
          //   this.studentService.totalItems.next(this.studentService.studentList.length);
          //   console.log(this.studentService.studentList.length);
            console.log("student registered");
          // }
        }

      })
  }

  unregister(subjectSet : Set<subjectIdSet>): void {
    const id = parseInt(this.studentId);
    this.studentService.unregisterPatch({subjectSet, id} as Student)
      .subscribe( {
        // next: (student: Student) => { this.studentService.studentList?.push(student); },
        // error: () => {},
        complete: () => {
          // if (this.studentService.studentList != undefined) {
          //   this.studentService.totalItems.next(this.studentService.studentList.length);
          //   console.log(this.studentService.studentList.length);
          console.log("student unregistered");
          // }
        }

      })
  }

  modify(student : Student) {
    this.selectedStudent = student;
  }
  studentList() {
    return this.studentService.studentList;
  }


  subjectRegisterList() {
    return this.subjectService.subjectList;
  }


  dropDownSubmitted(): void {
    console.log(this.dropDownForm);
    console.log(this.dropDownForm.get('mySubjects')?.value);
    // [{"id": number}, "id"
    this.dropDownForm.get('mySubjects')?.value.forEach((el: any) => {
      console.log(el.id);
      // this.subjectIdSet?.add(el.id);
    });
    // console.log(Array.from(this.subjectIdSet?.values()));

    this.register(this.dropDownForm.get('mySubjects')?.value);

  }

  dropDownSubmittedUnregister() {

   console.log(this.dropDownFormUnregister.get('ToUnRegister')?.value);
    this.unregister(this.dropDownFormUnregister.get('ToUnRegister')?.value);
  }

  subjectUnRegisterList() {
    return Array.from(this.currentSubjectsID.values());
  }


}
