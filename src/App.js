import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//wrap all inside router,then we wrap all inside switch so only the first child with the to will be valid(es.dashboard will be displayed only on / not on login and error,without switch we will display every component on / because they include / on the path),then we setup the route for home login and error

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path='/' exact={true}>
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='*'>
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  )
}

export default App
