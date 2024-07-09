import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { PassWordEditComponent } from '../auth/passWordEdit/passWordEdit.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [

  {
    /* pharma */
    path: "", component: DashBoardComponent ,children: [
      { path: "", component: AccueilComponent },
      { path: "passWord-edit", component: PassWordEditComponent },
      // { path: "**", redirectTo: "connexion" }
    ]
  },
  {
    path:"**", redirectTo:"/auth"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule]
})
export class DashBoardRoutingModule { }
