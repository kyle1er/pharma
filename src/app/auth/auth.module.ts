import { NotificationModule } from './../shared/notification/notification.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { MotOublieComponent } from './mot-oublie/mot-oublie.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PassWordEditComponent } from './passWordEdit/passWordEdit.component';

@NgModule({
  declarations: [
    AuthComponent,
    ConnexionComponent,
    MotOublieComponent,
    PassWordEditComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzButtonModule,
    NotificationModule,
    FormsModule
  ]
})
export class AuthModule { }
