import { Component } from '@angular/core'
import { LoadingController, ViewController, NavParams } from 'ionic-angular'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html',
})
export class AddLocationPage {

  location:any = {}

  constructor(
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private http: Http,
  ) {
    const placeId = navParams.get('placeId')

    const loader = this.loadingCtrl.create({
      content: "Carregando informações do local...",
    })
    loader.present()
    const url = `/placesApi/details/json?placeid=${placeId}&key=AIzaSyCG1ehktpNiiCFlqIDc1uikmZjuJN3_fx0&language=pt-BR`
    this.http.get(url).map(res => res.json()).subscribe((data) => {
      this.location = this.destructGooglePlace(data.result)
      loader.dismiss()
    })
  }

  addLocation(location) {
    this.viewCtrl.dismiss({ location })
  }

  isValid(location) {
    if (Object.keys(location).length === 0) {
      return false
    }
    const requiredFields = ["name", "street", "number", "zipcode", "neighborhood", "city", "uf"]
    return requiredFields.every((key) => !this.isEmpty(location[key]))
  }

  private isEmpty(value) {
    return !value || value.length === 0
  }

  private componentTypes:any = {
    street: "route",
    number: "street_number",
    neighborhood: "sublocality_level_1",
    city: "administrative_area_level_2",
    uf: "administrative_area_level_1",
    country: "country",
    zipcode: "postal_code",
  }

  private destructGooglePlace(place) {
    const { lat, lng } = place.geometry.location
    const location:any = {
      lat,
      lng,
      placeId: place.place_id,
      formattedAddress: place.formatted_address,
      formattedPhoneNumber: place.formatted_phone_number,
    }

    if (place.types.includes("establishment")) {
      location.name = place.name
    }

    place.address_components.forEach((component) => {
      for (let [locationPiece, componentType] of Object.entries(this.componentTypes)) {
        if (component.types.includes(componentType)) {
          location[locationPiece] = component.short_name
        }
      }
    })

    return location
  }

}
