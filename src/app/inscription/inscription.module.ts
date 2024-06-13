import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription.component';
import { RouterModule } from '@angular/router';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckButtonModule } from '../shared/checkButton/checkButton.module';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InscriptionRoutingModule,
    ReactiveFormsModule,
    CheckButtonModule,
    NzSelectModule,
    FormsModule

  ],
  declarations: [
    InscriptionComponent,
    FormInscriptionComponent
  ],
  exports:[
    FormInscriptionComponent
  ]
})
export class InscriptionModule { }
