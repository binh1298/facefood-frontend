import React, { useState, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme.js'
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),

    },
  },
}));
// function handleSearch(txtSearch) {

// }

function searchBar() {
  const classes = useStyles;
  const [txtSearch, setTxtSearch] = useState('');

  async function handleChangeTxtSearch(e) {
    await setTxtSearch(e.target.value);
    // await handleSearch(txtSearch)
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <TextField label="Search..." value={txtSearch} onChange={handleChangeTxtSearch} />
      </Grid>
    </Fragment>
  );
}

function userTable() {
  return (
    <div id="listUser">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Follower</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Total Likes</TableCell>
              <TableCell>Total Comments</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getData()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


function userRow(user) {
  const classes = useStyles();
  let actionButton;
  if (user.Status == 'Banned') {
    actionButton = <Button variant="contained" color="primary">UNBAN</Button>;
  } else {
    actionButton = <Button variant="contained" color="secondary" >BAN</Button>;
  }
  return (
    <TableRow>
      <TableCell><a href="#">{user.Name}</a></TableCell>
      <TableCell>{user.UserName}</TableCell>
      <TableCell>{user.Follower}</TableCell>
      <TableCell>{user.Post}</TableCell>
      <TableCell>{user.TotalLikes}</TableCell>
      <TableCell>{user.TotalComments}</TableCell>
      <TableCell>{user.Role}</TableCell>
      <TableCell>
        {actionButton}
      </TableCell>
    </TableRow>
  );
}

export default function ListUser() {
  return (
    <section>
      {searchBar()}
      {userTable()}
    </section>
  );
}


function Data() {
  var user1 = { Name: "duc", UserName: "duc123", Follower: "20", Post: "1", TotalLikes: "1", TotalComments: "1", Role: "member", Status: "Banned" }
  var user2 = { Name: "binh", UserName: "binh6969", Follower: "50000", Post: "50", TotalLikes: "2000", TotalComments: "2501", Role: "member", Status: "Active" }
  var user3 = { Name: "tuan anh", UserName: "tuananhphicong15", Follower: "4500", Post: "700", TotalLikes: "105", TotalComments: "900", Role: "member", Status: "Active" }
  var user4 = { Name: "loc", UserName: "loku542", Follower: "50", Post: "600", TotalLikes: "90", TotalComments: "12", Role: "member", Status: "Active" }
  let listUser = [user1, user2, user3, user4];
  return listUser;
}

function getData(txtSearch) {
  let userList = Data();

  // userList.filter((user) => {
  //   user.toLowerCase().search(
  //     txtSearch.toLowerCase()) !== -1;
  // });

  const userComponents = userList.map((user) => userRow(user));
  return userComponents;
}
