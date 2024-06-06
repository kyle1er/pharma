import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGGuard } from './shared/auth-g.guard';

const routes: Routes = [
  {
    path:"inscription", loadChildren: ()=> import('./inscription/inscription.module').then( inscri => inscri.InscriptionModule )
  },
  {
    path:"auth", loadChildren: ()=> import('./auth/auth.module').then( auth => auth.AuthModule )
  },
  {
    path:"pharma", canActivate: [AuthGGuard] , loadChildren: ()=> import('./dash-board/dash-board.module').then( dash => dash.DashBoardModule )
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
