import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebServicesService } from 'src/app/services/webServices.service';
import { INotification } from 'src/app/shared/notification/INotification';

@Component({
  selector: 'app-passWordEdit',
  templateUrl: './passWordEdit.component.html',
  styleUrls: ['./passWordEdit.component.scss']
})
export class PassWordEditComponent implements OnInit {

  formulaireEditPassWord !: FormGroup
  isLoadingOne: boolean = false;
  infoNotif!: INotification;
  infoNotifActivate!: boolean;

  constructor(private fb: FormBuilder, private webService : WebServicesService) {
    this.formulaireEditPassWord = fb.group({
      old_pwd: [null, [Validators.required]],
      new_pwd: [null, [Validators.required]],
      new_pwd_confirm: [null, [Validators.required]]
    }, { validator: this.passwordMatchValidator('new_pwd', 'new_pwd_confirm') })
  }

  ngOnInit() {
  }



  showPassWord(input: HTMLInputElement, span: HTMLSpanElement) {
    // console.log("input === ", input);
    input.type = (input.type === 'text') ? 'password' : 'text'
    span.innerText = (span.innerText === 'visibility') ? 'visibility_off' : 'visibility'
  }

  passwordMatchValidator(new_pwd: string, new_pwd_confirm: string) {
    // return g.get('new_pwd').value === g.get('new_pwd_confirm').value
    //     ? null : {'mismatch': true};
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[new_pwd];
      const matchingControl = formGroup.controls[new_pwd_confirm];
      if ( matchingControl.errors && !matchingControl.errors['confirmedValidator'] ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  savePassWord(){
    console.log(this.formulaireEditPassWord);
    const params = {
      body: {
      new_pwd: this.formulaireEditPassWord.get('new_pwd')?.value,
      old_pwd: this.formulaireEditPassWord.get('old_pwd')?.value,
    }
    }
    this.webService.execute('update_pwd', params).subscribe({
      next : (val : any) =>{
        console.log(val);
        this.infoNotif = {
          type : 'success',
          message : val['description']
        }
        this.infoNotifActivate = true;
        this.formulaireEditPassWord.reset()
      },
      error : (err)=>{
        console.log(err);
        this.infoNotif = {
          type : 'error',
          message : "Une erreur est survenue lors de la modification du mot de passe"
        }
        this.infoNotifActivate = true;
      }
    })

  }

  isValidpwd( key : string, type : boolean){
    const seconKey = ( type ) ? 'valid' : 'invalid'
    return this.formulaireEditPassWord.controls[key].dirty && this.formulaireEditPassWord.controls[key][seconKey]
  }
}
