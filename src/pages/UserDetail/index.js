import { Container, makeStyles, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { get,put} from '../../utils/ApiCaller';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10px',
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
  const user = { username: "", email: "", fullname: "", gender: "male", phone: 0, follower: 0, following: 0, posts: 0, like: 0, comments: 0, roleId: 1, isDelete: false };
  const classes = useStyles();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    let url = window.location.href;
    let username = url.split("/");
    let endpoint = '/users/' + username[4];
    get(endpoint, {}, {})
      .then(user => {
        const userComponent = user.data.message;
        setUserData(userComponent);
        console.log(userData);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);


  function handleClickIcon() {

  }
  const status = "Active";
  const action = <Typography className={classes.banButton}>Ban</Typography>;
  if (userData.isDelete === true) {
    action = <Typography className={classes.activatedButton}>Activated</Typography>;
    status = "Banned";
  }


  return (
    <Container className={classes.root}>
      <Grid container spacing={1} className={classes.containerName}>
        <Grid item xs={2} className={classes.typoName} >
          <Typography>{userData.fullname}</Typography>
        </Grid>
        <Grid item xs={9}>
          <IconButton onClick={handleClickIcon}>
            {action}
          </IconButton>
        </Grid>
        <Grid item xs={1} style={{float:"right"}}>
          <Link to="/users">
          <IconButton onClick={handleClickIcon}>
         <ArrowBackIcon/>
          </IconButton>
          </Link>
        </Grid>
      </Grid>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h3>Email</h3>
            <TextField
              value={userData.email}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <h3>Gender</h3>
            <TextField
              value={userData.gender}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            /></Grid>
          <Grid item xs={3}><h3>Phone</h3>
            <TextField
              value={userData.phone}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            /></Grid>
          <Grid item xs={3}><h3>Status</h3>
            <TextField
              value={status}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Follower</h3>
            <TextField
              value={userData.follower}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Following</h3>
            <TextField
              value={userData.following}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Total Like</h3>
            <TextField
              value={userData.like}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}><h3>Total Comments</h3>
            <TextField
              value={userData.comments}
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
function getData(classes) {
  let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => userPost(value, classes));
  return a;
}



