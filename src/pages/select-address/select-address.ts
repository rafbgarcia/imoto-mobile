import { Component } from '@angular/core';
import { ViewController, ModalController, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

import 'rxjs/add/operator/map';
import { AddLocationPage } from '../add-location/add-location';

@Component({
  selector: 'page-select-address',
  templateUrl: 'select-address.html',
})
export class SelectAddressPage {

  query = ""
  predictions:any = null
  loading = false

  constructor(
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private http: HTTP,
  ) {}

  onInput() {
    if (this.query.length < 3) return
    this.setLoading(true)

    const url = encodeURI(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCG1ehktpNiiCFlqIDc1uikmZjuJN3_fx0&input=${this.query}&sensor=true&language=pt-BR`)
    this.http.get(url, {}, {}).then((res) => {
      this.predictions = JSON.parse(res.data).predictions
      this.setLoading(false)
    })
  }

  onCancel() {
    this.query = ""
    this.predictions = null
  }

  selectPrediction(prediction) {
    const modal = this.modalCtrl.create(AddLocationPage, { placeId: prediction.place_id })
    modal.onDidDismiss((data) => {
      if (data && data.location) {
        this.viewCtrl.dismiss({location: data.location})
      }
    })
    modal.present()
  }

  private setLoading(val) {
    this.loading = val
  }
}
