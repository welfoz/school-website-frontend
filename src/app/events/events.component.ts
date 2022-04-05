import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  span : string;
  constructor() { this.span = ''; }


  ngOnInit(): void {
  }

  focfunc() {
    this.span = "TADAAAAA focus enabled !"
  }

  keyup() {
    this.span = 'key up';
  }
  unfoc() {
    this.span = "Continue to type until....";
  }

  blurfunc(inp : HTMLInputElement) : boolean {
    this.span = 'CONTINUE TO TYPE OR THE DEMONS WILL EAT YOU MAN    ' + inp.value;
    return false;
  }
}
