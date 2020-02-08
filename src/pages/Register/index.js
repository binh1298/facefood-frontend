import React, { useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import { post } from '../../utils/ApiCaller';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function handleErrorMessageChange(message) {
    setErrorMessage(message);
  }

  async function submitForm(e) {
    e.preventDefault();
    const res = await post(
      '/register',
      { email, username, password, confirmPassword },
      {},
    )
    if (res.success) {
      console.error('Login successfully');
    } else {
      console.error(res.message);
      console.error('Invalid Username or Password');
    }
  }
  return (
    <React.Fragment>
      <FormControl required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" aria-describedby="my-helper-text" value={email} onChange={handleEmailChange} />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" aria-describedby="my-helper-text" value={username} onChange={handleUsernameChange} />
        <FormHelperText id="my-helper-text">Enter a username you like.</FormHelperText>
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="password">Pasword</InputLabel>
        <Input
          id="password"
          aria-describedby="my-helper-text"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <FormHelperText id="my-helper-text">Enter your password.</FormHelperText>
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <Input
          id="confirmPassword"
          aria-describedby="my-helper-text"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <FormHelperText id="my-helper-text">Enter your password again</FormHelperText>
      </FormControl>
      <Typography>{errorMessage}</Typography>
      <Button onClick={submitForm} variant="contained">
        Register
      </Button>
    </React.Fragment>
  );
}
