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
import { get, put } from '../../utils/ApiCaller';

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
      fontStyle: 'italic',
      width: '156px',
    }
  },
}));

async function handleBanClick(e, username) {
  e.preventDefault();
  const endpoint = "/user/" + username;
  try {
    const res = await put(
      endpoint,
      {},
      {},
    )
    if (res.data.success === false) {
      console.log(res.data.error);
    } else {
        // t chưa làm cái reload nhé
    }
  } catch (error) {
    console.log(error);
  }
}


function userTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullname');

// 
const [searchKeyword,setSearchKeyword] =  useState();
const [sortFullName,setSortFullName] =  useState();
const [sortUsername,setSortUsername] =  useState();
const [sortFollower,setSortFollower] =  useState();
const [sortFollowing,setSortFollowing] =  useState();
const [sortPosts,setSortPosts] =  useState();
const [sortLikes,setSortLikes] =  useState();
const [sortComments,setSortComments] =  useState();
const [sortRole,setSortRole] =  useState();
const [sortAction,setSortAction] =  useState();
const [filterStatus,setFilterStatus] =  useState();
const [filterRole,setFilterRole] =  useState();
//
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, id) => {
    /*
     chen code  vao day nay :v
    */
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };


  async function handleSortClick(e,order,orderBy) {
    e.preventDefault();
    try {
      const res = await get(
        endpoint,
        {order,orderBy},
        {},
      )
      if (res.data.success === false) {
        console.log(res.data.error);
      } else {
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get("/users/", {}, {})
      .then(userlist => {
        const userComponent = userlist.data.message;
        setUserData(userComponent);
      })
      .catch(e => {
        console.log("Error at ListUser: "+ e);
      });
  }, []);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, userData.length - page * rowsPerPage);
  const headCells = [
    { id: 'fullname', label: 'Fullname' },
    { id: 'username', label: 'Username' },
    { id: 'follower', label: 'Follower' },
    { id: 'following', label: 'Following' },
    { id: 'totalPost', label: 'Posts' },
    { id: 'totalLikes', label: 'Likes' },
    { id: 'totalComments', label: 'Comments' },
    { id: 'role', label: 'Role' },
    { id: 'action', label: 'Action' },
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
              <TableRow style={{ height: 70 * emptyRows }}>
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
  const createBanHandler = id => event => {
    handleBanClick(event, id);
  };

  if (user.is_deleted == true) {
    actionButton = (
      <Button variant="contained" color="primary" onClick={createBanHandler(user.username)}>
        UNBAN
      </Button>
    );
  } else {
    actionButton = (
      <Button variant="contained" color="secondary" onClick={createBanHandler(user.username)}>
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
        {user.followerCount}
      </TableCell>
      <TableCell>
        {user.followingCount}
      </TableCell>
      <TableCell>
        {user.postCount}
      </TableCell>
      <TableCell>
        {user.likeCount}
      </TableCell>
      <TableCell>
        {user.commentCount}
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
