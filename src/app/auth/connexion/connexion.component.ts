import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebServicesService } from 'src/app/services/webServices.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  formulaireConnexion !: FormGroup;
  isLoadingOne: boolean = false;

  constructor( private fb: FormBuilder, private cnx: WebServicesService, private router: Router ) {
    this.formulaireConnexion = this.fb.group({
      pseudo : ['', [Validators.required]],
      passWord : ['', [Validators.required]],
    })
  }


  ngOnInit() {

  }


  connexion(){
    console.log(this.formulaireConnexion.value);
    console.log(this.formulaireConnexion);
    this.isLoadingOne = true;

    this.cnx.authenticate("test").subscribe({
      next: (data) => {
        this.isLoadingOne = false;
        console.log("Mon retour ", data);

        this.router.navigateByUrl("/pharma")
      },
      error: (err) => {
        this.isLoadingOne = false;
        console.log("Mon retour err ", err);
      }
    })
  }


  inscription(){
    // this.router.navigate(['/inscription'], {state : { param : {inscription: 'yes', finish: false} }} )
    this.cnx.routerInscription()
  }
}
