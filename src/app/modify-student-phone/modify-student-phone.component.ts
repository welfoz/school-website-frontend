import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../students';

@Component({
  selector: 'app-modify-student-phone',
  templateUrl: './modify-student-phone.component.html',
  styleUrls: ['./modify-student-phone.component.css']
})
export class ModifyStudentPhoneComponent implements OnInit {
  @Input() student? : Student;
  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
  }

  patch(telephone : string, id : number) {
    this.studentService.patch({id, telephone} as Student)
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
