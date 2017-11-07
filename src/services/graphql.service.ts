import { Injectable } from '@angular/core'
import * as GraphQLClient from 'graphql.js'

@Injectable()
export class GraphqlService {
  // host = false ? 'https://togodelivery.com.br/api/graphql' : "http://192.168.1.15:4001/api/graphql"
  host = false ? 'https://togodelivery.com.br/api/graphql' : "http://localhost:4001/api/graphql"
  graphql:any

  public init(authToken) {
    let headers = {}
    if (authToken) {
      headers["Authorization"] = authToken
    }

    this.graphql = GraphQLClient(this.host, {
      method: "POST",
      headers: headers,
      fragments: {
        // fragments, you don't need to say `fragment name`.
        // auth: "on User { token }",
        // error: "on Error { messages }"
      }
    })
  }

  run(query, variables = {}) {
    return this.graphql(this.prepareQuery(query), variables)
  }

  private prepareQuery(query): string {
    return query.replace(/\s+/g, ' ')
  }
}
