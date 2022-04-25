import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Student } from './students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public studentList? : Student[];
  private studentsUrl = "http://localhost:8082/students";
  constructor(private http: HttpClient) { }

  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => console.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }

  }
  updateStudent(student: Student): Observable<any> {
    const id = typeof student === "number" ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;
    return this.http.put(url, student, httpOptions).pipe(
      tap(_ => console.log(`update ${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }
  patch(student: Student): Observable<any> {
    const id = typeof student === "number" ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;
    return this.http.patch(url, student, httpOptions).pipe(
      tap(_ => console.log(`patch ${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, httpOptions).pipe(
      tap((studentAdded: Student)=> console.log(`post ${studentAdded.id}`)),
      catchError(this.handleError<any>('addStudent'))
    );
  }

  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === "number" ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => console.log(`delete ${id}`)),
      catchError(this.handleError<any>('deleteStudent'))
    );
  }
  deleteAllStudent(): Observable<Student> {
    const url = `${this.studentsUrl}`;
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => console.log(`delete all`)),
      catchError(this.handleError<any>('deleteStudent'))
    );
  }
}
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

