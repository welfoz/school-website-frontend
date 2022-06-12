import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import {TeacherComponent} from "./teacher/teacher.component";
import {RoleGuard} from "./guards/role.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ErrorComponent} from "./error/error.component";
// import { HeroesComponent } from './heroes/heroes.component';

// const routes: Routes = [
//   { path: 'student', component: StudentsComponent },
//   { path: 'teacher', component: TeacherComponent },
//  { path: '', redirectTo: '/', pathMatch: 'full' }
//
// ];
const routes: Routes = [
  { path: 'student', component: StudentsComponent , canActivate: [RoleGuard], data: { roles: ['ROLE_STUDENT'] }, },
  { path: 'teacher', component: TeacherComponent , canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }, },
  // { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] },},
  // { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] },},
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: 'error', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
