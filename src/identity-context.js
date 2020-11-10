import React, { useEffect, useState } from "react"
import netlifyIdentity from "netlify-identity-widget"

export const IdentityContext = React.createContext({})

export const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    netlifyIdentity.init({})
  }, [])

  netlifyIdentity.on("login", user => {
    netlifyIdentity.close()
    setUser(user)
  })

  netlifyIdentity.on("logout", () => setUser(null))

  return (
    <IdentityContext.Provider value={{ identity: netlifyIdentity, user }}>
      {children}
    </IdentityContext.Provider>
  )
}
