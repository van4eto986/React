import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'
import HotelsAllComponent from '../../hotels/HotelsAllComponent'
import HotelCreateComponent from '../../hotels/HotelCreateComponent'
import HotelDetailsComponent from '../../hotels/HotelDetailsComponent'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={HotelsAllComponent}/>
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/login' component={LoginPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
    <PrivateRoute path='/hotels/create' component={HotelCreateComponent} />
    <PrivateRoute path='/hotels/details/:id' component={HotelDetailsComponent} />
  </Switch>
)

export default Routes
