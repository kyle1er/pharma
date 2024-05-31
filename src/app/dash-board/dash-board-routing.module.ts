import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';

const routes: Routes = [

  {
    /* pharma */
    path: "", component: DashBoardComponent /* ,children: [
      { path: "connexion", component: ConnexionComponent },
      { path: "passWord-forget", component: MotOublieComponent },
      { path: "**", redirectTo: "connexion" }
    ] */
  },
  {
    path:"**", redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule]
})
export class DashBoardRoutingModule { }
