import { Component, OnInit } from '@angular/core';
import { inscriptionData } from '../shared/dto/inscriptionData';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  isVisible: boolean = false;

  formulaireInscription : any = {
    "Nom": "YAH",
    "Pnom": "FIRM",
    "datedepot_dos": "2024-06-05",
    "Datenaiss": "2024-05-27",
    "Lieunaiss": "YAKRO",
    "Etatcivil": "Marié",
    "NationaliteID": "CIV",
    "Tel": "2250004542345",
    "Mail": "test@test.com",
    "Adrgeo": "Test",
    "DiplomeobtenuLe": "2024-06-03",
    "Lieuobtentiondiplome": "Obtention ",
    "DiplomeDelivreLe": "2024-06-03",
    "Sections": [
      "1",
      "2"
    ],
    "ChangementOrdre": false,
    "Raisonscial_emp": "Raison",
    "Adrpost_emp": "BP",
    "Tel_emp": "22527055043",
    "Fax_emp": "",
    "Adrgeo_emp": "BP2",
    // "etabPharmaceutique": {
    // },
    "Nomcontact_immed": "TR",
    "Adrcontact_immed": "BPI",
    "Telcontact_immed": "225042474444",
    // "contact": {
    //   "contactImmediat": {
    //   },
    "Nomcontact_prof": "RT",
    "Adrcontact_prof": "BPP",
    "Telcontact_prof": "225434343334",
      // "contactPro": {
      // }
    // },
    "CnceOrdre": "Très bien",
    "CnceDeontologie": "Assez Bien"
  }


  constructor() { }

  ngOnInit() {
    const myData = new inscriptionData( 'objetSimple', this.formulaireInscription );

    console.log(" my data original === ", myData.myDataOriginal);
    console.log(" my data transform === ", myData.myData);

  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
