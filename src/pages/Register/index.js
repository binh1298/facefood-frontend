import React, { useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import { post } from '../../utils/ApiCaller';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
    post('/login', { email, password }, {}, { 'Content-Type': 'application/x-www-form-urlencoded' })
      .then(res => {
        // cb(res.headers.authorization.replace('Bearer  ', ''));
        console.error('hahaha');
      })
      .catch(() => {
        console.error('Invalid Username or Password');
      });
  }
  return (
    <React.Fragment>
      <FormControl required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" aria-describedby="my-helper-text" value="email" onChange={handleEmailChange} />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="password">Pasword</InputLabel>
        <Input
          id="password"
          aria-describedby="my-helper-text"
          type="password"
          value="password"
          onChange={handlePasswordChange}
        />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <Button onClick={submitForm} variant="contained">
        Default
      </Button>
    </React.Fragment>
  );
}
