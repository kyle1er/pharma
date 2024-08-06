import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebServicesService } from 'src/app/services/webServices.service';
import { ICheckBtnData } from 'src/app/shared/checkButton/ICheckBtnData';
import { inscriptionData } from 'src/app/shared/dto/inscriptionData';
import { myFile } from 'src/app/shared/interface/myFile';
import { INotification } from 'src/app/shared/notification/INotification';
import * as moment from 'moment';
import * as lodash from 'lodash';

interface nationalite { _i: number, _Libelle: string, _desa: boolean };
interface appreciation { _i: number, _libelle: string, UseOrdre: boolean, UseDeontologie: boolean, _desa: boolean };
interface section { _i: string, _libelle: string };
interface fonction { _i: string, _libelle: string };
interface documents { _i: number, _libelle: string, _desa: boolean, fileName?: string };



@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.scss']
})
export class FormInscriptionComponent implements OnInit {


  // @Input() data: any;
  // listFile: Array<{ id?: number, key: string, fileName: string, file: File }> = []
  listFile: Array<myFile> = [];
  enModeTest: boolean = false;






  formulaireInscription !: FormGroup;
  @Input() actionTitre: "NEW" | "EDIT" = "NEW";

  isLoading: boolean = false;
  infoNotif: INotification = {
    type: 'error',
    message: ''
  };
  infoNotifShow: boolean = false;

  listOfSelectedValue: Array<number> = []
  step: number = 0;
  mustShow: boolean = false;
  nationalite: Array<nationalite> = [];

  appreciation: appreciation[] = [];
  section: section[] = [];
  fonction: fonction[] = [];
  documents: Array<documents> = [];

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
    dataList: [] /* JSON.parse(JSON.stringify(this.section).replace(/_i/g, 'valeur').replace(/_libelle/g, 'libelle')) */
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



