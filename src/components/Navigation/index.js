import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Tabs, Tab, AppBar } from "@material-ui/core";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.root}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="Home"
            className={classes.item}
            component={RouterLink}
            to="/"
          ></Tab>
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
          <Tab
            label="Logout"
            className={classes.item}
            component={RouterLink}
            to="/logout"
          ></Tab>
          <Tab
            label="List Users"
            className={classes.item}
            component={RouterLink}
            to="/users" >  </Tab>
          <Tab
            label="Search post"
            className={classes.item}
            component={RouterLink}
            to="/posts"
          >
          </Tab>

          <Tab
            label="Post Detail (Test)"
            className={classes.item}
            component={RouterLink}
            to="/post/:id"
          ></Tab>
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
