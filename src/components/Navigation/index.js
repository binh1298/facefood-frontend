import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#000000',
  },
  item: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  }
}));

export default function Navigation() {
  const classes = useStyles();
  return (
    <nav className={classes.root}>
      <ul >
        <li >
          <Link className={classes.item} to='/'>Home</Link>
        </li>
        <li>
          <Link className={classes.item} to='/login'>Login</Link>
        </li>
        <li>
          <Link className={classes.item} to='/register'>Register</Link>
        </li>
        <li>
          <Link className={classes.item} to='/logout'>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
