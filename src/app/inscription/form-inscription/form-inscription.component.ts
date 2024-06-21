import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WebServicesService } from 'src/app/services/webServices.service';
import { ICheckBtnData } from 'src/app/shared/checkButton/ICheckBtnData';
import { inscriptionData } from 'src/app/shared/dto/inscriptionData';

interface nationnalite { _i: number, _Libelle: string, _desa: boolean };
interface appreciation { _i: number, _libelle: string, UseOrdre: boolean, UseDeontologie: boolean, _desa: boolean };
interface section { _i: string, _libelle: string };
interface fonction { _i: string, _libelle: string };
interface documents { _i: number, _libelle: string, _desa: boolean };



@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.scss']
})
export class FormInscriptionComponent implements OnInit {

  listFile: Array<{ id?: number, key: string, fileName: string, file: File }> = []





  formulaireInscription !: FormGroup;
  @Input() actionTitre: "NEW" | "EDIT" = "NEW";

  listOfSelectedValue: Array<number> = []
  step: number = 0;
  mustShow: boolean = false;
  nationnalite: Array<nationnalite> = [
    {
      "_i": 8,
      "_Libelle": "IVOIRIENNE",
      "_desa": false
    }
  ];

  appreciation: appreciation[] = [
    {
      "_i": 1,
      "_libelle": "TRES BIEN",
      "UseOrdre": true,
      "UseDeontologie": true,
      "_desa": false
    },
    {
      "_i": 2,
      "_libelle": "BIEN",
      "UseOrdre": false,
      "UseDeontologie": true,
      "_desa": false
    },
    {
      "_i": 3,
      "_libelle": "ASSEZ-BIEN",
      "UseOrdre": true,
      "UseDeontologie": true,
      "_desa": false
    }
  ];
  section: section[] = [
    {
      "_i": "S1",
      "_libelle": "SECTION 1"
    },
    {
      "_i": "S2",
      "_libelle": "SECTION 2"
    },
    {
      "_i": "S3",
      "_libelle": "SECTION 3"
    },
    {
      "_i": "S4",
      "_libelle": "SECTION 4"
    }
  ];
  fonction: fonction[] = [
    {
      "_i": "14",
      "_libelle": "En Attente de poste"
    },
    {
      "_i": "12",
      "_libelle": "Enseignant"
    },
    {
      "_i": "7",
      "_libelle": "administrateurs des établissements de grossistes-répartiteurs"
    },
    {
      "_i": "6",
      "_libelle": "administrateurs des établissements pharmaceutiques de fabrication"
    },
    {
      "_i": "11",
      "_libelle": "fonctionnaire"
    },
    {
      "_i": "5",
      "_libelle": "gérants"
    },
    {
      "_i": "10",
      "_libelle": "les pharmaciens droguistes"
    },
    {
      "_i": "2",
      "_libelle": "pharmaciens assistants"
    },
    {
      "_i": "15",
      "_libelle": "pharmaciens biologistes"
    },
    {
      "_i": "3",
      "_libelle": "pharmaciens gérants d’officines"
    },
    {
      "_i": "16",
      "_libelle": "pharmaciens hospitaliers privés"
    },
    {
      "_i": "4",
      "_libelle": "pharmaciens propriétaires"
    },
    {
      "_i": "8",
      "_libelle": "pharmaciens salariés des établissements pharmaceutiques de fabrication"
    },
    {
      "_i": "9",
      "_libelle": "pharmaciens salariés des établissements pharmaceutiques de grossistes-répartiteurs"
    },
    {
      "_i": "1",
      "_libelle": "pharmaciens titulaires"
    },
    {
      "_i": "13",
      "_libelle": "retraités"
    }
  ];
  documents: Array<documents> = [
    {
      "_i": 1,
      "_libelle": "INFO",
      "_desa": false
    },
    {
      "_i": 2,
      "_libelle": "PASSEPORT",
      "_desa": false
    },
  ]

  listEtatCivil: ICheckBtnData = {
    typeBouton: 'radio',
    dataList: [
      {
        libelle: "Célibataire",
        valeur: "Célibataire",
      },
      {
        libelle: "Marié",
        valeur: "Marié",
      },
      {
        libelle: "Divorcé",
        valeur: "Divorcé",
      },
      {
        libelle: "Veuf (ve)",
        valeur: "Veuf (ve)",
      },
    ]
  };

  listSectionOrdre: ICheckBtnData = {
    typeBouton: 'checkbox',
    dataList: JSON.parse(JSON.stringify(this.section).replace(/_i/g, 'valeur').replace(/_libelle/g, 'libelle'))
    // dataList: [
    //   {
    //     libelle: "1",
    //     valeur: "1",
    //   },
    //   {
    //     libelle: "2",
    //     valeur: "2",
    //   },
    //   {
    //     libelle: "3",
    //     valeur: "3",
    //   },
    //   {
    //     libelle: "4",
    //     valeur: "4",
    //   },
    // ]
  }

