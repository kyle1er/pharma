import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription.component';
import { RouterModule } from '@angular/router';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InscriptionRoutingModule,
    ReactiveFormsModule
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
