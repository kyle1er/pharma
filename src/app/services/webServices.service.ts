import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface myUri {
  methode: 'POST' | 'GET'
  url: string
  params: any
}



@Injectable({
  providedIn: 'root'
})

export class WebServicesService {

  constructor(private http: HttpClient) { }

  execute(fichier: string, params: any = "") {
    return new Observable(myNewData => {

      let api: { statut: number, data: myUri };

      this.loadFile(fichier).subscribe(data => {
        api = data;
        console.log("my api ", api);

        /* ------- */

        if (api.statut) {
          if (api.data.methode === "GET") {
            this.http.get(api.data.url + "?" + params).subscribe(dataGet => {
              myNewData.next(dataGet);
            })
          } else if (api.data.methode === "POST") {
            this.http.post(api.data.url, params).subscribe(dataPost => {
              myNewData.next(dataPost);
            })
          }
        } else {
          console.log("Le fichier " + fichier + " n'existe pas.");
          myNewData.error({
            statut: -1,
            libErreur: "Le fichier " + fichier + " n'existe pas."
          })
        }

      })

    })

  }



  private loadFile(file: string): Observable<{ statut: number, data: myUri }> {

    /**
     * {
     *    methode : POST | GET
     *    url : ************
     *    params : {
     *    }
     * }
     */

    return new Observable(obser => {
      this.http.get("api/" + file + ".json").subscribe({
        next: (fichierData) => {
          obser.next({
            statut: 1,
            data: <myUri>fichierData
          })
        },
        error: (err) => {
          obser.error({
            statut: 0,
            data: err
          })
        }
      })
    })
  }
}
