import { Box, Button, Card, CardContent, Container, Grid, makeStyles, Typography, Paper, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { get, put } from "../../utils/ApiCaller";
import PostDetailComments from "./PostDetailComments";
import PostDetailIngredient from "./PostDetailIngredient";
import { StepCard } from "./StepCard";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 70,
    marginLeft: 70,
    marginRight: 70,
    display: "flex",
    height: '100%',
  },
  details: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    height: 500,
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "50%",
    height: "100%"
  },
  comments: {
    display: "flex",
    height: 200,
  }
}));

export default function PostDetail() {
  const classes = useStyles();

  const [postData, setPostData] = useState("");
  const [commentData, setCommentData] = useState(null);
  const [ingredientData, setIngredientData] = useState([]);
  const [action, setAction] = useState('Delete');
  function refreshList() {
    let url = window.location.href;
    let postId = url.split("/");
    let endpointPost = "/posts/" + postId[postId.length - 1];
    let endpointCmt = "/comments/" + postId[postId.length - 1];
    let endpointIngredient = "/ingredients?postId=" + postId[postId.length - 1];
    get(endpointPost, {}, {})
      .then(post => {
        const postComp = post.data.message;
        setPostData(postComp);
        setAction(postComp.isDeleted?'Restore':'Delete');
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
  }
  useEffect(() => {
    refreshList()
  }, []);
  async function handleDeleteClick(e, id) {
    e.preventDefault();
    const endpoint = "/posts/" + id;
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

  const createDeleteHandler = id => event => {
    handleDeleteClick(event, id);
  };

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
              <Button
                variant="contained"
                color={action == 'Delete' ? "secondary" : "primary"}
                onClick={createDeleteHandler(postData.id)}
              >
                {action}
              </Button>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" color="textSecondary">
            {postData.username}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Time: {postData.timeNeeded}' | Category: {postData.categoryName}
          </Typography>
          <Divider />
          <Box m={2} />
          <Typography variant="h5">Ingredient</Typography>
          <Grid container>
            <PostDetailIngredient ingredients={ingredientData} />
          </Grid>
          <Box m={2} />
        </CardContent>
        <Divider />
        <Box m={2} className={classes.comments}>
          <Grid container alignItems='stretch'>
            <Grid item>
              <Typography>
                {postData.likeCount} Likes | {postData.commentCount} Comments
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {commentData ? (
                <PostDetailComments comments={commentData} />
              ) : (
                  <Typography>Loading...</Typography>
                )}
            </Grid>
          </Grid>
        </Box>
      </div>
      {postData.steps ? (
        <StepCard className={classes.cover} steps={postData.steps} />
      ) : (
          <Typography>Loading...</Typography>
        )}
    </Card>
  );
}
