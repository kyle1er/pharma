import { WebServicesService } from './../services/webServices.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGGuard implements CanActivate {

  constructor( private auth: WebServicesService, private router : Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if ( sessionStorage.getItem("auth") ) {
        return true
      }else{
        this.router.navigateByUrl( "/" );
        return false
      }

  }

}
