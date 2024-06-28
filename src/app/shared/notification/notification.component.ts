import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INotification } from './INotification';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Output() isFermer : EventEmitter<boolean> = new EventEmitter();
  @Input() maskModal : any

  @Input() infoNotif : INotification = {
    type: 'success',
    titre: 'Succès',
    message: ""
  }

  modal : any = {
    show : true
  }
  // myModal: HTMLElement;

  constructor(private router : Router) {
    // logger.log("router.snapshot :: ", router.url)

  }

  ngOnInit() {

    console.log("this.infoNotif === ", this.infoNotif);

    // if (this.maskModal) {
    //   this.myModal = this.maskModal.modalRef.overlayRef._pane as HTMLElement
    //   this.myModal.classList.add('hidden')
    // }

    if(!this.infoNotif?.bouton2?.lien || this.infoNotif?.bouton2?.lien === "" ){
      this.infoNotif = {
        ...this.infoNotif,
        bouton2 : {
          label : this.infoNotif?.bouton2?.label || "",
          lien : this.router.url
        }
      }
    }

    // this.logger.log("this.infoNotif :: ", this.infoNotif)
  }

  modalAction(action: 'ok' | 'navigate' = 'ok', rout : string = ""){

    switch (action) {
      case 'navigate':
        // this.logger.log('navigate = ', rout)
        const listeRoute = rout.split('/')
        const parentRoute = listeRoute.slice(0, -1).join('/')
        // return
        this.router.navigateByUrl(parentRoute).then(()=>{
          this.router.navigateByUrl(rout)
        })
        // // this.router.navigateByUrl(rout)
        // window.location.href = rout
        break;

      default:
        // if (this.maskModal) {
        //   this.myModal.classList.remove('hidden')
        // }
        this.isFermer.emit(true)
        break;
    }
  }

}
