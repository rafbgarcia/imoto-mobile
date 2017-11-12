import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {

  order:any
  interval:any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public graphql: GraphqlService,
  ) {
    this.order = navParams.get('order')
  }

  ionViewDidLoad() {
    this.interval = setInterval(this.fetchOrderStatus.bind(this), 1000)
  }

  ionViewWillUnload() {
    clearInterval(this.interval)
  }

  private fetchOrderStatus() {
    this.graphql.run(this.orderStatusGraph(), {id: this.order.id}).then((data) => {
      this.order = data.order
      if (!this.order.pending) {
        clearInterval(this.interval)
      }
    })
  }

  private orderStatusGraph() {
    return `query orderStatus($id: ID!) {
      order(id: $id) {
        ... on Order {
          id
          pending
          confirmed
          noMotoboy
          motoboy {
            name
            central { name phoneNumber }
          }
        }

        ... on Error {
          error
        }
      }
    }`
  }

}
