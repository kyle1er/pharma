import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoEnDeService {

constructor() { }

 private secretKeyMore = "YourSecretKeyForEncryption&Descryption";

  encrypt( secretKey : string, value : string) : string{
    return CryptoJS.AES.encrypt(value, secretKey.trim()+this.secretKeyMore).toString();
  }

  decrypt(secretKey : string, textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, secretKey.trim()+this.secretKeyMore).toString(CryptoJS.enc.Utf8);
  }

}
