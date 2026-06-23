import React from 'react'
import { useAuth } from './context/auth-context'
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
// import { TsReactTest } from './try-use-array'
// import ProjectListScreen from './screens/project-list'
// import { LoginScreen } from './screens/login'
export default function App() {
  const {user} = useAuth()
  return (
    <div className='App'>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
    </div>
  )
}
