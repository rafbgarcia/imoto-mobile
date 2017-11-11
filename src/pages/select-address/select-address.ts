import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AddLocationPage } from '../add-location/add-location';

@Component({
  selector: 'page-select-address',
  templateUrl: 'select-address.html',
})
export class SelectAddressPage {

  query = ""
  predictions = null
  loading = false

  constructor(
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private http: Http,
  ) {}

  onInput() {
    if (this.query.length < 3) return
    this.setLoading(true)

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCG1ehktpNiiCFlqIDc1uikmZjuJN3_fx0&input=${this.query}&sensor=true&language=pt-BR`
    this.http.get(url).map(res => res.json()).subscribe((data) => {
      this.setLoading(false)
      this.predictions = data.predictions
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
