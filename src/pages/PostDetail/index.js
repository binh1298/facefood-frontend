import { Box, Button, Card, CardContent, Container, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { get } from '../../utils/ApiCaller';
import { StepCard } from './StepCard';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 70,
    marginLeft: 70,
    marginRight: 70,
    display: 'flex',
    height: 600,
  },
  details: {
    width: "50%",
    display: 'flex',
    flexDirection: 'column',
    height: 500,
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '50%',
    height: '100%',
  },
  comments: {
    overflow: 'auto',
    display: 'flex',
    height: 200,
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

}));


export default function PostDetail() {

  const classes = useStyles();

  const [postData, setPostData] = useState('');

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
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>

          <Grid container>
            <Grid item xs={10}>
              <Typography component="h5" variant="h4">
                {postData.postName}
              </Typography>

            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" color="primary">
                Delete
              </Button>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" color="textSecondary">
            {postData.username}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Time: {postData.timeNeeded}' | Category: {postData.categoryId}
          </Typography>

          <Box m={2} />
          <Typography variant="h5">
            Ingredient
          </Typography>
          <Grid container>

            <Grid item xs={6}>
              <Typography>Chicken</Typography>
              <Typography>Parsley</Typography>
              <Typography>Sage</Typography>
              <Typography>Onion</Typography>
              <Typography>Garlic</Typography>
              <Typography>Flour</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography>1kg</Typography>
              <Typography>1kg</Typography>
              <Typography>2kg</Typography>
              <Typography>2kg</Typography>
              <Typography>3kg</Typography>
              <Typography>3kg</Typography>
            </Grid>
          </Grid>


          <Box m={2} />


        </CardContent>
        <Container className={classes.comments}>

          <Grid container>
            <Grid item xs={8}>
            </Grid>
            <Grid item xs={4}>
              <Typography  >
                {postData.likeCount} Likes | {postData.commentCount} Comments
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Taylor Swag
                </Link> Test content,l comment will go here
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Keanu Reeve
                </Link> Test content,this is a comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>
              <Typography>
                <Link href="http://localhost:3000/users/SpacePotato">
                  Harry Bottom
                </Link> Test content,this is another comment
              </Typography>

            </Grid>
          </Grid>



        </Container>
      </div>
      <StepCard
        className={classes.cover}
      />
    </Card>
  );
}
