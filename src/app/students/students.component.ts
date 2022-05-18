import {Component, ElementRef, forwardRef, Inject, OnInit} from '@angular/core';
import { StudentService } from '../student.service';
import {Student, subjectIdSet} from '../students';
import {FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SubjectService} from "../subject.service";
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import {Subject} from "../subject";


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
  // get dropDownForm(): FormGroup {
  //   return this._dropDownForm;
  // }
  //
  // set dropDownForm(value: FormGroup) {
  //   this._dropDownForm = value;
  // }
  student?: Student;
  selectedStudent? : Student;
  selectedStudentPhone? : Student;
  selectedStudentEmail? : Student;
  addResponse? : Student;

  selectedValue: string | undefined;
  numberOfSubject: Array<number> = [1];

  // a: any;
  modifyDisplay = 'none';
  subjectIdSet: Set<subjectIdSet> = new Set();

  studentId: number = -1;
  selectedSubjects = [];
  // dropDownList:Subject[] = [];
  dropdownSettings:IDropdownSettings={};
  dropDownForm: FormGroup;

  constructor(private studentService: StudentService, private subjectService: SubjectService, private fb:FormBuilder) {
    this.dropDownForm = fb.group({
      mySubjects: [this.selectedSubjects],
    });
  }




  ngOnInit(): void {
    this.getStudents();
    this.getSubjects();
    this.dropdownSettings = {
      idField: "id",
      textField: "name",
      disabledField: "true",
    };
    this.dropDownForm = this.fb.group({
      mySubjects: [this.selectedSubjects],
      id: this.studentId
    });
  }

  getSubjects(): void {
    this.subjectService.getSubjects()
      .subscribe(subjectList => {this.subjectService.subjectList = subjectList;
    // this.dropDownList = this.subjectService.subjectList;
      });
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(studentList => {this.studentService.studentList = studentList; console.log(studentList);});
  }

  getById(id : string): void {
    const numberId = parseInt(id);
    this.studentService.getStudent(numberId)
      .subscribe(student => this.student = student);
  }
  add(firstname : string, lastname : string, email: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    this.studentService.addStudent([{firstname, lastname, email}] as Student[])
      .subscribe( {
        next: (student: Student[]) => { this.addResponse = student[0]; },
        error: () => {},
        complete: () => {
          if (this.studentService.studentList != undefined) {
            this.studentService.totalItems.next(this.studentService.studentList.length);
            console.log(this.studentService.studentList.length);
            console.log(this.addResponse);
          }
        }

      })
  }

  // [7, 8, 9]
  register(subjectSet : Set<subjectIdSet>, id:number): void {


    this.studentService.registerPatch({subjectSet, id} as Student)
      .subscribe( {
        next: (student: Student) => { this.studentService.studentList?.push(student); },
        error: () => {},
        complete: () => {
          if (this.studentService.studentList != undefined) {
            this.studentService.totalItems.next(this.studentService.studentList.length);
            console.log(this.studentService.studentList.length);
            console.log("student registered");
          }
        }

      })
  }
  // delete(student: Student): void {
  //   this.studentService.studentList = this.studentService.studentList?.filter(_ => _ !== student);
  //   this.studentService.deleteStudent(student).subscribe(() => {
  //     if(this.studentService.studentList != undefined) {
  //       this.studentService.totalItems.next(this.studentService.studentList.length);
  //       console.log(this.studentService.studentList.length);
  //     }
  //   })
  // }
  // deleteAll(): void {
  //   this.studentService.studentList = [];
  //   this.studentService.deleteAllStudent().subscribe(() => {
  //     if(this.studentService.studentList != undefined) {
  //       this.studentService.totalItems.next(this.studentService.studentList.length);
  //       console.log(this.studentService.studentList.length);
  //     }
  //   })
  // }
  subjectToRegister: any;
  modify(student : Student) {
    this.selectedStudent = student;
  }
  studentList() {
    return this.studentService.studentList;
  }
  modifyPhone(student : Student) {
    this.selectedStudentPhone = student;
  }
  modifyEmail(student : Student) {
    this.selectedStudentEmail = student;
  }




  subjectRegister() {

    return this.numberOfSubject
  }

  addNumberOfSubject() {
    this.numberOfSubject.push(this.numberOfSubject.length + 1);
  }

  subjectRegisterList() {
    return this.subjectService.subjectList;
  }


  onSubmitTemplateBased(value: any): void {
    console.log(value);
  }

  dropDownSubmitted(): void {
    console.log(this.dropDownForm);
    console.log(this.dropDownForm.get('mySubjects')?.value);
    // [{"id": number}, "id"
    this.dropDownForm.get('mySubjects')?.value.forEach((el: any) => {
      console.log(el.id);
      this.subjectIdSet?.add(el.id);
    });
    console.log(Array.from(this.subjectIdSet?.values()));

    this.register(this.dropDownForm.get('mySubjects')?.value, this.dropDownForm.get('id')?.value);

  }
}
