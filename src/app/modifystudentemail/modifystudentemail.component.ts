import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../students';

@Component({
  selector: 'app-modifystudentemail',
  templateUrl: './modifystudentemail.component.html',
  styleUrls: ['./modifystudentemail.component.css']
})
export class ModifystudentemailComponent implements OnInit {
  @Input() student? : Student;
  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
  }
  
  patch(id : number, email : string) {
    this.studentService.patch({id, email} as Student)
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
