import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import * as GraphQLClient from 'graphql.js'

@Injectable()
export class CustomerService {
  isLoaded:boolean
  name:string
  authToken:string
  phoneNumber:string

  constructor(
    private storage: Storage,
  ) {}

  loadFromStorage() {
    const fields:any = ['authToken', 'phoneNumber', 'name']

    return this.storage.forEach((value, field) => {
      if(fields.includes(field)) {
        this.save({ [field]: value })
      }
    })
    .then(() => this.isLoaded = true)
    .then(() => this)
  }

  save(data) {
    for (let field in data) {
      this[field] = data[field]
      this.storage.set(field, this[field])
    }
  }
}
