import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {

  order:any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.order = navParams.get('order')
  }

}
