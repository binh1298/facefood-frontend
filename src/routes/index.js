import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Logout from '../pages/Logout'
import { Switch } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import ListUser from '../pages/ListUser';
import UserDetail from '../pages/UserDetail';
import ListPost from '../pages/SearchPost/';
import PostDetail from '../pages/PostDetail';

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
    path: '/users/:id',
    name: 'userDetail',
    component: UserDetail
  },
  {
    path: '/users',
    name: 'listUser',
    component: ListUser
  },
  {
    path: '/posts/:id',
    name: 'postDetail',
    component: PostDetail,
  },
  {
    path: '/posts',
    name: 'posts',
    component: ListPost,
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