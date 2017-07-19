import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'
import UserProfileComponent from '../../users/UserProfileComponent'

import CarCreateComponent from '../../cars/CarCreateComponent'
import CarsAllComponent from '../../cars/CarsAllComponent'
import CarDetailsComponent from '../../cars/CarDetailsComponent'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={CarsAllComponent}/>
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/login' component={LoginPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
    <PrivateRoute path='/cars/mine' component={UserProfileComponent} />
    <PrivateRoute path='/cars/create' component={CarCreateComponent} />
    <PrivateRoute path='/cars/details/:id' component={CarDetailsComponent}/>
  </Switch>
)

export default Routes
