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
  const [txtName, setTxtName] = useState("");
  const [txtCategory, setTxtCategory] = useState("");
  const { postData, setPostData } = props;

  function handleNameChange(e) {
    setTxtName(e.target.value);
  }

  function handleCategoryChange(e) {
    setTxtCategory(e.target.value);
  }

  function handlerSearchPost() {
    get(
      "/posts/",
      {
        postName: txtName,
        categoryName: txtCategory
      },
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
            value={txtName}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Category"
            fullWidth
            value={txtCategory}
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
