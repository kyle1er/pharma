import { Component, OnInit } from '@angular/core';
import { WebServicesService } from 'src/app/services/webServices.service';
import { inscriptionData } from 'src/app/shared/dto/inscriptionData';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {


  isVisible: boolean = false;
  isEdit !: 'EDIT' | null

  formulaireInscription : any = {} /* = {
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
  } */


  constructor( private webService : WebServicesService ) { }

  ngOnInit() {

    this.webService.getUserInfos().subscribe(( val )=>{
      console.log(val);
      this.formulaireInscription = val/* {
        ...val,
        Sections : val['Sections'].reduce( ( accu: any, current: any ) => [...accu , current._sectionID] , [] )
      } */
      // const myData = new inscriptionData( 'objetSimple', this.formulaireInscription );
      // console.log(" my data original === ", myData.myDataOriginal);
      // console.log(" my data transform === ", myData.myData);
    })
    // if (!this.isEdit) {
    // }



  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  checkValue( key : string, valeur : any ){
    // console.log('formulaireInscription === ', this.formulaireInscription);
    // console.log('valeur === ', String(valeur).toUpperCase());

    return String(this.formulaireInscription[key]).toLowerCase() === String(valeur).toLowerCase()
  }
}
