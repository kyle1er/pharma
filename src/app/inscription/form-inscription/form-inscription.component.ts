import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.scss']
})
export class FormInscriptionComponent implements OnInit {

  formulaireInscription !: FormGroup;
  @Input() actionTitre : "NEW" | "EDIT" = "NEW";

  step : number = 0;
  constructor( private fb: FormBuilder ) {
    this.formulaireInscription = fb.group({
      Nom : ['', [Validators.required]],
      Pnom : ['', [Validators.required]],
      datedepot_dos : [null, [Validators.required]],
      Datenaiss : [null, [Validators.required]],
      Lieunaiss : ['', [Validators.required]],
      Etatcivil : [null, [Validators.required]],
      NationaliteID : ['', [Validators.required]],
      Tel : ['', [Validators.required]],
      Mail : ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      Adrgeo : ['', [Validators.required]],
      DiplomeobtenuLe : ['', [Validators.required]],
      Lieuobtentiondiplome : ['', [Validators.required]],
      /* dateSoutenance : ['', [Validators.required]],
      lieuSoutenance : ['', [Validators.required]], */
      sectionTable : ['', [Validators.required]],
      ChangementOrdre : [null, [Validators.required]],

      etabPharmaceutique : fb.group({
        Raisonscial_emp : ['', [Validators.required]],
        Adrpost_emp : ['', [Validators.required]],
        Tel_emp : ['', [Validators.required]],
        Fax_emp : ['', [Validators.required]],
        Adrgeo_emp : ['', [Validators.required]]
      }),

      contact : fb.group({
        contactImmediat : fb.group({
          Nomcontact_immed : ['', [Validators.required]],
          // prenom : ['', [Validators.required]],
          Adrcontact_immed : [null, [Validators.required]],
          Telcontact_immed : [null, [Validators.required]],
        }),

        contactPro : fb.group({
          Nomcontact_prof : ['', [Validators.required]],
          // prenom : ['', [Validators.required]],
          Adrcontact_prof : [null, [Validators.required]],
          Telcontact_prof : [null, [Validators.required]],
        }),
      }),

      CnceOrdre : [null, [Validators.required]],
      CnceDeontologie : [null, [Validators.required]],
    })
  }

  ngOnInit() {
    console.log( this.formulaireInscription );

  }

  stepNavigation(signe : '+' | '-' = "+"){
    this.step = eval(this.step + ""+ signe +" 1")
  }

  inscription(){
    console.log( this.formulaireInscription.value );
    console.log( this.formulaireInscription );

  }
}
