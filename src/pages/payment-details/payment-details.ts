import { Component } from '@angular/core'
import { NavParams, NavController, AlertController } from 'ionic-angular'
import { ConfirmOrderPage } from '../confirm-order/confirm-order';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetailsPage {

  customer:any = {name: "", phoneNumber: ""}
  order:any = {}
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public graphql: GraphqlService,
    public alertCtrl: AlertController,
  ) {
    this.order = navParams.get('order')
  }

  makeOrder() {
    this.graphql.run(this.makeOrderMutation(), { params: this.order, customerParams: this.customer }).then((data) => {
      if (data.order.error) {
        this.alertCtrl.create({title: "Ops", message: data.order.error, buttons: ['Ok']}).present()
      } else {
        this.navCtrl.push(ConfirmOrderPage, { order: data.order })
      }
    })
  }

  canMakeOrder(customer) {
    return customer.name.length > 3 && customer.phoneNumber.length > 7
  }

  private makeOrderMutation() {
    return `mutation createOrder($params: OrderParams, $customerParams: CustomerParams) {
      order: createOrder(params: $params, customerParams: $customerParams) {
        ... on Order {
          id
          pending
        }

        ... on Error {
          error
        }
      }
    }`
  }
}
