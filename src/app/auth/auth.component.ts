import { Component, OnInit } from '@angular/core';
import { WebServicesService } from '../services/webServices.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor( private cnx: WebServicesService ) { }

  ngOnInit() {

    this.cnx.execute("test").subscribe( dat =>{
      console.log( "Mon retour ", dat );
    })

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
