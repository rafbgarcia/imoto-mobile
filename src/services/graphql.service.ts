import { Injectable } from '@angular/core'
import * as GraphQLClient from 'graphql.js'

@Injectable()
export class GraphqlService {
  host = true ? 'http://104.131.89.232:4001/api/customer/graphql' : "http://192.168.1.15:4001/api/customer/graphql"
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
