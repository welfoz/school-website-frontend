import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HereoComponent } from './hereo/hereo.component';
import {FormsModule} from "@angular/forms";
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { EventsComponent } from './events/events.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './students/students.component';
import { ModifyStudentComponent } from './modify-student/modify-student.component';
import { ModifyStudentPhoneComponent } from './modify-student-phone/modify-student-phone.component';
import { ModifystudentemailComponent } from './modifystudentemail/modifystudentemail.component';

@NgModule({
  declarations: [
    AppComponent,
    HereoComponent,
    HeroDetailComponent,
    MessagesComponent,
    EventsComponent,
    DashboardComponent,
    StudentsComponent,
    ModifyStudentComponent,
    ModifyStudentPhoneComponent,
    ModifystudentemailComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
