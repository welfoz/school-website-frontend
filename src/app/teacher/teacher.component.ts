import { Component, OnInit } from '@angular/core';
import {TeacherService} from "../teacher.service";
import {Subject} from "../subject";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SubjectService} from "../subject.service";
import {subjectIdTeacher, Teacher} from "../teacher";
import {TokenStorageService} from "../auth/token-storage.service";
import {Student} from "../students";

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
  teacherId: string;
  subjectIdSet: Set<subjectIdTeacher> = new Set();
  subjectToSend: Set<subjectIdTeacher> = new Set();

  selectedSubject?: Subject;


  // forms classical
  formInfosTeacher: any = {};
  formAddSubject: any = {};

  patchInfosResponse?: String;
  addSubjectResponse?: String;
  constructor(private teacherservice: TeacherService, private subjectService: SubjectService, private fb:FormBuilder, private token: TokenStorageService) {
    this.dropDownForm = fb.group({
      mySubjects: [this.currentSubjectsID],
    });
    this.dropDownFormUnregister = fb.group({
      ToUnRegister: [this.currentSubjectsID],
    });
    this.teacherId = token.getId();
  }




  ngOnInit(): void {
    // this.getStudents();
    this.getSubjects();
    this.getTeacherById();
    this.dropdownSettings = {
      idField: "id",
      textField: "name",
      disabledField: "true",
      allowSearchFilter: true,
      enableCheckAll: false
    };
    this.dropDownForm = this.fb.group({
      mySubjects: [this.currentSubjectsID],
    });
    this.dropDownFormUnregister = this.fb.group({
      ToUnRegister: [this.currentSubjectsID],
    });
  }
  getSubjects(): void {
    this.subjectService.getSubjects()
      .subscribe(subjectList => {
        this.subjectService.subjectList = subjectList.filter(subject => subject.teacher == null);
        // subjectList.forEach(subject => {

          // if (subject.teacher == null) {
          //   this.subjectService.subjectsAvailable.push(subject);
          // }
        // })
        // this.dropDownList = this.subjectService.subjectList;
      });
  }

  getTeacherById(): void {
    this.teacherservice.getById(this.teacherId)
      .subscribe(teacherInfos => {this.teacherservice.teacherSubjects = teacherInfos.subjects;
                      this.addTeacherResponse = teacherInfos;
      });
  }

  add(): void {
      const name = this.formAddSubject.name.trim();
      const description = this.formAddSubject.description ? this.formAddSubject.description.trim() : "";
      console.log(this.formAddSubject);
      this.teacherservice.addSubject({name, description} as Subject)
        .subscribe( {
          complete: () => {
              console.log('subject added');
              this.addSubjectResponse = "subject added successfully";
            }
        })
    }
  subjectRegisterList() {
    // console.log(this.dropDownForm);
    // console.log(this.dropDownFormUnregister);
    // console.log(this.subjectService.subjectList);
    // console.log(this.teacherservice.teacherSubjects)
    return this.subjectService.subjectList;
  }
  // [7, 8, 9]
  register(subjects : subjectIdTeacher[]): void {
    const id = parseInt(this.teacherId);
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

  unregister(subjects : subjectIdTeacher[]): void {
    const id = parseInt(this.teacherId);
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

    this.register(this.dropDownForm.get('mySubjects')?.value);

  }

  dropDownSubmittedUnregister() {

    console.log(this.dropDownFormUnregister.get('ToUnRegister')?.value);
    this.unregister(this.dropDownFormUnregister.get('ToUnRegister')?.value);
  }

  subjectUnRegisterList() {
    // return Array.from(this.currentSubjectsID.values());
    return this.teacherservice.teacherSubjects;
  }

  subjectDetails(subject: Subject): void {
    this.selectedSubject = subject;
  }

  pathTeacherInfos() {
    const firstname = this.formInfosTeacher.firstname.trim();
    const lastname = this.formInfosTeacher.lastname.trim();
    this.teacherservice.patchTeacher({firstname, lastname} as Teacher, this.teacherId)
      .subscribe( {
        error: () => {},
        complete: () => {
          console.log("Teacher infos updated !");
          this.patchInfosResponse = "Infos updated succesfully :)";
        }

      })
  }
}
