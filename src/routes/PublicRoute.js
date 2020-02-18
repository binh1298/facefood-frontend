import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import usePersistedState from '../utils/usePersistedState';
import { LOCALSTORAGE_TOKEN_NAME } from '../configurations';

export const PublicRoute = props => {
  const [token, setToken] = usePersistedState(LOCALSTORAGE_TOKEN_NAME, '');
  if (token.length <= 0) {
    // TODO should check authorization here
    return <Route {...props} />;
  }

  return <Redirect to="/" />;
}
