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
import { get, put } from '../../utils/ApiCaller';
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
  const [action, setAction] = useState('BAN');
  const [status, setStatus] = useState('Active');
  useEffect(() => {
   refreshList()
  }, []);
function refreshList() {
  let url = window.location.href;
  let username = url.split("/");
  let endpoint = '/users/' + username[username.length - 1];
  get(endpoint, {}, {})
    .then(user => {
      const userComponent = user.data.message;
      setUserData(userComponent);
      setAction(userComponent.isDeleted?'UNBAN':'BAN');
      setStatus(userComponent.isDeleted?'Banned':'Active');
      console.log(userComponent);
    })
    .catch(e => {
      console.log(e);
    });
  }
  async function handleBanClick(e, username) {
    e.preventDefault();
    const endpoint = "/users/" + username;
    try {
      const res = await put(endpoint, {}, {});
      if (res.data.success === false) {
        console.log("Error at ", res.data.error);
      } else {
        refreshList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createBanHandler = id => event => {
    handleBanClick(event, id);
  };
 

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
            onClick={createBanHandler(userData.username)}
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
          <InfoGrid label="Total Likes" value={userData.totalLikes == null ? 0 : userData.totalLikes} />
          <InfoGrid label="Total Comments" value={userData.totalComments == null ? 0 : userData.totalComments} />
        </Grid>
      </div>
      <div>
        <Grid item xs={2}><h3>Total Post:{userData.posts == null ? 0 : userData.posts.count}</h3></Grid>
      </div>
      <GridList cellHeight={400} cols={4}>
        {userData.posts == null ? '' : userData.posts.map((post) => userPost(post, classes))}
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




