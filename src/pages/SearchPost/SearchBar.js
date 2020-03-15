import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import React, { Fragment, useState } from "react";
import { get } from "../../utils/ApiCaller";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "15px",
    marginTop: "10px"
  },
  buttonSearch: {
    color: theme.button.background.text,
    backgroundColor: theme.button.background.main
  }
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const [postName, setPostName] = useState("");
  const [categoryName, setTxtCategoryName] = useState("");
  const { postData, setPostData } = props;

  function handleNameChange(e) {
    setPostName(e.target.value);
  }

  function handleCategoryChange(e) {
    setTxtCategoryName(e.target.value);
  }

  function handlerSearchPost(e) {
    e.preventDefault();
    let search = {}
    if(postName != null && postName.length > 0) search = {...search, postName}
    if(categoryName != null && categoryName.length > 0) search = {...search, categoryName}
    get(
      "/posts/",
      search,
      {}
    )
      .then(postList => {
        const postComponent = postList.data.message; // contain rendered table body with data
        setPostData(postComponent);
      })
      .catch(e => {
        console.log(e);
      });
  }
  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        alignItems="flex-end"
        className={classes.root}
      >
        <Grid item>
          {" "}
          <SearchRoundedIcon />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Search..."
            fullWidth
            value={postName}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Category"
            fullWidth
            value={categoryName}
            onChange={handleCategoryChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            disableElevation
            className={classes.buttonSearch}
            onClick={handlerSearchPost}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
