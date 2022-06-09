import { Component, OnInit } from '@angular/core';
import {TeacherService} from "../teacher.service";
import {Subject} from "../subject";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SubjectService} from "../subject.service";
import {subjectIdTeacher, Teacher} from "../teacher";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  addTeacherResponse?: Teacher;
  dropdownSettings:IDropdownSettings={};
  dropDownForm: FormGroup;
  dropDownFormUnregister: FormGroup;
  currentSubjectsID: Set<subjectIdTeacher> = new Set();
  teacherId: number = 193;
  subjectIdSet: Set<subjectIdTeacher> = new Set();
  subjectToSend: Set<subjectIdTeacher> = new Set();

  selectedSubject?: Subject;
  constructor(private teacherservice: TeacherService, private subjectService: SubjectService, private fb:FormBuilder) {
    this.dropDownForm = fb.group({
      mySubjects: [this.currentSubjectsID],
    });
    this.dropDownFormUnregister = fb.group({
      ToUnRegister: [this.currentSubjectsID],
    });
  }




  ngOnInit(): void {
    // this.getStudents();
    this.getSubjects();
    this.getTeacherById(this.teacherId);
    this.dropdownSettings = {
      idField: "id",
      textField: "name",
      disabledField: "true",
    };
    this.dropDownForm = this.fb.group({
      mySubjects: [this.currentSubjectsID],
      id: this.teacherId
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

  getTeacherById(id: number): void {
    this.teacherservice.getById(id)
      .subscribe(teacherInfos => {this.teacherservice.teacherSubjects = teacherInfos.subjects;
                      this.addTeacherResponse = teacherInfos;
      });
  }

  add(name: string, description: string): void {
      name = name.trim();
      description = description.trim();
      this.teacherservice.addSubject({name, description} as Subject)
        .subscribe( {
          complete: () => {
              console.log('subject added');
            }
        })
    }
  subjectRegisterList() {
    return this.subjectService.subjectList;
  }
  // [7, 8, 9]
  register(subjects : subjectIdTeacher[], id:number): void {
    this.teacherservice.registerPatch({subjects, id} as Teacher)
      .subscribe( {
        // next: (student: Student) => { this.studentService.studentList?.push(student); },
        // error: () => {},
        complete: () => {
          // if (this.studentService.studentList != undefined) {
          //   this.studentService.totalItems.next(this.studentService.studentList.length);
          //   console.log(this.studentService.studentList.length);
          console.log("teacher add subject registered");
          // }
        }

      })
  }

  unregister(subjects : subjectIdTeacher[], id:number): void {
    this.teacherservice.unregisterPatch({subjects, id} as Teacher)
      .subscribe( {
        // next: (student: Student) => { this.studentService.studentList?.push(student); },
        // error: () => {},
        complete: () => {
          // if (this.studentService.studentList != undefined) {
          //   this.studentService.totalItems.next(this.studentService.studentList.length);
          //   console.log(this.studentService.studentList.length);
          console.log("teacher unregistered");
          // }
        }

      })
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

  dropDownSubmittedUnregister() {

    console.log(this.dropDownFormUnregister.get('ToUnRegister')?.value);
    this.unregister(this.dropDownFormUnregister.get('ToUnRegister')?.value, this.dropDownForm.get('id')?.value);
  }

  subjectUnRegisterList() {
    // return Array.from(this.currentSubjectsID.values());
    return this.teacherservice.teacherSubjects;
  }

  subjectDetails(subject: Subject): void {
    this.selectedSubject = subject;
  }
}
