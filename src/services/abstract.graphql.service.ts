import { Injectable } from '@angular/core'
import * as GraphQLClient from 'graphql.js'

@Injectable()
export class AbstractGraphqlService {
  host = false ? 'https://togodelivery.com.br/api/graphql' : "http://192.168.1.15:5000/api/graphql"
  graph:any

  public init(authToken) {
    let headers = {}
    if (authToken) {
      headers["Authorization"] = authToken
    }

    this.graph = GraphQLClient(this.host, {
      method: "POST",
      headers: headers,
      fragments: {
        // fragments, you don't need to say `fragment name`.
        // auth: "on User { token }",
        // error: "on Error { messages }"
      }
    })
  }

  query(query, variables = {}) {
    return this.graph(this.prepareQuery(query), variables)
  }

  private prepareQuery(query): string {
    return query.replace(/\s+/g, ' ')
  }
}
