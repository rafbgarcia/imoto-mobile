import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { IonicStorageModule } from '@ionic/storage'
import { TextMaskModule } from 'angular2-text-mask'
import { ElasticModule } from 'angular2-elastic'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OrdersPage } from '../pages/orders/orders';
import { NewOrderPage } from '../pages/new-order/new-order';
import { SelectAddressPage } from '../pages/select-address/select-address';
import { ConfirmOrderPage } from '../pages/confirm-order/confirm-order';
import { AddLocationPage } from '../pages/add-location/add-location';
import { PaymentDetailsPage } from '../pages/payment-details/payment-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GraphqlService } from '../services/graphql.service'
import { CustomerService } from '../services/customer.service'

import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    MyApp,
    OrdersPage,
    HomePage,
    NewOrderPage,
    SelectAddressPage,
    ConfirmOrderPage,
    AddLocationPage,
    PaymentDetailsPage,
  ],
  imports: [
    IonicStorageModule.forRoot(),
    HttpModule,
    ElasticModule,
    BrowserModule,
    TextMaskModule,
    IonicModule.forRoot(MyApp, {}, {
       links: [
        { component: HomePage, name: 'HomePage', segment: 'inicio' },
        { component: NewOrderPage, name: 'NewOrderPage', segment: 'novo-pedido', defaultHistory: [HomePage] }
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrdersPage,
    HomePage,
    NewOrderPage,
    SelectAddressPage,
    ConfirmOrderPage,
    AddLocationPage,
    PaymentDetailsPage,
  ],
  providers: [
    GraphqlService,
    CustomerService,

    StatusBar,
    SplashScreen,
    ScreenOrientation,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
