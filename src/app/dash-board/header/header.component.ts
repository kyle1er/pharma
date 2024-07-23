import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebServicesService } from 'src/app/services/webServices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userData : any;
  nomUser : string = ""
  constructor( private route : Router, private webService : WebServicesService ) { }

  ngOnInit() {
    // this.webService.getUserInfos().subscribe((dat)=>{
    //   console.log(" header data user ", dat);
    //   this.userData = dat;
    // })
    this.UserInitial()
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

  getUserInfos(){
    this.webService.getUserInfos()
  }

  UserInitial(init = true){
    // let name$ = name;
    if (init) {
      if (window.screen.width <= 425) {
        this.nomUser = this.userData?.nom.charAt(0) || ''
      }
      console.log("name === ", this.userData?.nom);

      // return name$
    }else{

      window.addEventListener('resize', ()=>{
        if (window.screen.width <= 425) {
          this.nomUser = this.userData?.nom.charAt(0) || ''
        }
        console.log("name === ", this.userData?.nom);
      }, true)
    }
    // return name$
  }
}
