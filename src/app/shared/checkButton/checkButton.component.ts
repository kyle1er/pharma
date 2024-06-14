import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICheckBtnData, dataListForm } from './ICheckBtnData';

@Component({
  selector: 'app-checkButton',
  templateUrl: './checkButton.component.html',
  styleUrls: ['./checkButton.component.scss']
})
export class CheckButtonComponent implements OnInit {

  @Input()
  defaultValue : string | Array<string> = ""
  @Input()
  checkBtnData !: ICheckBtnData
  @Output()
  value : EventEmitter<any> = new EventEmitter()

  typeButton: 'radio' | 'checkbox' = 'radio';
  dataListe!: dataListForm[];


  myTimer : number = 0;
  // listRadio : Array<any> = [
  //   {
  //     libelle : "Célibataire",
  //     valeur : "Célibataire",
  //   },
  //   {
  //     libelle : "Marié",
  //     valeur : "Marié",
  //   },
  //   {
  //     libelle : "Divorcé",
  //     valeur : "Divorcé",
  //   },
  //   {
  //     libelle : "Veuf (ve)",
  //     valeur : "Veuf (ve)",
  //   },
  // ]
  // listCheckBox : Array<any> = [
  //   {
  //     libelle : "1",
  //     valeur : "1",
  //   },
  //   {
  //     libelle : "2",
  //     valeur : "2",
  //   },
  //   {
  //     libelle : "3",
  //     valeur : "3",
  //   },
  //   {
  //     libelle : "4",
  //     valeur : "4",
  //   },
  // ]

  constructor() { }

  ngOnInit() {
    this.myTimer = new Date().getTime();
    [this.typeButton, this.dataListe] = [this.checkBtnData.typeBouton, this.checkBtnData.dataList]
  }


  fnCheckRadio( val : any ){
    this.value.emit(val)
  }
}
