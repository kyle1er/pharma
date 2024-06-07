import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private route : Router ) { }

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
    sessionStorage.clear();
    this.route.navigateByUrl('/')
    // sessionStorage.removeItem("auth");
    // .clear("auth")
  }
}
