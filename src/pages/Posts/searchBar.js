import React, { Component } from 'react'
import { TextField, Typography, FormControl, InputLabel, Grid, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import RepTable from './repTable';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'name': '',
      'category': '',
      'path': '',
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleNameChange(e) {
    this.setState(
      { name: e.target.value }
    );
  }

  handleCategoryChange(e) {
    this.setState(
      { category: e.target.value }
    );
  }
  handleSearchClick(e) {
    const search = this.state.name;
    this.setState({ path: search });
  }
  render() {
    const path = this.state.path;
    return (
      <>
        <FormControl fullWidth>
          <Grid container spacing={1}>
            <Grid item lg={7}>
              <TextField label="Search" value={this.state.name} onChange={this.handleNameChange} ></TextField>
            </Grid>
            <Grid item lg={2}>
              <Button onClick={this.handleSearchClick}>
                Search
              </Button>
            </Grid>
            <Grid item lg={3}>
              <TextField label="Category" fullWidth></TextField>
            </Grid>
          </Grid>
          <div>
            this is something:
            <RepTable text={path} />
          </div>
        </FormControl>
      </>
    )
  }
}
