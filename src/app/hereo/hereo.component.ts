import { Component, OnInit } from '@angular/core';
import {Hero} from "../hero";
import {HEROES} from "../mock-heroes";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-hereo',
  templateUrl: './hereo.component.html',
  styleUrls: ['./hereo.component.css']
})
export class HereoComponent implements OnInit {
  hero : Hero = {
    id : 1,
    name : 'Wind'
  }
  heroes: Hero[] = [];

  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`xeroesComponent: Selected hero id=${hero.id}`);
  }
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
      this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);

  }

}
