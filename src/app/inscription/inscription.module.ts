import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription.component';
import { RouterModule } from '@angular/router';
import { InscriptionRoutingModule } from './inscription-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InscriptionRoutingModule,
  ],
  declarations: [InscriptionComponent]
})
export class InscriptionModule { }
