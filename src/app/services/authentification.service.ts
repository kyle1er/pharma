import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  url !: string;

constructor( private http: HttpClient ) { }

connexion(login: string, passWord: string){
  this.http.get(this.url)
}


}
