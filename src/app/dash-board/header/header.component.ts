import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebServicesService } from 'src/app/services/webServices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userData: any;
  nomUser: string = ""
  constructor(private route: Router, private webService: WebServicesService) { }

  ngOnInit() {
    this.UserInitial()
  }

  deconnecte() {
    this.webService.execute('logout').subscribe({
      next: () => {
        sessionStorage.clear();
        this.route.navigateByUrl('/')
      },
      error: (err) => {

      }
    })
  }

  getUserInfos() {
    this.webService.getUserInfos()
  }

  UserInitial(init = true) {
    if (init) {
      this.onResize()
    }
    window.addEventListener('resize', () => {
      this.onResize()
    })
  }

  onResize() {
    if (window.screen.width <= 425) {
      this.nomUser = this.userData?.nom.charAt(0) || ''
    } else {
      this.nomUser = this.userData.nom;
    }
  }

}
