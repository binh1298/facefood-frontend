import React from 'react';
import { Redirect } from 'react-router-dom';
import usePersistedState from '../../utils/usePersistedState';
import { LOCALSTORAGE_TOKEN_NAME } from '../../configurations';
import LocalStorageUtils from '../../utils/LocalStorage';

export default function Logout() {
  // TODO: Refactor this please thanks
  localStorage.clear();
  return (
    <Redirect to='/login' />
  );
}
