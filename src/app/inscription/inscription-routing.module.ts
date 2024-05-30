import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';

const routes: Routes = [

  {
    path: "", component: InscriptionComponent ,children: [
      { path: "inscription", component: FormInscriptionComponent },
      // { path: "passWord-forget", component: MotOublieComponent },
      { path: "**", redirectTo: "inscription" }
    ]
  },
  {
    path:"**", redirectTo:"/connexion"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule]
})
export class InscriptionRoutingModule { }
