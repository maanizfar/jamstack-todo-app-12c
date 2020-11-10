import React, { useContext } from "react"
import { IdentityContext } from "../identity-context"

const Dashboard = () => {
  const { user } = useContext(IdentityContext)

  return <div>Welcome, {user && user.user_metadata.full_name}</div>
}

export default Dashboard
