import { Injectable } from '@angular/core';
import {Student} from "./students";
import {catchError, Observable, of, tap} from "rxjs";
import {Subject} from "./subject";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {subjectIdTeacher, Teacher} from "./teacher";
import {Grade} from "./grade";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachersUrl = "http://localhost:8083/teachers";

  public teacherSubjects: subjectIdTeacher[] = [];
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }

  }
  getById(id: string): Observable<Teacher> {
    const url = `${this.teachersUrl}/${id}`;
    return this.http.get<Teacher>(url).pipe(
      tap(response => {
        console.log(`fetched student id=${id}`);
        console.log(response);
      } ),
      catchError(this.handleError<Teacher>(`get Teacher id=${id}`))
    );
  }
  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.teachersUrl}/subject`, subject, httpOptions).pipe(
      tap((subjectAdded: Subject)=> console.log(`post ${subjectAdded.id}`)),
      catchError(this.handleError<any>('addSubject'))
    );
  }
  registerPatch(teacher: Teacher): Observable<any> {
    const id = typeof teacher === "number" ? teacher : teacher.id;
    const url = `${this.teachersUrl}/subject/register/${id}`;
    return this.http.patch(url, teacher, httpOptions).pipe(
      tap(_ => console.log(`patch ${teacher.id}`)),
      catchError(this.handleError<any>('updateTeacher'))
    );

  }
  unregisterPatch(teacher: Teacher): Observable<any> {
    const id = typeof teacher === "number" ? teacher : teacher.id;
    const url = `${this.teachersUrl}/subject/unregister/${id}`;
    return this.http.patch(url, teacher, httpOptions).pipe(
      tap(_ => console.log(`patch ${teacher.id}`)),
      catchError(this.handleError<any>('updateTeacher'))
    );
  }

  addGrades(grades: Grade[]): Observable<Grade[]> {
    return this.http.post<Grade[]>(`${this.teachersUrl}/grade`, grades, httpOptions).pipe(
      // tap((gradesAdded: Grades[])=> ),
      catchError(this.handleError<any>('addGrades failed'))
    );
  }

  patchTeacher(teacher: Teacher, id: string) {
    return this.http.patch<Teacher>(`${this.teachersUrl}/${id}`, teacher, httpOptions).pipe(
      catchError(this.handleError<any>('addStudent'))
    );
  }
}
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}
