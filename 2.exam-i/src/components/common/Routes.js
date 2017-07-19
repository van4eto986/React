import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ListPetsPage from '../cars/ListCarsPage'
import RegisterPage from '../users/RegisterPage'
import LoginPage from '../users/LoginPage'
import LogoutPage from '../users/LogoutPage'
import CreateCarPage from '../cars/CreateCarPage'
import CarDetailsPage from '../cars/CarDetailsPage'
import PrivateRoute from './PrivateRoute'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={ListPetsPage} />
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/login' exact component={LoginPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
    <PrivateRoute path='/cars/add' component={CreateCarPage} />
    <PrivateRoute path='/cars/details/:id' component={CarDetailsPage} />    
  </Switch>
)

export default Routes
