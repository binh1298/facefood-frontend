import { makeStyles, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { Fragment, useState } from 'react';
import { get } from '../../utils/ApiCaller';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,

  },
  button: {
    color: '#FF6F91',
  },
  pic: {
    width: 300,
    height: 350,
    backgroundColor: '#4B4A54',
  },
  containerName: {
    "& p": {
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  iconButtonPlus: {
      transform:'rotate(45deg)',
      "& > *":{
        color:'green',
      },
  },
  iconButtonBan: {
    "& > *":{
      color:'red',
    },
},

}));

export default function UserDetail() {
  const classes = useStyles();
  const [status, setStatus] = useState(classes.iconButtonPlus);

  function handleClickIcon()
  {
    if(status === classes.iconButtonPlus){
      setStatus(classes.iconButtonBan);
    }else{
      setStatus(classes.iconButtonPlus);
    }
  }

  return (
    <Fragment>
      <Grid container spacing={2} className={classes.containerName}>
        <Grid item xs={4}>
          <Typography>PHÍ ĐỖ HỒNG ĐỨC</Typography>
        </Grid>

        <Grid item xs={2}>
          <IconButton className={status} onClick={handleClickIcon}>
            <HighlightOffIcon   fontSize="large"  />  
            </IconButton>
          </Grid>

      </Grid>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h3>Email</h3>
            <TextField
              defaultValue="DucPDH@gmail.com"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <h3>Gender</h3>
            <TextField
              defaultValue="Male"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            /></Grid>
          <Grid item xs={3}><h3>Phone</h3>
            <TextField
              defaultValue="076891458"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            /></Grid>
          <Grid item xs={3}><h3>Status</h3>
            <TextField
              defaultValue="Active"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Follower</h3>
            <TextField
              defaultValue="100"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Following</h3>
            <TextField
              defaultValue="320"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Total Like</h3>
            <TextField
              defaultValue="463"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Total Comments</h3>
            <TextField
              defaultValue="390"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

          </Grid>
        </Grid>
      </div>
      <div>
        <Grid item xs={2}><h3>Total Post:11</h3></Grid>
      </div>

      <Grid container spacing={1}>
        {getData(classes)}
      </Grid>


    </Fragment>
  );
}



function userPost(value,classes) {
  return (
    <Grid item xs={3} key={value}>
      <Paper className={classes.pic}></Paper>
    </Grid>

  );
}
function getData(classes) {
  let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => userPost(value,classes));
  return a;
}


async function getUserData() {
  e.preventDefault();
  let url = window.location.href;
  let username = url.split("/");
  let endpoint = '/user/' + username[2];
  const user = await get(endpoint, {}, {});
  return user;
}