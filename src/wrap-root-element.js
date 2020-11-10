import React from "react"
import { ApolloProvider } from "@apollo/client"
import { IdentityProvider } from "./identity-context"
import { client } from "./apollo/client"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <IdentityProvider>{element}</IdentityProvider>
  </ApolloProvider>
)
