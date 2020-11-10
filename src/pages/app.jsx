import React, { useContext } from "react"
import { Router } from "@reach/router"
import Dashboard from "../components/dashboard"
import { IdentityContext } from "../identity-context"
import { navigate } from "gatsby"

export default props => {
  const { user, identity } = useContext(IdentityContext)

  if (typeof window !== "undefined") {
    if (!user) {
      navigate("/")
    }

    identity.on("logout", () => navigate("/"))
  }

  return (
    <>
      <button onClick={() => identity.logout()}>Logout</button>
      <div>Welcome, {user && user.user_metadata.full_name}</div>

      <Router>
        <Dashboard path="/app" />
      </Router>
    </>
  )
}
