import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-select-address',
  templateUrl: 'select-address.html',
})
export class SelectAddressPage {

  query = ""
  results = null
  loading = false

// FRONT END
// https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCG1ehktpNiiCFlqIDc1uikmZjuJN3_fx0&input=rua%20nova%20aurora%20natal%20rn&types=(regions)&language=pt-BR&country=br
// SERVER SIDE -> ASYNC
// https://maps.googleapis.com/maps/api/place/details/json?placeid=Ei5SdWEgTm92YSBBdXJvcmEgLSBQaXRpbWLDuiwgTmF0YWwgLSBSTiwgQnJhc2ls&key=AIzaSyCG1ehktpNiiCFlqIDc1uikmZjuJN3_fx0

  constructor(
    public viewCtrl: ViewController,
    private http: Http,
  ) {}

  onInput() {
    if (this.query.length < 3) return
    this.setLoading(true)

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?language=pt-BR&query=${this.query}&key=AIzaSyCG1ehktpNiiCFlqIDc1uikmZjuJN3_fx0&sensor=true`
    this.http.get(url).map(res => res.json()).subscribe((data) => {
      this.setLoading(false)
      this.results = data.results
    })
  }

  onCancel() {
    this.query = ""
    this.results = null
  }

  selectLocation(location) {
    this.viewCtrl.dismiss({
      placeId: location.place_id,
      formattedAddress: location.formatted_address,
    })
  }

  private setLoading(val) {
    this.loading = val
  }

}
