import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Greetings :string="Good evening, user";
  Assets :string="8";
  Operatives :string="18";
  Jobs :string="20";
  constructor() { }

  ngOnInit(): void {
  }

}
