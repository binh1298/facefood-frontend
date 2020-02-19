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
import '../../pages/ListUser/ListUser.css';
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

function searchBar() {
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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function userTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div id="listUser">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell><span>Username</span></TableCell>
              <TableCell><span>Fullname</span></TableCell>
              <TableCell><span>Follower</span></TableCell>
              <TableCell><span>Following</span></TableCell>
              <TableCell><span>Post</span></TableCell>
              <TableCell><span>Total Likes</span></TableCell>
              <TableCell><span>Total Comments</span></TableCell>
              <TableCell><span>Role</span></TableCell>
              <TableCell><span>Action</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell><Button onClick={getData}>get Data</Button></TableCell></TableRow>
            {/*stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>{getData()}*/}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={5}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              >

              </TablePagination>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}


function userRow(user) {
  const classes = useStyles();
  let actionButton;
  if (user.isDeleted == true) {
    actionButton = <Button variant="contained" color="primary">UNBAN</Button>;
  } else {
    actionButton = <Button variant="contained" color="secondary" >BAN</Button>;
  }
  let url = "/users/" + user.username;
  return (
    <TableRow hover className={classes.tableRow}>
      <TableCell><Link to={url}>{user.fullname}</Link></TableCell>
      <TableCell><span>{user.username}</span></TableCell>
      <TableCell><span>{user.Follower}</span></TableCell>
      <TableCell><span>{user.Post}</span></TableCell>
      <TableCell><span>{user.TotalLikes}</span></TableCell>
      <TableCell><span>{user.TotalComments}</span></TableCell>
      <TableCell><span>{user.roleId}</span></TableCell>
      <TableCell>
        {actionButton}
      </TableCell>
    </TableRow>
  );
}

export default function ListUser() {
  return (
    <section>
      <br />
      {searchBar()}
      <br />
      {userTable()}
    </section>
  ); n
}

async function getData(e) {
  e.preventDefault();
  const userlist = await get('/user/', {}, {});
  const userComponent = userlist.data.message.map((user) => userRow(user));
  console.log(userComponent);
  //return userComponent;
}
