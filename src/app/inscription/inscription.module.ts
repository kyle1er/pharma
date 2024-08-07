import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription.component';
import { RouterModule } from '@angular/router';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckButtonModule } from '../shared/checkButton/checkButton.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NotificationModule } from '../shared/notification/notification.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InscriptionRoutingModule,
    ReactiveFormsModule,
    CheckButtonModule,
    NzSelectModule,
    FormsModule,
    NzButtonModule,
    NotificationModule,
    NzStepsModule

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
