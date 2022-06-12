import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {minimalGrade, studentGrades, Subject, SubjectGrades} from "../subject";
import {Student, studentDetails} from "../students";
import {Grade} from "../grade";
import {MatTableDataSource} from "@angular/material/table";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../teacher.service";

@Component({
  selector: 'app-teacher-subject-details',
  templateUrl: './teacher-subject-details.component.html',
  styleUrls: ['./teacher-subject-details.component.css']
})
export class TeacherSubjectDetailsComponent implements OnChanges, OnInit {
  @Input() subject?: Subject;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'grade'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  newColumnName: string = 'grades';
  newColumnNumber: number = 0;

  displayedGradesColumns: string[] = [];

  subjectsGrades: SubjectGrades = {student: []};
  student: studentGrades = {};
  maxGradeCompt: number = 0;
  gradeCompt: number = 0;

  gradesForm = {} as FormGroup;

  errorMessage: string = "";

  /*

  now:
  gradeList
  studentSet

  we want
  all : [
   { student : [
        grades
        ]
    }
   ]

   */

  constructor(private fb: FormBuilder, private teacherservice: TeacherService) {
    // this.gradesForm = fb.group({
    //   grades: [{
    //     mark: "",
    //     subject_id: "2",
    //     student_id: "1"
    //   }]
    // })
  }

  get grades() {
    return this.gradesForm.controls["grades"] as FormArray;
  }

  createFormGroup() {
    // formArray part
    return this.fb.group({
                           mark: [null, [Validators.max(20), Validators.min(0), Validators.maxLength(4)]],
                           student: [null, [Validators.required]],
                           subject: [null, [Validators.required]]
                         }
    )
  }


  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.newColumnNumber += 1;
    // this.displayedColumns.push(this.newColumnName + '(' + this.newColumnNumber + ')');
    // this.columnsToDisplay.push(this.newColumnName + '(' + this.newColumnNumber + ')');
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  ngOnChanges(subject: SimpleChanges) {

   this.initForm();


    // this.subjectsGrades.id = this.subject.id;

    // for (const propName in changes) {
    //   const chng = changes[propName];
    //   const cur  = JSON.stringify(chng.currentValue);
    //   const prev = JSON.stringify(chng.previousValue);
      // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    // }
  }
  ngOnInit(): void {
    }

    initForm(): void {
      // form
      // gradesForm: FormGroup;
      this.gradesForm = this.fb.group({
        grades: this.fb.array([])
      });
      // this.errorMessage = "";
      this.grades.clear();
      this.subjectsGrades = {student: []};
      this.displayedColumns = ['id', 'firstname', 'lastname', 'grade'];
      this.displayedGradesColumns = [];
      this.maxGradeCompt = 0;
      this.gradeCompt = 0;
      this.subjectsGrades.id = this.subject?.id;
      this.subjectsGrades.name = this.subject?.name;
      this.subject?.studentSet.forEach(stdent => {

        // formArray part
        const gradeForm = this.fb.group({
          mark: [null, [Validators.max(20), Validators.min(0)]],
          student: [{
            "id": stdent.id,
          }, [Validators.required]],
          subject: [{
            "id": this.subject?.id
          }, [Validators.required]]
        })
        // this.gradesForm.setValue({
        //   grades: this.grades.push({
        //       mark: 0,
        //       student: {
        //         "id": stdent.id,
        //       },
        //       subject: {
        //         "id": this.subject?.id
        //       }


        this.grades.push(gradeForm);


        // subjectsGrades part
        // this.minimalGrades.length = 0;
        this.student = {};
        this.student.gradeForm = gradeForm;
        this.student.firstname = stdent.firstname;
        this.student.lastname = stdent.lastname;
        this.student.student_id = stdent.id;
        this.student.grades = [];
        this.subject?.gradeList.forEach(grade => {
          if (grade.student.id == stdent.id) {
            // this.minimalGrades.push(grade);
            this.student.grades?.push(grade);
            this.gradeCompt++;
          }
        })
        if (this.maxGradeCompt < this.gradeCompt) {
          this.maxGradeCompt = this.gradeCompt;
        }
        this.gradeCompt = 0;
        this.subjectsGrades.student?.push(this.student);
      })

      for (let i = 1; i<=this.maxGradeCompt; i++) {
        this.displayedColumns.push('grade' + '(' + i + ')');
        this.displayedGradesColumns.push('grade' + '(' + i + ')');
      }

      console.log(this.subjectsGrades);
    }
  sendGrades() {
    console.log(this.gradesForm.value.grades);
    if (this.gradesForm.valid) {
      let index = 0;
      this.gradesForm.value.grades.forEach((grade: any) => {
        if (grade.mark == null) {
          this.grades.removeAt(index);
          index--;
          // this.errorMessage = "All Grades must be defined"
          // throw new TypeError("Error message: grades must not be null");
        }
        index++;
      })
      console.log(this.gradesForm);
      if (this.gradesForm.value.grades.length != 0) {
        this.teacherservice.addGrades(this.gradesForm.value.grades)
          .subscribe({
            complete: () => {
              console.log("grades added!");
              this.errorMessage = "grades added successfully !";
              // window.location.reload();
              this.initForm();
            }
          })
      } else {
        console.log("One grade minimum");
        this.errorMessage = "You must put one grade minimum before sending";
        this.initForm();
      }
    } else {
      console.log("INVALID");
      this.errorMessage = "Be careful to your errors";
    }

}
}
