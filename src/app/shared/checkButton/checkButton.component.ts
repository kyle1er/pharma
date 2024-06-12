import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkButton',
  templateUrl: './checkButton.component.html',
  styleUrls: ['./checkButton.component.scss']
})
export class CheckButtonComponent implements OnInit {

  typeButton: 'radio' | 'checkbox' = 'radio';
  listRadio : Array<any> = [
    {
      libelle : "Célibataire"
    },
    {
      libelle : "Marié"
    },
    {
      libelle : "Divorcé"
    },
    {
      libelle : "Veuf (ve)"
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
