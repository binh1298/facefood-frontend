import { makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import { get } from '../../utils/ApiCaller';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary,

  },
  button: {
    color: '#FF6F91',
  },
  com: {
    fontSize: 30,
    fontWeight: "bold",

  }

}));

export default function UserDetail() {
  const classes = useStyles();
  let user = getUserData(username);

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h2>{user.Name}</h2>
          </Grid>
          <Grid item xs={2}> <Button variant="outlined" className={classes.button}> BAN </Button> </Grid>

        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label="Username"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Gender"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Phone</h3><h5>{user.phone}</h5></Grid>
          <Grid item xs={3}><h3>Status</h3><h5>{user.status}</h5></Grid>
          <Grid item xs={3}><h3>Follower</h3><h5>100</h5></Grid>
          <Grid item xs={3}><h3>Following</h3><h5>2000</h5></Grid>
          <Grid item xs={3}><h3>Total Like</h3><h5>10</h5></Grid>
          <Grid item xs={3}><h3>Total Comments</h3><h5>164</h5></Grid>
        </Grid>
      </div>
      <div>
        <Grid item xs={2}><h3>Total Post:</h3></Grid>
      </div>
    </Fragment>
  );
}

async function getUserData() {
  e.preventDefault();
  let url = window.location.href;
  let username = url.split("/");
  let endpoint = '/user/' + username[2];
  const user = await get(endpoint, {}, {});
  return user;
}