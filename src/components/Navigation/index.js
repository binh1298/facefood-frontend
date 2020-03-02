import { AppBar, Grid, Tab, Tabs, Toolbar, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { withRouter } from "react-router-dom";
import { LOCALSTORAGE_TOKEN_NAME } from '../../configurations';
import usePersistedState from '../../utils/usePersistedState';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.navBar.background.main,
    color: theme.navBar.primary.main,
  },
  item: {
    color: theme.navBar.primary.main,
    textDecoration: 'none',
  },
  logout: {
    float: "right",
    color: theme.navBar.logout.main,
  }
}));

function Navigation(props) {
  const classes = useStyles();
  const [user, setUser] = usePersistedState(LOCALSTORAGE_TOKEN_NAME);
  const handleCallToRouter = (event, newValue) => {
    console.log(newValue);
    props.history.push(newValue);
  }
  if (user) {
    return (
      <AppBar className={classes.root}>

        <Toolbar className={classes.root}>
          <Grid item>
            <Tabs
              value={props.history.location.pathname}
              onChange={handleCallToRouter}
            >
              {/* <Tab
              label="Home"
              className={classes.item}
              component={RouterLink}
              to="/"
            /> */}
              <Tab
                label="Users"
                className={classes.item}
                value="/users"
              />
              <Tab
                label="Posts"
                className={classes.item}
                value="/posts"
              />
              {/* <Tab
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
            /> */}

              {/* <Tab
                label="Logout"
                className={classes.item}
                value="/logout"
              /> */}
            </Tabs>
          </Grid>

          <Grid container justify="space-between" />

          <Grid item>
            <Button variant="outlined" value="/logout"
             onClick={() => props.history.push("/logout")}>
              Logout
            </Button>
          </Grid>

        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar className={classes.root}>
        <Toolbar className={classes.root}>
          {/* <Tabs value={value}>
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
          </Tabs> */}
        </Toolbar>
      </AppBar>
    );
  }

}

export default withRouter(Navigation);