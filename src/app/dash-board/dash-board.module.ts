import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board.component';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { HeaderComponent } from './header/header.component';
import { DataTableComponent } from './dataTable/dataTable.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InscriptionModule } from '../inscription/inscription.module';
import { AccueilComponent } from './accueil/accueil.component';
import { NotificationModule } from '../shared/notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashBoardRoutingModule,
    NzDropDownModule,
    NzTableModule,
    NzModalModule,
    InscriptionModule,
    NotificationModule
  ],
  declarations: [
    DashBoardComponent,
    MenuComponent,
    HeaderComponent,
    DataTableComponent,
    AccueilComponent
  ]
})
export class DashBoardModule { }
