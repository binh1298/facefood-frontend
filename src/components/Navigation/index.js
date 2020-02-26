import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Tabs, Tab, AppBar } from "@material-ui/core";
import usePersistedState from '../../utils/usePersistedState';
import { LOCALSTORAGE_TOKEN_NAME } from '../../configurations';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#000000",
  },
  item: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  }
}));

export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [user, setUser] = usePersistedState(LOCALSTORAGE_TOKEN_NAME);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  if (user) { 
    return (
      <AppBar className={classes.root}>
        <Toolbar className={classes.root}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label="Home"
              className={classes.item}
              component={RouterLink}
              to="/"
            />
            <Tab
              label="Users"
              className={classes.item}
              component={RouterLink}
              to="/users" 
            />
            <Tab
              label="Posts"
              className={classes.item}
              component={RouterLink}
              to="/posts"
            />
            <Tab
              label="User Detail"
              className={classes.item}
              component={RouterLink}
              to="/users/:id"
              />
            <Tab
              label="Post Detail (Test)"
              className={classes.item}
              component={RouterLink}
              to="/post/:id"
            />
            <Tab
              label="Logout"
              className={classes.item}
              component={RouterLink}
              to="/logout"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar className={classes.root}>
        <Toolbar className={classes.root}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label="Register"
              className={classes.item}
              component={RouterLink}
              to="/register"
            ></Tab>
            <Tab
              label="Login"
              className={classes.item}
              component={RouterLink}
              to="/login"
            ></Tab>
          </Tabs>
        </Toolbar>
      </AppBar>
    );
  }
  
}
