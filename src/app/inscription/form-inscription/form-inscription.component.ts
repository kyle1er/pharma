import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.scss']
})
export class FormInscriptionComponent implements OnInit {

  formulaireInscription !: FormGroup;
  @Input() actionTitre: "NEW" | "EDIT" = "NEW";

  step: number = 0;
  mustShow: boolean = false;
  nationnalite : Array<any> = [
    {
      libelle : "Côte d'ivoire",
      code : 'CIV'
    }
  ];

  constructor(private fb: FormBuilder) {

    // console.log( "date new 2 ==> ", this.activateRoute.snapshot.data );

    // console.log( " router.routerState 0 ==> ", router.routerState);
    // console.log( " router.routerState 1 ==> ", router.routerState.root.data);
    // console.log( " router.routerState 2 ==> ", router.routerState.snapshot);

    // this.activateRoute.paramMap.subscribe( obs =>{
    //   // console.log("obs.get('state') ", obs.get('state'));
    //   // console.log(" window.history.state ", window.history.state);
    //   // console.log( "receive ", window.history.state);

    //   if ( JSON.stringify( window.history.state['param']) != JSON.stringify( { inscription: 'yes', finish: false } ) ) {
    //     router.navigateByUrl( '/auth' )
    //   }else{
    //     this.mustShow = true;
    //   }


    // })




    this.formulaireInscription = this.fb.group({
      Nom: ['', [Validators.required]],
      Pnom: ['', [Validators.required]],
      datedepot_dos: [null, [Validators.required]],
      Datenaiss: [null, [Validators.required]],
      Lieunaiss: ['', [Validators.required]],
      Etatcivil: [null, [Validators.required]],
      NationaliteID: ['', [Validators.required]],
      Tel: ['', [Validators.required]],
      Mail: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      Adrgeo: ['', [Validators.required]],
      DiplomeobtenuLe: ['', [Validators.required]],
      Lieuobtentiondiplome: ['', [Validators.required]],
      DiplomeDelivreLe: ['', [Validators.required]],
      /* dateSoutenance : ['', [Validators.required]],
      lieuSoutenance : ['', [Validators.required]], */
      Sections: [[], [Validators.required]],
      ChangementOrdre: [null, [Validators.required]],

      etabPharmaceutique: fb.group({
        Raisonscial_emp: ['', [Validators.required]],
        Adrpost_emp: ['', [Validators.required]],
        Tel_emp: ['', [Validators.required]],
        Fax_emp: ['', [Validators.required]],
        Adrgeo_emp: ['', [Validators.required]]
      }),

      contact: fb.group({
        contactImmediat: fb.group({
          Nomcontact_immed: ['', [Validators.required]],
          // prenom : ['', [Validators.required]],
          Adrcontact_immed: [null, [Validators.required]],
          Telcontact_immed: [null, [Validators.required]],
        }),

        contactPro: fb.group({
          Nomcontact_prof: ['', [Validators.required]],
          // prenom : ['', [Validators.required]],
          Adrcontact_prof: [null, [Validators.required]],
          Telcontact_prof: [null, [Validators.required]],
        }),
      }),

      CnceOrdre: [null, [Validators.required]],
      CnceDeontologie: [null, [Validators.required]],
    })
  }

  ngOnInit() {
    this.formulaireInscription.setValue({
      "Nom": "YAH",
      "Pnom": "FIRM",
      "datedepot_dos": "2024-06-05",
      "Datenaiss": "2024-05-27",
      "Lieunaiss": "YAKRO",
      "Etatcivil": "Marié",
      "NationaliteID": "",
      "Tel": "2250004542345",
      "Mail": "test@test.com",
      "Adrgeo": "Test",
      "DiplomeobtenuLe": "2024-06-03",
      "Lieuobtentiondiplome": "Obtention ",
      "DiplomeDelivreLe": "2024-06-03",
      "Sections": [
          "004",
          "003"
      ],
      "ChangementOrdre": true,
      "etabPharmaceutique": {
          "Raisonscial_emp": "Raison",
          "Adrpost_emp": "BP",
          "Tel_emp": "22527055043",
          "Fax_emp": "",
          "Adrgeo_emp": "BP2"
      },
      "contact": {
          "contactImmediat": {
              "Nomcontact_immed": "TR",
              "Adrcontact_immed": "BPI",
              "Telcontact_immed": "225042474444"
          },
          "contactPro": {
              "Nomcontact_prof": "RT",
              "Adrcontact_prof": "BPP",
              "Telcontact_prof": "225434343334"
          }
      },
      "CnceOrdre": "Très bien",
      "CnceDeontologie": "Assez Bien"
  })
    console.log(this.formulaireInscription);

  }

  stepNavigation(signe: '+' | '-' = "+") {
    this.step = eval(this.step + "" + signe + " 1")
  }

  inscription() {
    console.log(this.formulaireInscription.value);
    console.log(this.formulaireInscription);


    function dateIsValide(dt: string) {
      try {
        new Date( dt )
        return true
      } catch (error) {
        return false
      }
    }

    const data = {
      token: "test",
      body: {
        ...this.formulaireInscription.value,
        ...this.formulaireInscription.controls['etabPharmaceutique'].value,
        ...this.formulaireInscription.controls['contact'].value['contactPro'],
        ...this.formulaireInscription.controls['contact'].value['contactImmediat']
      },
      formpatDate : function () {
        for (const key in this.body) {
          if ( dateIsValide(this.body[key]) ) {
            this.body[key] = String( this.body[key] ).replace(/-/g, '')
            // this.body[key] = String( this.body[key] ).replace('-','').replace('/','')
          }
        }
      }
    }


    for (const clef of ["etabPharmaceutique", "contact"]) {
      delete data.body[clef]
    }

    data.formpatDate()

    console.log("sessions :: ", this.formulaireInscription.value);
    console.log("data === ", data);


  }

  setSectionDocs(key: string, val: string) {
    /* Sections */

    if (!this.formulaireInscription.contains(key)) return;

    let listSection = <Array<String>>this.formulaireInscription.get(key)?.value ?? []; /* 'Sections' */

    if (listSection.includes(val)) {
      listSection = listSection.filter(elt => elt != val);
    } else {
      listSection.push(val);
    }

    // this.formulaireInscription.addControl(key,new FormControl(listSection));
    // this.formulaireInscription.patchValue({ 'Sections': listSection });
    this.formulaireInscription.controls[key].setValue( listSection );


    // console.log( "this.listSection ", key, listSection);
    console.log( "this.formulaireInscription ", this.formulaireInscription.value);
    console.log( "this.formulaireInscription ", this.formulaireInscription);


  }
}
