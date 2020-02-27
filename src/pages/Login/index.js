import { Box, Button, Container, Divider, makeStyles, TextField, Typography } from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { default as React, useState } from 'react';
import { LOCALSTORAGE_TOKEN_NAME } from '../../configurations';
import { post } from '../../utils/ApiCaller';
import usePersistedState from '../../utils/usePersistedState';

const useStyle = makeStyles(theme => ({
  wrapper: {
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '38%',
  },
  containerLabel: {
    align: 'center',
  },
  textbox: {
    fontSize: '4em',
  },
  button: {
    marginTop: '30px',
  }
}));


export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = usePersistedState(LOCALSTORAGE_TOKEN_NAME, '');
  const [failMessage, setFailMessage] = useState(' ');
  const [isFail, setIsFail] = useState(false);
  const classes = useStyle();

  const [user, setUser] = usePersistedState(LOCALSTORAGE_TOKEN_NAME);
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }


  function login(e){
    if (username != '' && password != '') {
      submitForm(e);
    }
    else {
      setIsFail(true);
      setFailMessage("Username and Password is required");
    }
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
      setIsFail(true);
      setFailMessage(error.response.data.message);
    }
  }

  return (

    <Box>
      <Container className={classes.wrapper}>
        <Container className={classes.containerLabel}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <Divider/>
          <Typography variant="h4" align="center" color="primary">
            <LockOpenOutlinedIcon/>
          </Typography>

        </Container>
        <TextField
          error={isFail}
          label="username"
          required
          helperText=" "
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          error={isFail}
          label="password"
          required
          type="password"
          id="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          helperText={failMessage}
        />
        <Button onClick={login} variant="contained" color="primary" size="large" className={classes.button}>
            Login
        </Button>

      </Container>
    </Box>



  );
}
