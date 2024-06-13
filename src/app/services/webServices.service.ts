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


  // Key Generation
// iv = window.crypto.getRandomValues(new Uint8Array(16)); // Create a random Initialization Vector
// encryptionKey : any = null;

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
            this.http.get(api.data.url + "?" + params).subscribe({
              next : ( dataGet )=>{
                myNewData.next(dataGet);
              },
              error : ( err )=>{
                myNewData.error(err);
              }
            })
          } else if (api.data.methode === "POST") {
            this.http.post(api.data.url, params).subscribe({
              next : ( dataPost )=>{
                myNewData.next(dataPost);
              },
              error : ( err )=>{
                myNewData.error(err);
              }
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




  authenticate(fichier: string, params: any = ""){
    sessionStorage.clear()
    return new Observable(obser =>{

      this.execute( fichier, params ).subscribe({
        next : ( data )=>{
          // console.log("my data == ", data);

          sessionStorage.setItem("auth", JSON.stringify(data));
          obser.next({
            statut : 1,
            data : ""
          })
        },
        error : ( err )=>{
          console.log("my data err == ", err);
          obser.error({
            statut : -1,
            data : err
          })
        }
      })


    })


  }



//   private genereKey() {

//     // Generate a secure encryption key
//     window.crypto.subtle.generateKey({ name: 'AES-CBC', length: 256 }, true, ['encrypt', 'decrypt']).then(key => {
//       this.encryptionKey = key;
//     }).catch(err => {
//       console.error(err);
//     });
//   }


// // Function to Encrypt Text
// private encryptData() {

//   this.genereKey();

//   let encoder = new TextEncoder();
//   let dataToEncrypt = encoder.encode('Secure Text');

//   window.crypto.subtle.encrypt({ name: 'AES-CBC', iv: this.iv }, this.encryptionKey, dataToEncrypt).then(cipherText => {
//     let encryptedData = new Uint8Array(cipherText);
//     console.log(`Cipher text: ${Array.from(encryptedData).join(",")}`); // Display the encrypted data
//   }).catch(err => {
//     console.error(err);
//   });
// }

// // Function to Decrypt Text
// private decryptData() {
//   let encryptedData = new Uint8Array([/*Cipher text data comes here*/]); // Add the encrypted data

//   window.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv }, this.encryptionKey, encryptedData.buffer).then(plainText => {
//     let decoder = new TextDecoder();
//     console.log(`Plain text: ${decoder.decode(plainText)}`);  // Display the decrypted data
//   }).catch(err => {
//     console.error(err);
//   });
// }
}