import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  formulaireConnexion !: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.formulaireConnexion = fb.group({
      pseudo : ['', [Validators.required]],
      passWord : ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }


  connexion(){
    console.log(this.formulaireConnexion.value);
    console.log(this.formulaireConnexion);
  }
}
