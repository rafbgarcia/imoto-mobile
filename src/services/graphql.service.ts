import { Injectable } from '@angular/core'
import { AbstractGraphqlService } from './abstract.graphql.service'

@Injectable()
export class GraphqlService extends AbstractGraphqlService {

  currentUser() {
    return this.query(this.currentUserQuery())
  }

  private currentUserQuery() {
    return `query getCurrentUser {
      currentUser {
        name
        phoneNumber
        authToken
      }
    }`
  }
}
