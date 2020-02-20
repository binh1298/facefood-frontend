import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme.js'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, TablePagination } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '5px'
  },
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
        <Grid item > <AccountCircle /></Grid><Grid item xs={4}><TextField
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
          <Button variant="contained" disableElevation>Search</Button>
        </Grid>

      </Grid>

    </Fragment>
  );
}
