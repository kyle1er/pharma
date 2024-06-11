import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscribeGuard implements CanActivate {

  stateI : boolean = false;

  constructor( private  activateRoute: ActivatedRoute, private router : Router ) {
    this.activateRoute.paramMap.subscribe( obs =>{
      console.log("guard == ", obs, window.history.state);

      if ( JSON.stringify( window.history.state) === JSON.stringify( { inscription: 'yes', finish: false } ) ) {
        this.stateI = true
      }
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log("guard end");

      if ( !this.stateI ) {
        this.router.navigateByUrl( '/auth' )
        return false;
      }/* else{
        router.navigateByUrl('/inscription/inscription')
      } */

      return true;
  }

}
