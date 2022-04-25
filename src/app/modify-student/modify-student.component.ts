import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../students';

@Component({
  selector: 'app-modify-student',
  templateUrl: './modify-student.component.html',
  styleUrls: ['./modify-student.component.css']
})
export class ModifyStudentComponent implements OnInit {
  @Input() student?: Student;

  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
  }

  put(id : number, firstname : string, lastname : string, email: string, telephone: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    this.studentService.updateStudent({id, firstname, lastname, email, telephone } as Student)
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
}
