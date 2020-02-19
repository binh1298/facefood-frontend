import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Tabs,Tab } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#000000',
  },
  item: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    marginRight: theme.spacing(5),
  }
}));

export default function Navigation() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Link className={classes.item} to="/">Home</Link>
        <Link className={classes.item} to="/login">Login</Link>
        <Link className={classes.item} to="/register">Register</Link>
        <Link className={classes.item} to="/listUser">List User</Link>
      </Toolbar>
    </AppBar>
  );
}
