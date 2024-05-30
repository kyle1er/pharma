import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"inscription", loadChildren: ()=> import('./inscription/inscription.module').then( inscri => inscri.InscriptionModule )
  },
  {
    path:"auth", loadChildren: ()=> import('./auth/auth.module').then( auth => auth.AuthModule )
  },
  {
    path:"**", redirectTo:"auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
