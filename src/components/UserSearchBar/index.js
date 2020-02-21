import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, TablePagination } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '15px',
    marginTop:'10px',
  },
  buttonSearch:{
    color:theme.button.background.text,
    backgroundColor:theme.button.background.main,
  }
}));
export default function searchBar() {
  const classes = useStyles();
  const [txtSearch, setTxtSearch] = useState('');
  const [isDelete, setIsDelete] = useState("");
  const [role, setRole] = useState("");
  function handleChangeTxtSearch(e) {
    setTxtSearch(e.target.value);
  }
  function handleStatusChange(e) {
    e.preventDefault();
    setIsDelete(e.target.value);
  }
  function handleRoleChange(e) {
    e.preventDefault();
    setRole(e.target.value);
  }

  return (
    <Fragment>
      <Grid container spacing={2} alignItems="flex-end" className={classes.root} >
        <Grid item ><SearchRoundedIcon/></Grid><Grid item xs={4}><TextField
          label="Search..."
          fullWidth
          value={txtSearch}
          onChange={handleChangeTxtSearch} /></Grid>
        <Grid item xs={1}>
          <FormControl >
            <InputLabel>Status</InputLabel>
            <NativeSelect
              value={isDelete}
              onChange={handleStatusChange}
            >
              <option value=""></option>
              <option value={false}>Active</option>
              <option value={true}>Banned</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl >
            <InputLabel>Role</InputLabel>
            <NativeSelect
              value={role}
              onChange={handleRoleChange}
            >
              <option value=""></option>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" disableElevation className={classes.buttonSearch}>Search</Button>
        </Grid>

      </Grid>

    </Fragment>
  );
}
