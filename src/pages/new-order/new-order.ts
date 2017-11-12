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
    this.stops = [
      {"location":{"lat":-5.8723353,"lng":-35.1804742,"placeId":"ChIJWbvTVSX_sgcRzyw84ymnSh8","formattedAddress":"Av. Engenheiro Roberto Freire, 3980 - Ponta Negra, Natal - RN, 59090-000, Brasil","formattedPhoneNumber":"(84) 3209-2424","name":"Camarões Restaurante","number":"3980","street":"Av. Engenheiro Roberto Freire","neighborhood":"Ponta Negra","city":"Natal","uf":"RN","country":"BR","zipcode":"59090-000"},"instructions":"Pegar pedido no nome de Rafael Garcia"},
      {"location":{"lat":-5.789801299999999,"lng":-35.2006621,"placeId":"ChIJufNyPRMAswcR6C8LRO71wZw","formattedAddress":"Av. Campos Sáles, Natal - RN, Brasil","street":"Av. Campos Sáles","city":"Natal","uf":"RN","country":"BR","name":"Casa","number":"703","complement":"apt 501","neighborhood":"Tirol","zipcode":"59020-300"},"instructions":"Tocar o interfone no apt. 501 e entregar o pedido a Rafael"}
    ]
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
        this.alertCtrl.create({title: "Ops", message: data.order.error, buttons: ['Ok']}).present()
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
