import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  constructor( private fb: FormBuilder, private cnx: WebServicesService, private router: Router ) {
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
    // console.log(this.formulaireConnexion.value);
    // console.log(this.formulaireConnexion);
    // console.log("this.rememberMe === ", this.rememberMe);

    // return
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
      error: (err) => {
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
    console.log("input === ", input);
    input.type = ( input.type === 'text') ? 'password' : 'text'
    span.innerText = ( span.innerText === 'visibility' ) ? 'visibility_off' : 'visibility'
  }

  // enterPress( key  )

  gestionCookies( load = true ){
    if ( !load ) {
      if ( this.rememberMe ) {
        localStorage.setItem( 'acces', JSON.stringify( this.formulaireConnexion.value ) )
      }else{
        localStorage.removeItem( 'acces' )
      }
    }else{
      const acees : any = JSON.parse( JSON.parse( JSON.stringify( localStorage.getItem( 'acces' ) ) ) )
      if ( acees ) {
        this.formulaireConnexion.reset( {...acees} );
        this.rememberMe = true
      }
    }
  }
}
