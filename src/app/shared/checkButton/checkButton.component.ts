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
  @Input()
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
  listCheckBox : Array<any> = [
    {
      libelle : "1",
      valeur : "1",
    },
    {
      libelle : "2",
      valeur : "2",
    },
    {
      libelle : "3",
      valeur : "3",
    },
    {
      libelle : "4",
      valeur : "4",
    },
  ]

  constructor() { }

  ngOnInit() {
  }


  fnCheckRadio( val : string ){
    this.value.emit(val)
  }
}
