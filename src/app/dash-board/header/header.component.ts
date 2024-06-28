import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebServicesService } from 'src/app/services/webServices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private route : Router, private webService : WebServicesService ) { }

  ngOnInit() {
  }


  // showMenu(btn: HTMLElement){
  //   console.log(btn);

  //   if (btn.textContent?.includes("arrow_drop_down") ) {
  //     btn.textContent = "arrow_drop_up"
  //   }else{
  //     btn.textContent = "arrow_drop_down"
  //   }

  // }

  deconnecte(){
    this.webService.execute('logout').subscribe({
      next : ()=>{
        sessionStorage.clear();
        this.route.navigateByUrl('/')
      },
      error : (err)=>{

      }
    })

    // sessionStorage.removeItem("auth");
    // .clear("auth")
  }
}
