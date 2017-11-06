import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { SelectAddressPage } from '../select-address/select-address';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {

  stops:any = [{}, {}]

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public graphql: GraphqlService,
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
        stop.location = data
      }
    })
    modal.present()
  }

  makeOrder() {
    this.stops.map((stop, i) => stop.sequence = i)

    this.graphql.query(this.makeOrderMutation).then((data) => {
      if (data.order.error) {
        this.alertCtrl.create({title: "Ops", message: data.order.error}).present()
      } else {
        this.navCtrl.push(SelectAddressPage)
      }
    })
  }

  canMakeOrder() {
    return this.stops.every((stop) => {
      let cond = stop.instructions && stop.instructions.length > 5
      cond = stop.location && stop.location.placeId.length > 0
      return cond
    })
  }

  private makeOrderMutation() {
    return `mutation createOrder {
      order: createOrder {
        ... on Order {
          name
          phoneNumber
          authToken
        }

        ... on Error {
          error
        }
      }
    }`
  }
}