  listChangeSection: ICheckBtnData = {
    typeBouton: 'radio',
    dataList: [
      {
        libelle: "NON",
        valeur: false,
      },
      {
        libelle: "OUI",
        valeur: true,
      }
    ]
  }



  constructor(private fb: FormBuilder, private myService: WebServicesService) {

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

    // const params =
    this.myService.execute('getItems', [
      {
        "item": "doc",
        "desa": 0
      },
      {
        "item": "nationalite"
      },
      {
        "item": "appreciation"
      }, {
        "item": "section"
      },
      {
        "item": "fonction"
      }
    ]).subscribe({
      next: (value: any) => {
        console.log("list items === ", value);
        /* ---------------- */
        /* ---------------- */
        this.nationnalite = value['description']['nationnalite'] as Array<nationnalite>;
        this.appreciation = value['description']['appreciation'] as Array<appreciation>;
        this.documents = value['description']['appreciation'] as Array<appreciation>;

        this.section = value['description']['section'] as Array<section>;
        this.listSectionOrdre.dataList = JSON.parse(JSON.stringify(this.section).replace(/_i/g, 'valeur').replace(/_libelle/g, 'libelle'))
        this.fonction = value['description']['fonction'] as Array<fonction>;

      },
      error: (err) => {
        console.log("error list items === ", err);
      },
    })




    this.formulaireInscription = this.fb.group({
      Nom: ['', [Validators.required]],
      Pnom: ['', [Validators.required]],
      datedepot_dos: [null, [Validators.required]],
      Datenaiss: [null, [Validators.required]],
      Lieunaiss: ['', [Validators.required]],
      Etatcivil: [null, [Validators.required]],
      NationaliteID: [null, [Validators.required]],
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
      "NationaliteID": "CIV",
      "Tel": "2250004542345",
      "Mail": "test@test.com",
      "Adrgeo": "Test",
      "DiplomeobtenuLe": "2024-06-03",
      "Lieuobtentiondiplome": "Obtention ",
      "DiplomeDelivreLe": "2024-06-03",
      "Sections": [],
      "ChangementOrdre": false,
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
        new Date(dt)
        return true
      } catch (error) {
        return false
      }
    }

    const inscriptionData_ = new inscriptionData('ObjetConstruction', this.formulaireInscription.value)

    const data = {
      token: "testxxxxxxxxxxxxx",
      body: { ...inscriptionData_.myData, dossier: this.myService.uploadFile(this.listFile) },
      // body: {
      //   ...this.formulaireInscription.value,
      //   ...this.formulaireInscription.controls['etabPharmaceutique'].value,
      //   ...this.formulaireInscription.controls['contact'].value['contactPro'],
      //   ...this.formulaireInscription.controls['contact'].value['contactImmediat']
      // },
      formpatDate: function () {
        for (const key in this.body) {
          if (dateIsValide(this.body[key])) {
            this.body[key] = String(this.body[key]).replace(/-/g, '')
            // this.body[key] = String( this.body[key] ).replace('-','').replace('/','')
          }
        }
      }

    }


    // for (const clef of ["etabPharmaceutique", "contact"]) {
    //   delete data.body[clef]
    // }

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
    this.formulaireInscription.controls[key].setValue(listSection);


    // console.log( "this.listSection ", key, listSection);
    console.log("this.formulaireInscription ", this.formulaireInscription.value);
    console.log("this.formulaireInscription ", this.formulaireInscription);


  }


  btnCheckRadio(val: any) {
    this.formulaireInscription.patchValue({ 'Etatcivil': val })
  }


  uploadFile(id: number, key: string, myFile: any) {
    console.log(myFile);
    // console.log('#fichier_'+ id +' + .fichierImport > span');

    // const myFile = file //as HTMLInputElement

    if (!myFile.target.files[0]) return

    this.listFile.push({
      key,
      fileName: myFile.target.files[0].name,
      id,
      file: myFile.target.files[0]
    })

    const timSpan = setInterval(() => {
      const mySpan = document.querySelector('#name_' + id)
      console.log(mySpan);
      if (mySpan) {
        clearInterval(timSpan)
        mySpan!.textContent = myFile.target.files[0].name
      }
    }, 10)

  }

  fileIsUpload(id: number) {
    console.log("this.listFile ", this.listFile);

    return this.listFile.find((elt) => elt.id === id) != undefined
  }

  deleteFile(id: number) {
    console.log("this.listFile ", this.listFile);
    this.listFile = this.listFile.filter((elt) => elt.id !== id)
    // return true
  }

}
