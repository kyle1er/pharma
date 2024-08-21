import { capitalize } from "lodash";

export class inscriptionData {

  private _myData: any;
  private _myDataReceived: any;

  constructor(typeOfObjet: 'objetSimple' | 'ObjetConstruction', objet: any) {
    /*
    typeOfObjet === le type de l'objet passé en paramètre
     */
    this._myDataReceived = { ...objet };

    switch (typeOfObjet) {
      case 'ObjetConstruction':
        this.ObjetConstruction(objet)
        break;

      default:
        let newobjet : any = {};
        for (const element of Object.keys(objet)) {
          newobjet[ element[0].toLocaleUpperCase()+element.slice(1) ] = objet[element]
        }
        this.objetSimple(newobjet)
        break;
    }
  }


  private objetSimple(data: any) {
    const etabPharmaceutique = {
      Raisonscial_emp: data?.Raisonscial_emp,
      Adrpost_emp: data?.Adrpost_emp,
      Tel_emp: data?.Tel_emp,
      Fax_emp: data?.Fax_emp,
      Adrgeo_emp: data?.Adrgeo_emp
    }
    const contact = {
      contactImmediat: {
        Nomcontact_immed: data?.Nomcontact_immed,
        Adrcontact_immed: data?.Adrcontact_immed,
        Telcontact_immed: data?.Telcontact_immed
      },
      contactPro: {
        Nomcontact_prof: data?.Nomcontact_prof,
        Adrcontact_prof: data?.Adrcontact_prof,
        Telcontact_prof: data?.Telcontact_prof

      }
    }

    for (const key of [...Object.keys(etabPharmaceutique), ...Object.keys(contact.contactImmediat), ...Object.keys(contact.contactPro)]) {
      delete data[key]
    }

    // console.log("list key restant  === ", Object.keys(data));

    this._myData = {
      ...data,
      etabPharmaceutique,
      contact
    }

  }

  private ObjetConstruction(data: any) {
    this._myData = {
      ...data,
      ...data['etabPharmaceutique'],
      ...data['contact']['contactPro'],
      ...data['contact']['contactImmediat']
    }

    delete this._myData['etabPharmaceutique']
    delete this._myData['contact']
  }

  get myData() {
    return this._myData
  }
  get myDataOriginal() {
    return this._myDataReceived
  }
}
