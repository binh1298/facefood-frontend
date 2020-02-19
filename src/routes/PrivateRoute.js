import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LocalStorageUtils from '../utils/LocalStorage';
import { LOCALSTORAGE_TOKEN_NAME } from '../configurations';
export const PrivateRoute = ({ component, ...rest }) => {
  const token = LocalStorageUtils.getItem(LOCALSTORAGE_TOKEN_NAME);
  if (token && token.length > 0) {
    // TODO should check authorization here
    return <Route {...rest} component={component} />;
  }

  // We need to keep the path for first page load
  // tokenStorageService.set(pathNameKey.FIRST_LOAD, location.pathname);
  return <Redirect to='/login' />;
};