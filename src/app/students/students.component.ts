import {Component, forwardRef, OnInit} from '@angular/core';
import { StudentService } from '../student.service';
import {Student, subjectIdSet} from '../students';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SubjectService} from "../subject.service";
import { IDropdownSettings, } from 'ng-multiselect-dropdown';


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
  student?: Student;
  selectedStudent? : Student;
  addResponse?: Student;

  // TO DO = change it with the token jwt
  studentId: number = 1;

  // form variables
  selectedSubjects = [];
  dropdownSettings:IDropdownSettings={};
  dropDownForm: FormGroup;
  dropDownFormUnregister: FormGroup;
  currentSubjectsID: Set<subjectIdSet> = new Set();

  constructor(private studentService: StudentService, private subjectService: SubjectService, private fb:FormBuilder) {
    this.dropDownForm = fb.group({
      mySubjects: [this.selectedSubjects],
    });
    this.dropDownFormUnregister = fb.group({
      ToUnRegister: [this.currentSubjectsID],
    });
  }




  ngOnInit(): void {
    this.getSubjects();
    this.getById('1');
    this.dropdownSettings = {
      idField: "id",
      textField: "name",
      disabledField: "true",
    };
    this.dropDownForm = this.fb.group({
      mySubjects: [this.selectedSubjects],
      id: this.studentId
    });
    this.dropDownFormUnregister = this.fb.group({
      ToUnRegister: [this.currentSubjectsID],
      id: "1"
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
      .subscribe(student => {
        this.student = student;
        this.currentSubjectsID = student.subjectSet;
      });
  }

  add(firstname : string, lastname : string, email: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    this.studentService.addStudent([{firstname, lastname, email}] as Student[])
      .subscribe( {
        error: () => {},
        complete: () => {
          if (this.studentService.studentList != undefined) {
            this.studentService.totalItems.next(this.studentService.studentList.length);
            console.log(this.studentService.studentList.length);
          }
        }

      })
  }

  // [7, 8, 9]
  register(subjectSet : Set<subjectIdSet>, id:number): void {
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

  unregister(subjectSet : Set<subjectIdSet>, id:number): void {
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

    this.register(this.dropDownForm.get('mySubjects')?.value, this.dropDownForm.get('id')?.value);

  }

  dropDownSubmittedUnregister() {

   console.log(this.dropDownFormUnregister.get('ToUnRegister')?.value);
    this.unregister(this.dropDownFormUnregister.get('ToUnRegister')?.value, this.dropDownForm.get('id')?.value);
  }

  subjectUnRegisterList() {
    return Array.from(this.currentSubjectsID.values());
  }

}
