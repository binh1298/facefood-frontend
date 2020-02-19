import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Logout from '../pages/Logout'
import { Switch } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { SearchPost as Posts } from '../pages/SearchPost/SearchPost';
import PostDetail from '../pages/PostDetail/PostDetail';

export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

export const privateRoutes = [
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts,
  },
  {
    path: '/posts/:id',
    name: 'postDetail',
    component: PostDetail,
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  
]

export const Routes = (
  <Switch>
    {publicRoutes.map(route => (
      <PublicRoute key={route.name} exact={true} path={route.path} component={route.component} />
    ))}
    {privateRoutes.map(route => (
      <PrivateRoute key={route.name} path={route.path} component={route.component} />
    ))}
  </Switch>
);