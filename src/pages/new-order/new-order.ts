import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { SelectAddressPage } from '../select-address/select-address';
import { GraphqlService } from '../../services/graphql.service';
import { ConfirmOrderPage } from '../confirm-order/confirm-order';

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
  ) {
    // this.stops = [
    //   {instructions: "Pegar documento com Rafael", location: { formattedAddress: "Rua Lafayette Lamartine - Candelária, Natal - RN, 59064-510, Brasil" }},
    //   {instructions: "Deixar na portaria", location: { formattedAddress: "Av. Campos Sáles, 703 - Tirol, Natal - RN, 59020-300, Brasil" }},
    // ]
  }

  removeStop(stop) {
    this.stops = this.stops.filter((aStop) => aStop != stop)
  }

  addStop() {
    this.stops.push({})
  }

  selectAddress(stop) {
    const modal = this.modalCtrl.create(SelectAddressPage)
    modal.onDidDismiss((data) => {
      if (data && data.location) {
        stop.location = data.location
      }
    })
    modal.present()
  }

  makeOrder() {
    const orderParams = this.buildOrderParams()

    this.graphql.run(this.makeOrderMutation(), orderParams).then((data) => {
      if (data.order.error) {
        this.alertCtrl.create({title: "Ops", message: data.order.error}).present()
      } else {
        this.navCtrl.push(ConfirmOrderPage, { order: data.order })
      }
    })
  }

  canMakeOrder() {
    return this.stops.every((stop) => {
      let cond = stop.instructions && stop.instructions.length > 5
      cond = cond && stop.location
      return cond
    })
  }

  private buildOrderParams() {
    const stops = this.stops.map((stop, i) => {
      stop.sequence = i
      return stop
    })
    return {
      params: { stops }
    }
  }

  private makeOrderMutation() {
    return `mutation createOrder($params: OrderParams) {
      order: createOrder(params: $params) {
        ... on Order {
          pending
          confirmed
        }

        ... on Error {
          error
        }
      }
    }`
  }
}
