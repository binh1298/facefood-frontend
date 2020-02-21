import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme.js'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, TablePagination } from '@material-ui/core';
import { get } from '../../utils/ApiCaller';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: '15px',
        marginTop:'10px',
    },
    buttonSearch:{
        color:theme.button.background.text,
        backgroundColor:theme.button.background.main,
      },

}));


export default function SearchBar(props) {
  const classes = useStyles();
  const [txtName, setTxtName] = useState('');
  const [txtCategory, setTxtCategory] = useState('');

  function handleNameChange(e){
      setTxtName(e.target.value);
  }

  function handleCategoryChange(e){
      setTxtCategory(e.target.value);
  }

  return (
      <Fragment>
          <Grid container spacing={2} alignItems="flex-end" className={classes.root} >
              <Grid item > <SearchRoundedIcon /></Grid><Grid item xs={4}><TextField
                  label="Search..."
                  fullWidth
                  value={txtName}
                  onChange={handleNameChange} /></Grid>
              <Grid item xs={2}>
                  <TextField
                  label="Category"
                  fullWidth
                  value={txtCategory}
                  onChange={handleCategoryChange}
                  />
              </Grid>
              <Grid item xs={2}>
                  <Button variant="contained" disableElevation className={classes.buttonSearch}>Search</Button>
              </Grid>

          </Grid>

      </Fragment>
  );

}
