import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  makeStyles,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { get } from "../../utils/ApiCaller";
import { StepCard } from "./StepCard";
import PostDetailComments from "./PostDetailComments";
import PostDetailIngredient from "./PostDetailIngredient";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 70,
    marginLeft: 70,
    marginRight: 70,
    display: "flex",
    height: 600
  },
  details: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    height: 500
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "50%",
    height: "100%"
  },
  comments: {
    overflow: "auto",
    display: "flex",
    height: 200,
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

export default function PostDetail() {
  const classes = useStyles();

  const [postData, setPostData] = useState("");
  const [commentData, setCommentData] = useState(null);
  const [ingredientData, setIngredientData] = useState([]);

  useEffect(() => {
    let url = window.location.href;
    let postId = url.split("/");
    let endpointPost = "/posts/" + postId[postId.length - 1];
    let endpointCmt = "/comments/" + postId[postId.length - 1];
    let endpointIngredient = "/ingredients?postId=" + postId[postId.length - 1];
    get(endpointPost, {}, {})
      .then(post => {
        const postComp = post.data.message;
        setPostData(postComp);
      })
      .catch(e => {
        console.log(e);
      });

    get(endpointCmt, {}, {})
      .then(cmt => {
        const cmtComp = cmt.data.message;
        setCommentData(cmtComp);
      })
      .catch(e => {
        console.log(e);
      });

    get(endpointIngredient, {}, {})
      .then(ing => {
        const ingComp = ing.data.message;
        setIngredientData(ingComp);
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
          <Typography variant="h5">Ingredient</Typography>
          <Grid container>
            <PostDetailIngredient ingredients={ingredientData} />
          </Grid>
          <Box m={2} />
        </CardContent>
        <Container className={classes.comments}>
          <Grid container>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <Typography>
                {postData.likeCount} Likes | {postData.commentCount} Comments
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <>
                {commentData ? (
                  <PostDetailComments comments={commentData} />
                ) : (
                  <Typography>lulul loading</Typography>
                )}
              </>
            </Grid>
          </Grid>
        </Container>
      </div>
      {postData.steps ? (
        <StepCard className={classes.cover} steps={postData.steps} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Card>
  );
}
