import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfoGrid from '../../components/InfoGridComponent/InfoGrid';
import { get } from '../../utils/ApiCaller';
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
  icon: {
    color: theme.icon.primary.main,
  },
}));

export default function UserDetail() {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    let url = window.location.href;
    let username = url.split("/");
    let endpoint = '/users/' + username[username.length - 1];
    get(endpoint, {}, {})
      .then(user => {
        const userComponent = user.data.message;
        setUserData(userComponent);
        console.log(userComponent);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);



  function handleClickButton() {

  }
  const status = "Active";
  let action = 'BAN';
  if (userData.isDeleted === true) {
    action = 'UNBAN'
    status = "Banned";
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={1} className={classes.containerName}>
        <Grid item xs={3} className={classes.typoName} >
          <Typography>{userData.fullname}</Typography>
        </Grid>
        <Grid item xs={8}>
        <Button
            variant="contained"
            color={action=='BAN'?"secondary":"primary"}
            onClick={handleClickButton}
          >
            {action}
          </Button>
        </Grid>
      </Grid>
      <div>
        <Grid container spacing={2}>
          <InfoGrid label="Email" value={userData.email == null ? '' : userData.email} />
          <InfoGrid label="Status" value={status} />
          <InfoGrid label="Followers" value={userData.followerCount == null ? 0 : userData.followerCount} />
          <InfoGrid label="Followings" value={userData.followingCount == null ? 0 : userData.followingCount} />
          <InfoGrid label="Total Likes" value={userData.likeCount == null ? 0 : userData.likeCount} />
          <InfoGrid label="Total Comments" value={userData.commentCount == null ? 0 : userData.commentCount} />
        </Grid>
      </div>
      <div>
        <Grid item xs={2}><h3>Total Post:{userData.totalPosts == null ? 0 : userData.totalPosts.count}</h3></Grid>
      </div>
      <GridList cellHeight={400} cols={4}>
        {userData.totalPosts == null ? '' : userData.totalPosts.rows.map((post) => userPost(post, classes))}
      </GridList>
    </Container>
  );
}

function userPost(post, classes) {
  const urlToPost = "/posts/" + post.id;
  return (
    <GridListTile key={post.id}>
      <img src={post.imageUrl} alt={post.id} />
      <GridListTileBar
        title={post.postName}
        subtitle={<span>Time needed:{post.timeNeeded}'</span>}
        actionIcon={
          <Link to={urlToPost}>
            <IconButton aria-label={`info about ${post.postName}`} className={classes.icon}>
              <InfoIcon />
            </IconButton>
          </Link>
        }
      />
    </GridListTile>
  );
}




