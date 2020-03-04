import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CardActions, makeStyles, CardMedia } from '@material-ui/core';
import { get } from '../../utils/ApiCaller';
import { StepCard } from './StepCard';

const useStyles = makeStyles(theme => ({
  containerName: {
    "& p": {
      fontWeight: 'bold',
    },
  },
}));


export default function PostDetail() {
  
  const classes = useStyles();

  const defaultPostData = {
    postId: "",
        postName: "asdf",
        description: "asdf",
        timeNeeded: 60,
        isDeleted: false,
        username: "asdf",
        categoryId: 1,
        createdAt: "00",
        updatedAt: "00",
        likeCount: 4,
        commentCount: 4,
        stepCount: 5,
        imageUrl: "",
  }

  const [postData, setPostData] = useState(defaultPostData)

  useEffect(() => {
    let url = window.location.href;
    let postId = url.split("/");
    let endpoint = '/posts/' + postId[postId.length - 1];
    get(endpoint, {}, {})
      .then(post => {
        const postComp = post.data.message;
        setPostData(postComp);
        console.log(post.data.message);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);


  return (
    <Card >
      <CardContent>
        <Typography>
          text: {postData.postId}
        </Typography>
        <CardMedia className={classes.media}
          image={postData.img}
          title={postData.name}
        />
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
                </Typography>
        <Typography variant="h5" component="h2">
          benevolent
                </Typography>
        <Typography color="textSecondary">
          adjective
                </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
                  <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
