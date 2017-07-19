import React from 'react'
import { Route } from 'react-router'

import App from './components/App'
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin'
import UserProfile from './components/UserProfile'
import Home from './components/Home'
import MovieAdd from './components/MovieAdd'
import authorize from './utilities/Authorize'

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/movie/add' component={authorize(MovieAdd)} />
    <Route path='/user/login' component={UserLogin} />
    <Route path='/user/register' component={UserRegister} />
    <Route path='/user/profile/:userId' component={authorize(UserProfile)} />
  </Route>
)
