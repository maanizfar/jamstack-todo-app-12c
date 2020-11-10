import React, { useContext } from "react"
import { navigate } from "gatsby"
import { IdentityContext } from "../identity-context"
import SEO from "../components/seo"

const IndexPage = () => {
  const { user, identity } = useContext(IdentityContext)

  if (!user) {
    identity.open()
  } else {
    console.log(user)
  }

  identity.on("login", () => navigate("/app"))

  return (
    <>
      <SEO title="Home" />
      <h2>Jamstack Todo</h2>

      {!user && <button onClick={() => identity.open()}>Login</button>}
    </>
  )
}

export default IndexPage
