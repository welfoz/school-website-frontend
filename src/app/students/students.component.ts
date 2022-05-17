import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {Student, subjectIdSet} from '../students';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  student?: Student;
  selectedStudent? : Student;
  selectedStudentPhone? : Student;
  selectedStudentEmail? : Student;
  addResponse? : Student;
  modifyDisplay = 'none';
  // subjectIdSet? : Set<subjectIdSet>;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(studentList => this.studentService.studentList = studentList);
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
  register(subjectSet : Set<subjectIdSet>): void {


    this.studentService.registerPatch({subjectSet} as Student)
      .subscribe( {
        next: (student: Student) => { this.studentService.studentList?.push(student); },
        error: () => {},
        complete: () => {
          if (this.studentService.studentList != undefined) {
            this.studentService.totalItems.next(this.studentService.studentList.length);
            console.log(this.studentService.studentList.length);
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
}
