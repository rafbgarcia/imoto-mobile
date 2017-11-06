import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import googleMapsClient from '@google/maps'

@Component({
  selector: 'page-select-address',
  templateUrl: 'select-address.html',
})
export class SelectAddressPage {

  googleMaps:any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.googleMaps = googleMapsClient.createClient({
      language: 'pt-BR',
      types: ['(cities)'],
      componentRestrictions: { country: "br" },
      key: 'AIzaSyAtVnwzCXe_FGqYQ6KwjSyaZQMr67Bn9kU',
    })
  }

  ionViewDidLoad() {
    this.googleMaps.places({query: "rua nova aurora natal rn"}, (data) => {
      console.log(data)
    })
  }

}
