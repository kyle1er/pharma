import { ConnexionComponent } from './connexion/connexion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { MotOublieComponent } from './mot-oublie/mot-oublie.component';

const routes: Routes = [

  {
    path: "", component: AuthComponent ,children: [
      { path: "connexion", component: ConnexionComponent },
      { path: "passWord-forget", component: MotOublieComponent },
      { path: "**", redirectTo: "connexion" }
    ]
  },
  {
    path:"**", redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule]
})
export class AuthRoutingModule { }
