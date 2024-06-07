import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { MotOublieComponent } from './mot-oublie/mot-oublie.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    AuthComponent,
    ConnexionComponent,
    MotOublieComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzButtonModule
  ]
})
export class AuthModule { }
