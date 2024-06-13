import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkButton',
  templateUrl: './checkButton.component.html',
  styleUrls: ['./checkButton.component.scss']
})
export class CheckButtonComponent implements OnInit {

  @Output()
  value : EventEmitter<any> = new EventEmitter()
  @Input()
  newValue : string | Array<string> = ""

  typeButton: 'radio' | 'checkbox' = 'radio';
  listRadio : Array<any> = [
    {
      libelle : "Célibataire",
      valeur : "Célibataire",
    },
    {
      libelle : "Marié",
      valeur : "Marié",
    },
    {
      libelle : "Divorcé",
      valeur : "Divorcé",
    },
    {
      libelle : "Veuf (ve)",
      valeur : "Veuf (ve)",
    },
  ]

  constructor() { }

  ngOnInit() {
  }


  fnCheckRadio( val : string ){
    this.value.emit(val)
  }
}
