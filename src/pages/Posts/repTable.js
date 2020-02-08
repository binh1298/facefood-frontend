import React, { Component } from 'react'
import { TextField, Typography, FormControl, InputLabel, Grid, Button, Table, TableHead, TableRow, TableCell, TableBody, Link } from '@material-ui/core'

export default class RepTable extends Component {
  constructor(props) {
    super(props),
      this.handleChange = this.handleChange.bind(this);
    this.state = {
      'item': '',
    }
  }
  async componentDidMount() {
    // ???
  }
  async componentDidUpdate() {
    const text = this.props.text;
    const str = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
    await fetch(str + text)
      .then(response => response.json())
      .then((response) => this.setState(
        { item: response }
      ))
  }
  handleChange(e) {
    this.props.onTextChange(e.target.value);

  }
  render() {
    return (
      this.state.item ?
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>category</TableCell>
              <TableCell>Step</TableCell>
              <TableCell>Like</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Creator</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.item.meals.map(x => {
              return (
                <TableRow key={x.idMeal}>
                  <TableCell>
                    <Link>{x.strMeal}</Link>
                  </TableCell>
                  <TableCell>
                    {x.strCategory}
                  </TableCell>
                  <TableCell>
                    3
            </TableCell>
                  <TableCell>
                    4
            </TableCell>
                  <TableCell>
                    5
            </TableCell>
                  <TableCell>
                    6
            </TableCell>
                  <TableCell>
                    <Button>
                      REMOVE
              </Button>
                  </TableCell>
                </TableRow>
              );

            })}

          </TableBody>
        </Table>
        :
        <div>nothing</div>
    )
  }
}
