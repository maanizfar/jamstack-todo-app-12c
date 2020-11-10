import React, { useContext } from "react"
import { Router, Link } from "@reach/router"
import Dashboard from "../components/dashboard"
import { IdentityContext } from "../identity-context"
import { navigate } from "gatsby"

export default props => {
  const { identity } = useContext(IdentityContext)

  identity.on("logout", () => navigate("/"))

  return (
    <>
      <button onClick={() => identity.logout()}>Logout</button>
      <Router>
        <Dashboard path="/app" />
      </Router>
    </>
  )
}
