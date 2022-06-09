import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import {TeacherComponent} from "./teacher/teacher.component";
// import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: 'student', component: StudentsComponent },
  { path: 'teacher', component: TeacherComponent },
 { path: '', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
