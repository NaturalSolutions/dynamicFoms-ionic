import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { FieldService } from '../../app/dynamic-form/protocol.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:  [
    //FieldService
  ]
})
export class HomePage {
  //fields: any[];
  constructor(public navCtrl: NavController) {
    //this.fields = service.getFields();
  }

}
