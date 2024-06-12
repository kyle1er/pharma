import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckButtonComponent } from './checkButton.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@NgModule({
  imports: [
    CommonModule,
    NzCheckboxModule,
    NzRadioModule
  ],
  declarations: [CheckButtonComponent],
  exports : [
    CheckButtonComponent
  ]
})
export class CheckButtonModule { }
