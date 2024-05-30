import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  step : number = 0;

  constructor() { }

  ngOnInit() {
  }


  stepNavigation(signe : '+' | '-' = "+"){
    this.step = eval(this.step + ""+ signe +" 1")
  }
}
