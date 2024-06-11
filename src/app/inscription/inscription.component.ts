import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  mustShow : boolean = false;

  constructor( private  activateRoute: ActivatedRoute, private router : Router ) {

    // this.activateRoute.paramMap.subscribe( obs =>{
    //   // console.log("obs.get('state') ", obs.get('state'));
    //   // console.log(" window.history.state ", window.history.state);
    //   // console.log( "receive ", window.history.state);
    // })

    if ( JSON.stringify( window.history.state['param']) != JSON.stringify( { inscription: 'yes', finish: false } ) ) {
      router.navigateByUrl( '/auth' )
    }else{
      this.mustShow = true;
    }
  }

  ngOnInit() {
  }


}
