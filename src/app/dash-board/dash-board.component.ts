import { Component, OnInit } from '@angular/core';
import { inscriptionData } from '../shared/dto/inscriptionData';
import { WebServicesService } from '../services/webServices.service';
import { Router } from '@angular/router';
import { INotification } from '../shared/notification/INotification';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  userData: any;
  userDataName: any;
  isLoading : boolean = true;
  infoNotif!: INotification;
  infoNotifActivate: boolean = false;

  constructor(private webService: WebServicesService, private router :Router) { }

  ngOnInit(): void {
    this.webService.execute('get_phcien').subscribe({
      next: (val: any) => {
        // console.log(val);
        this.isLoading = false
        this.userData = {
          nom: val['description']['Nom'],
          prenom: val['description']['Pnom']
        }
        this.webService.setUserInfos(val['description']);
      },
      error: (err) => {
        // console.log(err);
        // this.router.navigateByUrl('/pharma')
        // this.isLoading = false;
        this.infoNotif = {
          type : 'error',
          message : "Une erreur est survenue.\nVeuillez réessayer ultérieurement."
        };

        this.infoNotifActivate = true;
      }
    })
  }


}