  constructor(private fb: FormBuilder, private myService: WebServicesService, private route: Router) {

    this.formulaireInscription = this.fb.group({
      Nom: ['', [Validators.required]],
      Pnom: ['', [Validators.required]],
      Datedepot_dos: [null, [Validators.required]],
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

        // Docs_fournis: [null, [Validators.required]],
        // fonctions: [null, [Validators.required]],

      }),

      CnceOrdre: [null, [Validators.required]],
      CnceDeontologie: [null, [Validators.required]],
    })
  }

  ngOnInit() {

    if (this.enModeTest) {
      this.formulaireInscription.setValue({
        "Nom": "YAH",
        "Pnom": "FIRM",
        "datedepot_dos": "2024-06-05",
        "Datenaiss": "2024-05-27",
        "Lieunaiss": "YAKRO",
        "Etatcivil": "Marié",
        "NationaliteID": 8,
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
      this.nationalite = [
        {
          "_i": 8,
          "_Libelle": "IVOIRIENNE",
          "_desa": false
        }
      ];

      this.appreciation = [
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
      this.section = [
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
      this.fonction = [
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
      this.documents = [
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

      this.listEtatCivil = {
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

      this.listSectionOrdre = {
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
    } else {

      const data = {
        body : [
          /* {
            "item": "doc",
            "desa": 0
          }, */
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
        ]
      }


      this.myService.execute('getItems',data , false).subscribe({
        next: (value: any) => {
          // console.log("list items === ", value);
          /* ---------------- */
          /* ---------------- */
          this.nationalite = value['description']['nationalite'] as Array<nationalite>;
          this.appreciation = value['description']['appreciation'] as Array<appreciation>;
          // this.documents = value['description']['appreciation'] as Array<appreciation>;

          this.section = value['description']['section'] as Array<section>;
          this.listSectionOrdre.dataList = JSON.parse(JSON.stringify(this.section).replace(/_i/g, 'valeur').replace(/_libelle/g, 'libelle'))
          this.fonction = value['description']['fonction'] as Array<fonction>;

          if (this.actionTitre === 'EDIT') {

            this.myService.getUserInfos().subscribe(( val )=>{
              // console.log(val);
              /* --------------------------- */
              /* SUPPRESSION DES CLES NON NECESSAIRE */
              /* --------------------------- */

              // console.log("data recu ===== ", {...val});
              const data$ = new inscriptionData('objetSimple', val);
              // console.log("data transform 0 ===== ", {...data$});
              // console.log("data$.myData ==== ", data$.myData);


              const lstKeyData = Object.keys( data$.myData );
              const deleteKey = (()=>{
                const lstKeyForm = Object.keys( this.formulaireInscription.value );
                const deleteKey = lodash.difference( lstKeyData, lstKeyForm )
                // console.log("deleteKey ===== ", deleteKey);

                for (const key of deleteKey) {
                  delete data$.myData[key]
                }
              })();

              const formateDate = (()=>{
                // const key = Object.keys( val )
                for (const iterator of lstKeyData) {
                  if (dateIsValide(data$.myData[iterator])) {
                    data$.myData[iterator] = moment(data$.myData[iterator], 'DD-MM-YYYY').format("YYYY-MM-DD")
                  }
                }
              })();

              // console.log("data transform date ===== ", {...data$});
              this.formulaireInscription.setValue({ ...data$.myData })
              // console.log("formulaireInscription === ", this.formulaireInscription);


            })

          }
        },
        error: (err) => {
          // console.log("error list items === ", err);
          this.infoNotif = {
            message: "Erreur lors du chargement des documents à fournir",
            type: 'error'
          }

          this.infoNotifShow = false;
        },
      })
    }

    // console.log(this.formulaireInscription);

  }

  stepNavigation(signe: '+' | '-' = "+") {
    this.step = eval(this.step + "" + signe + " 1");

    /* Chargement des dossiers à fournir */
    if ( signe === '+' && this.step === 3) {
      this.getListDoc();
    }
  }

  inscription() {
    this.isLoading = true;

    const inscriptionData_ = new inscriptionData('ObjetConstruction', this.formulaireInscription.value);
    const Docs_fournis = this.myService.uploadFile(Object.assign([], this.listFile));

    const data = {
      Docs_fournis,
      fonctions: this.listOfSelectedValue,
      ...inscriptionData_.myData,
      formatDate: function () {
        for (const key in this) {
          if (dateIsValide(this[key])) {
            this[key] = String(this[key]).replace(/-/g, '')
          }
        }
      }
    }

    data.formatDate()

    // console.log("sessions :: ", this.formulaireInscription.value);
    // console.log("data === ", data);



    setTimeout(() => {
      this.isLoading = false;
    }, 5000);

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

    this.formulaireInscription.controls[key].setValue(listSection);


    // console.log( "this.listSection ", key, listSection);
    // console.log("this.formulaireInscription ", this.formulaireInscription.value);
    // console.log("this.formulaireInscription ", this.formulaireInscription);


  }


  btnCheckRadio(val: any) {
    this.formulaireInscription.patchValue({ 'Etatcivil': val })
  }


  uploadFile(id: number, key: string, myFile: any) {
    console.log(myFile);

    if (!myFile.target.files[0]) return

    const [DocName, DocExtention] = (function separeNameExtention(_params: string) {
      const listElt = _params.split('.')
      return [listElt[0] || '', ((listElt.length - 1) > 0) ? listElt[listElt.length - 1] || '' : '']
    })(myFile.target.files[0].name)

    this.listFile.push({
      DocName,
      DocID: id,
      DocExtention,
      File$: myFile.target.files[0]
    })

    for (const doc of this.documents) {
      if (doc._i === id) {
        doc.fileName = myFile.target.files[0].name
      }
    }

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
    // console.log("this.listFile ", this.listFile);
    // console.log("this.documents ", this.documents);

    return this.listFile.find((elt) => elt.DocID === id) != undefined
  }

  deleteFile(id: number) {
    // console.log("this.listFile ", this.listFile);
    this.listFile = this.listFile.filter((elt) => elt.DocID !== id)
    // return true
  }


  getListDoc() {
    // console.log("fonction ==== ", fonction);

    this.myService.execute('get_documents', [...this.listOfSelectedValue], false).subscribe({
      next: (value: any) => {

        // console.log("document === ", value);
        this.documents = value['description'] as documents[];
        // this.infoNotifShow = false;

      },
      error: (err) => {
        this.infoNotif = {
          message: "Erreur lors du chargement des documents à fournir",
          type: 'error'
        }

        this.infoNotifShow = true;
      },
    })

  }


  setListFonction( fonction: any[] ){
    this.listOfSelectedValue = [...fonction];
  }

  closeForm() {
    this.route.navigateByUrl('auth/connexion')
  }
}



function dateIsValide(dt: string, format : string = 'DD-MM-YYYY') {
  if (typeof dt !== 'string') {
    return false
  }
  try {
    // const nDt = new Date(dt);
    const nDt = moment(dt, format)
    if (String(nDt).toString().toLowerCase() === String('Invalid Date').toLowerCase()) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

