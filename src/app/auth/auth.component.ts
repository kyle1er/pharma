import { Component, OnInit } from '@angular/core';
import { WebServicesService } from '../services/webServices.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.clear()

    // this.cnx.authenticate("test").subscribe({
    //   next: (data) => {
    //     console.log("Mon retour ", data);
    //   },
    //   error: (err) => {
    //     console.log("Mon retour err ", err);
    //   }
    // })



    // this.cnx.execute("test").subscribe({
    //   next: (data) => {
    //     console.log("Mon retour ", data);
    //   },
    //   error: (err) => {
    //     console.log("Mon retour err ", err);
    //   }
    // })

    //   ({
    //   next : (data)=>{
    //     console.log("Mon retour ", data);
    //   },
    //   error : (err)=>{
    //     console.log("Mon retour ", err);
    //   }
    // })
  }

}
