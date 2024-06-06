import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mot-oublie',
  templateUrl: './mot-oublie.component.html',
  styleUrls: ['./mot-oublie.component.scss']
})
export class MotOublieComponent implements OnInit {


  formulairePwdForget !: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.formulairePwdForget = fb.group({
      pseudo : ['', [Validators.required]],
      mail : ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    })
  }
  ngOnInit(): void {

  }

  pwdForget(){
    console.log(this.formulairePwdForget.value);
    console.log(this.formulairePwdForget);
  }
}
