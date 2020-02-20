import React, { useState, Fragment, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, InputLabel, NativeSelect, TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { get } from '../../utils/ApiCaller';
import searchBar from '../../components/UserSearchBar/index.js';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '5px'
  },
  tableHeadRow: {
    backgroundColor: theme.table.background.main,
    "& > *": {
      fontWeight: 'bold',
      color: theme.table.row.head,
    }
  },
  Link: {
    fontWeight: 'bold',
  },
  tableBody: {
    "& td": {
      fontWeight: 'bold',
      fontStyle: 'italic',
    }
  }
}));


function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map(el => el[0]);
}

function userTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    get("/user/", {}, {})
      .then(userlist => {
        const userComponent = userlist.data.message;
        setUserData(userComponent);
      })
      .catch(e => {
        console.log(e);
      });
  });
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, userData.length - page * rowsPerPage);
  return (
    <div id="listUser">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableHeadRow} >
              <TableCell>
                Fullname
              </TableCell>
              <TableCell>
                Username
              </TableCell>
              <TableCell>
                Follower
              </TableCell>
              <TableCell>
                Following
              </TableCell>
              <TableCell>
                Post
              </TableCell>
              <TableCell>
                Total Likes
              </TableCell>
              <TableCell>
                Total Comments
              </TableCell>
              <TableCell>
                Role
              </TableCell>
              <TableCell>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody  className={classes.tableBody}>

            {/*userData*/}
            {stableSort(userData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => userRow(user))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
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
  let actionButton;
  if (user.isDeleted == true) {
    actionButton = (
      <Button variant="contained" color="primary">
        UNBAN
      </Button>
    );
  } else {
    actionButton = (
      <Button variant="contained" color="secondary">
        BAN
      </Button>
    );
  }
  let roleIdSpan  = <span>Admin</span> ;
  if (user.role_id == 1) {
    roleIdSpan = (
     <span>Member</span>
    );}
 
  let url = "/users/" + user.username;
  return (
    <TableRow hover key={user.username}>
      <TableCell>
        <Link to={url}>{user.fullname}</Link>
      </TableCell>
      <TableCell> 
       {user.username}
      </TableCell>
      <TableCell>
       {user.follower}
      </TableCell>
      <TableCell>
       {user.following}
      </TableCell>
      <TableCell>
       {user.Post}
      </TableCell>
      <TableCell>
      {user.TotalLikes}
      </TableCell>
      <TableCell>
       {user.TotalComments}
      </TableCell>
      <TableCell>
        {roleIdSpan}
      </TableCell>
      <TableCell>{actionButton}</TableCell>
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
  );
}
