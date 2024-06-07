import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzModalModule,
    NzResultModule,
  ],
  declarations: [
    NotificationComponent
  ],
  exports : [NotificationComponent]
})
export class NotificationModule { }
