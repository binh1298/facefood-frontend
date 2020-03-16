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
export default function searchBar(setUserData) {
  const classes = useStyles();
  const [query, setQuery] = useState();
  const [isDeleted, setIsDeleted] = useState();
  const [roleId, setRoleId] = useState();
  function handleChangeTxtSearch(e) {
    setQuery(e.target.value);
  }
  function handleStatusChange(e) {
    e.preventDefault();
    setIsDeleted(e.target.value);
  }
  function handleRoleChange(e) {
    e.preventDefault();
    setRoleId(e.target.value);
  }

  function handleSearchUser(e) {
    e.preventDefault();
    let search = {}
    if(query != null) search = {...search, query}
    if(isDeleted != null) search = {...search, isDeleted}
    if(roleId != null) search = {...search, roleId}
    get(
      "/users/",
      search,
      {}
    )
      .then(userlist => {
        const userComponent = userlist.data.message;
        setUserData(userComponent);
      })
      .catch(e => {
        console.log("Error at ListUser: " + e);
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
            <NativeSelect value={isDeleted} onChange={handleStatusChange}>
              <option value={null}></option>
              <option value={false}>Active</option>
              <option value={true}>Banned</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl>
            <InputLabel>Role</InputLabel>
            <NativeSelect value={roleId} onChange={handleRoleChange}>
              <option value={null}></option>
              <option value="2">Member</option>
              <option value="1">Admin</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            disableElevation
            className={classes.buttonSearch}
            onClick={handleSearchUser}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
