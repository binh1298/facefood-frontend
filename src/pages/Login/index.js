import { Button, FormHelperText, Input, InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import React, { useState, useContext } from 'react';
import { post } from '../../utils/ApiCaller';
import jwt_decode from 'jwt-decode';
import usePersistedState from '../../utils/usePersistedState';
import { LOCALSTORAGE_TOKEN_NAME } from '../../configurations';
import LocalStorageUtils from '../../utils/LocalStorageUtils';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = usePersistedState(LOCALSTORAGE_TOKEN_NAME);
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }


  async function submitForm(e) {
    e.preventDefault();
    console.log(props);
    try {
      const res = await post(
        '/login',
        { username, password },
        {},
      )
      if (res.data.status) {
        setUser(res.data.token);
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <FormControl required>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" aria-describedby="my-helper-text" value={username} onChange={handleUsernameChange} />
        <FormHelperText id="my-helper-text">Enter a username you like.</FormHelperText>
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          aria-describedby="my-helper-text"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <FormHelperText id="my-helper-text">Enter your password.</FormHelperText>
      </FormControl>
      <Button onClick={submitForm} variant="contained">
        Login
      </Button>
    </React.Fragment>
  );
}
