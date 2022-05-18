import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './students/students.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    TeacherComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
