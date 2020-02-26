import React from 'react';
import { Redirect } from 'react-router-dom';
import LocalStorageUtils from '../../utils/LocalStorageUtils';

export default function Logout() {
  LocalStorageUtils.clear();
  window.location.reload(false);
  return (
    <div></div>
  );
}
