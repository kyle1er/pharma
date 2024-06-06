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
      nom : ['', [Validators.required]],
      prenom : ['', [Validators.required]],
      dateDepot : ['', [Validators.required]],
      dateBirth : [null, [Validators.required]],
      lieuBirth : ['', [Validators.required]],
      etatCivil : [null, [Validators.required]],
      nationalite : ['', [Validators.required]],
      tel : ['', [Validators.required]],
      mail : ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      quatier : ['', [Validators.required]],
      dateSoutenance : ['', [Validators.required]],
      lieuSoutenance : ['', [Validators.required]],
      dateDelivranceDiplome : ['', [Validators.required]],
      lieuDelivranceDiplome : ['', [Validators.required]],
      sectionTable : ['', [Validators.required]],
      sectionDemande : ['', [Validators.required]],

      etabPharmaceutique : fb.group({
        raisonSocial : ['', [Validators.required]],
        adressePost : ['', [Validators.required]],
        tel : ['', [Validators.required]],
        fax : ['', [Validators.required]],
        adresseGeographique : ['', [Validators.required]]
      }),

      contact : fb.group({
        contactImmediat : fb.group({
          nom_prenoms : ['', [Validators.required]],
          // prenom : ['', [Validators.required]],
          adresse : [null, [Validators.required]],
          tel : [null, [Validators.required]],
        }),

        contactPro : fb.group({
          nom_prenoms : ['', [Validators.required]],
          // prenom : ['', [Validators.required]],
          adresse : [null, [Validators.required]],
          tel : [null, [Validators.required]],
        }),
      }),

      attributionsOrdre : [null, [Validators.required]],
      deontologie : [null, [Validators.required]],
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
