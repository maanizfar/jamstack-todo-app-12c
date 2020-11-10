import React from "react"
import { IdentityProvider } from "./identity-context"

export const wrapRootElement = ({ element }) => (
  <IdentityProvider>{element}</IdentityProvider>
)
