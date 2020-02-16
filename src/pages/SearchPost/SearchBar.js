import React from 'react'
import { Toolbar, Typography, TextField, Grid, Button } from '@material-ui/core';


export default function SearchBar(props) {

  return (
    <Toolbar>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={1}>
          <Typography variant="h6">Search</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField size="small" variant="outlined" placeholder="Enter Post Name" fullWidth></TextField>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="secondary" fullWidth>OK</Button>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6">Category</Typography>
        </Grid>
        <Grid  item xs={3} >
          <TextField color="primary" size="small" variant="outlined" placeholder="fish, breakfast, ect."></TextField>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
