import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  FormControl,
  InputLabel,
  NativeSelect,
  TablePagination
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
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
export default function searchBar(setCommentData) {
  const classes = useStyles();
  const [query, setQuery] = useState();
  const [isReported, setIsReported] = useState();
  const [roleId, setRoleId] = useState();
  function handleChangeTxtSearch(e) {
    setQuery(e.target.value);
  }
  function handleStatusChange(e) {
    e.preventDefault();
    setIsReported(e.target.value);
  }
  function handleSearchComment(e) {
    e.preventDefault();
    let search = {}
    if(query != null) search = {...search, query}
    if(isReported != null) search = {...search,  isReported}
    if(roleId != null) search = {...search, roleId}
    get(
      "/comments/?content="+query,
    )
      .then(commentList => {
        const commentComponent = commentList.data.message;
        setCommentData(commentComponent);
      })
      .catch(e => {
        console.log("Error at ListComment: " + e);
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
          <SearchRoundedIcon />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Search..."
            fullWidth
            value={query}
            onChange={handleChangeTxtSearch}
          />
        </Grid>
        <Grid item xs={1}>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <NativeSelect value={isReported} onChange={handleStatusChange}>
              <option value={null}></option>
              <option value={false}>Normal</option>
              <option value={true}>Reported</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            disableElevation
            className={classes.buttonSearch}
            onClick={handleSearchComment}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
