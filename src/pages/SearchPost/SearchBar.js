import React, { useState, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme.js'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { get } from '../../utils/ApiCaller';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '5px'
    },
    tableHead: {
        backgroundColor: '#2A272A',
        "& span": {
            fontWeight: "bold",
            color: "#C6C6C6",
        }
    },
    Link: {
        fontWeight: "bold",
    },
    tableRow: {
        "& span": {
            fontWeight: "bold",
            fontStyle: 'italic',
        },
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
              <Grid item > <AccountCircle /></Grid><Grid item xs={4}><TextField
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
                  <Button variant="contained" disableElevation>Search</Button>
              </Grid>

          </Grid>

      </Fragment>
  );

}
