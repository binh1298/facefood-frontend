import { Container, TablePagination } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EnhancedTableHead from '../../components/EnhanceTableHead';
import searchBar from '../../components/UserSearchBar/index.js';
import { get } from '../../utils/ApiCaller';


const useStyles = makeStyles(theme => ({
  root: {

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
      width:'156px',
    }
  },
}));

function userTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('fullname');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    /*
     chen code  vao day nay :v
    */
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
  }, []);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, userData.length - page * rowsPerPage);
  const headCells = [
    { id: 'fullname', numeric: false, disablePadding: true, label: 'Fullname' },
    { id: 'username', numeric: true, disablePadding: false, label: 'Username' },
    { id: 'follower', numeric: true, disablePadding: false, label: 'Follower' },
    { id: 'following', numeric: true, disablePadding: false, label: 'Following' },
    { id: 'totalPost', numeric: true, disablePadding: false, label: 'Total Post' },
    { id: 'totalLikes', numeric: true, disablePadding: false, label: 'Total Likes' },
    { id: 'totalComments', numeric: true, disablePadding: false, label: 'Total Comments' },
    { id: 'role', numeric: true, disablePadding: false, label: 'Role' },
    { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
  ];

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table >
         <EnhancedTableHead
         classes={classes}
         headCells={headCells}
         onRequestSort={handleRequestSort}
         order={order}
         orderBy={orderBy}
         />
          <TableBody className={classes.tableBody}>
            {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => userRow(user))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 68.89 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, , 20]}
                count={userData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
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
  let roleIdSpan = <span>Admin</span>;
  if (user.role_id == 1) {
    roleIdSpan = (
      <span>Member</span>
    );
  }

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
    <Container>

      {searchBar()}

      {userTable()}
    </Container >

  );
}
