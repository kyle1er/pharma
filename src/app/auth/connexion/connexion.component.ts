import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { random } from 'lodash';
import { CryptoEnDeService } from 'src/app/services/crypto-en-de.service';
import { WebServicesService } from 'src/app/services/webServices.service';
import { INotification } from 'src/app/shared/notification/INotification';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  formulaireConnexion !: FormGroup;
  isLoadingOne: boolean = false;
  infoNotif!: INotification;
  infoNotifActivate!: boolean;
  rememberMe: boolean = false;


  constructor( private fb: FormBuilder, private cnx: WebServicesService, private router: Router, private encrypt : CryptoEnDeService ) {
    this.formulaireConnexion = this.fb.group({
      login : ['', [Validators.required]],
      pwd : ['', [Validators.required]],
      // pseudo : ['', [Validators.required]],
      // passWord : ['', [Validators.required]],
    })
  }


  ngOnInit() {
    // this.inscription()
    this.gestionCookies();
    document.addEventListener('keypress', (e)=>{

      if ( e.key === "Enter" ) {
        if( this.formulaireConnexion.invalid ){
          this.infoNotif = {
            type : 'error',
            message : "Veuillez renseigner vos informations de connexion, svp !"
          };

          this.infoNotifActivate = true;
        }else{
          this.connexion()
        }
      }
    })
  }


  connexion(){
    this.isLoadingOne = true;

    this.cnx.authenticate("connexion", this.formulaireConnexion.value).subscribe({
      next: ( retour : any ) => {
        this.isLoadingOne = false;
        // console.log("Mon retour done ", retour);

        const data_ = retour['data'] as { fonction: "logIn", erreur: string,  status: number, lib_err: string  }
        // console.log("Mon retour done_ ", data_.lib_err);

        if (!data_.status) {
          this.infoNotif = {
            type : 'error',
            message : data_.lib_err
          };

          this.infoNotifActivate = true;
          return
        }

        this.gestionCookies( false )
        this.router.navigateByUrl("/pharma")
      },
      error: () => {
        this.isLoadingOne = false;
        // console.log("Mon retour err ", err);
        this.infoNotif = {
          type : 'error',
          message : "Une erreur est survenue lors de la connexion\nVeuillez réessayer s'il vous plaît."
        };

        this.infoNotifActivate = true;
      }
    })
  }


  inscription(){
    // this.router.navigate(['/inscription'], {state : { param : {inscription: 'yes', finish: false} }} )
    this.cnx.routerInscription()
  }

  showPassWord( input : HTMLInputElement, span : HTMLSpanElement ){
    // console.log("input === ", input);
    input.type = ( input.type === 'text') ? 'password' : 'text'
    span.innerText = ( span.innerText === 'visibility' ) ? 'visibility_off' : 'visibility'
  }

  // enterPress( key  )

  gestionCookies( load = true ){

    let myKeyStore = localStorage.key(0) || '-'+Math.floor( Math.random() * new Date().getUTCFullYear()); myKeyStore = myKeyStore.split('-')[1];
    const myKey = "key N°-"+ myKeyStore;

    if ( !load ) {
      if ( this.rememberMe ) {

        localStorage.setItem( myKey, this.encrypt.encrypt( myKey, JSON.stringify( this.formulaireConnexion.value )) )
      }else{
        localStorage.removeItem( myKey )
      }
    }else{
      const data = localStorage.getItem( myKey ) || '';
      if ( data !== '' ) {
        const acees : any = JSON.parse( JSON.parse( JSON.stringify( this.encrypt.decrypt( myKey, data ) ) ) )
        if ( acees ) {
          this.formulaireConnexion.reset( {...acees} );
          this.rememberMe = true
        }else{
          this.formulaireConnexion.reset()
        }
      }
    }
  }
}
