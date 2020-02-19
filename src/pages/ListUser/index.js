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
import { Grid, FormControl, InputLabel, NativeSelect, TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { get } from '../../utils/ApiCaller';
import '../../pages/ListUser/ListUser.css';
import searchBar from '../../components/SearchBar/index.js';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '5px'
  },
  tableHead: {
    backgroundColor: theme.palette.primary,
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
     
            {/*stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>{}*/}
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

export default function ListUser() {
  return (
    <section>
      <br />
      {searchBar()}
      <br />
      {userTable()}
    </section>
  );
}


async function getListOfUser() {
  const userlist = await get('/user/', {}, {});
  const userComponent = userlist.data.message;
  return userComponent;
}
