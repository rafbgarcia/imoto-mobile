import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { GraphqlService } from '../services/graphql.service'
import { CustomerService } from '../services/customer.service'

import { HomePage } from '../pages/home/home';
import { OrdersPage } from '../pages/orders/orders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public screenOrientation: ScreenOrientation,
    private graphql: GraphqlService,
    private customer: CustomerService,
   ) {
    this.customer.loadFromStorage().then((customer) => {
      this.initGraphql(customer)
      this.initializeApp()
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Início', component: HomePage },
      { title: 'Pedidos', component: OrdersPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      if (this.platform.is('Cordova') || this.platform.is('cordova')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      }
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private initGraphql(customer) {
    this.graphql.init(customer.authToken)

    this.graphql.run(this.query()).then((data) => {
      this.graphql.init(data.customer.authToken)
    })
  }

  private query() {
    return `query currentCustomer {
      customer: currentCustomer {
        name
        phoneNumber
        authToken
      }
    }`
  }
}
