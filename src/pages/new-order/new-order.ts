import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SelectAddressPage } from '../select-address/select-address';

@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {

  stops = [{}, {}]

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {}

  removeStop(stop) {
    this.stops = this.stops.filter((aStop) => aStop != stop)
  }

  addStop() {
    this.stops.push({})
  }

  selectAddress(stop) {
    const modal = this.modalCtrl.create(SelectAddressPage)
    modal.onDidDismiss((data) => {
      if (data) {
        stop.location = data.location
      }
    })
    modal.present()
  }

}
