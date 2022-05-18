import { Injectable } from '@angular/core';
import {Subject} from "./subject";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public subjectList: Subject[] = [];
  private subjectUrl = "http://localhost:8083/subject";

  constructor(private http: HttpClient) {
  }

  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectUrl);
  }
}
