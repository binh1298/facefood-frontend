import { Container, makeStyles, TextField, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { get, put } from '../../utils/ApiCaller';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,

  },
  pic: {
    width: 300,
    height: 350,
    backgroundColor: '#4B4A54',
  },
  containerName: {
    "& p": {
      fontWeight: 'bold',
    },
  },
  typoName: {
    "& p": {
      fontSize: '25px',
      fontWeight: 'bold',
    },
  },
  banButton: {
    color: theme.palette.secondary.main,
  },
  activatedButton: {
    color: theme.palette.secondary.side,
  },
}));

export default function UserDetail() {
  const user = { username: "", email: "", fullname: "", gender: "male", phone: 0, follower: 0, following: 0, posts: 0, like: 0, comments: 0, roleId: 1, isDelete: false,posts:[1,2,3,4] };
  const classes = useStyles();
  const [userData, setUserData] = useState(user);
  const [postsData, setPostData] = useState();
  useEffect(() => {
    let url = window.location.href;
    let username = url.split("/");
    let endpoint = '/users/' + username[4];
    get(endpoint, {}, {})
      .then(user => {
        const userComponent = user.data.message;
        setUserData(userComponent);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  function getData(classes) {
    let a = userData.post.map((value) => userPost(value, classes));
    return a;
  }

  function handleClickIcon() {

  }
  const status = "Active";
  const action = <Typography>Ban</Typography>;
  if (userData.isDelete === true) {
    action = <Typography >Activated</Typography>;
    status = "Banned";
  }


  return (
    <Container className={classes.root} >
      <Grid container spacing={1} className={classes.containerName}>
        <Grid item xs={7} className={classes.typoName} >
          <Typography variant="h3">{userData.fullname}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Button onClick={handleClickIcon} size="large" variant="outlined" color="primary">
            {action}
          </Button>
        </Grid>
      </Grid>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h3>Email</h3>
            <Typography>
              {userData.email}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <h3>Gender</h3>
            <Typography>
              {userData.gender}
            </Typography>
          </Grid>
          <Grid item xs={3}><h3>Phone</h3>
            <Typography>
              {userData.phone}
            </Typography>
          </Grid>
          <Grid item xs={3}><h3>Status</h3>
            <Typography>
              {status}
            </Typography>
          </Grid>
          <Grid item xs={3}><h3>Follower</h3>
            <Typography>
              {userData.follower}
            </Typography>
          </Grid>
          <Grid item xs={3}><h3>Following</h3>
            <Typography>
              {userData.following}
            </Typography>
          </Grid>
          <Grid item xs={3}><h3>Total Like</h3>
            <Typography>
              {userData.like}
            </Typography>
          </Grid>
          <Grid item xs={3}><h3>Total Comments</h3>
            <Typography>
              {userData.comments}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid item xs={2}><h3>Total Post:11</h3></Grid>
      </div>

      <Grid container spacing={1}>
        {getData}
      </Grid>


    </Container>
  );
}

function userPost(value, classes) {
  return (
    <Grid item xs={3} key={value}>
      <Paper className={classes.pic}></Paper>
    </Grid>

  );
}
