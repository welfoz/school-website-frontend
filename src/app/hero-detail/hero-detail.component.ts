import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Hero} from "../hero";
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { Student } from '../students';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //@Input() hero?: Hero;
  student?: Student;
  href: string = "";
  id: number = 1;
  
  constructor(
    private route: ActivatedRoute,
    //private heroService: HeroService,
    private location: Location,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.href = this.router.url; 
    console.log(this.href);
    this.id = parseInt(this.href.slice(this.href.indexOf("detail/") + 7));
    console.log(this.id);
    this.getStudent(this.id);
  }
  
  getStudent(id : number): void {
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
  }
  goBack(): void {
    this.location.back();
  }
}
