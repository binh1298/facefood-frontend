import { Button, Link, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import EnhancedTableHead from '../../components/EnhanceTableHead';
import { get } from '../../utils/ApiCaller';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '5px'
  },
  tableHeadRow: {
    backgroundColor: theme.table.background.main,

    "&  > *": {
      fontWeight: 'bold',
      color: theme.table.row.head,
    }
  },
  Link: {
    fontWeight: "bold",
  },
  tableRow: {
    "& td": {
      fontStyle: 'italic',
      width: '156px',
    },
  },
}));

const headCells = [
  { id: 'title', label: 'Title' },
  { id: 'category', label: 'Category' },
  { id: 'step', label: 'Step' },
  { id: 'like', label: 'Like' },
  { id: 'comment', label: 'Commentt' },
  { id: 'creator', label: 'Creator' },
  { id: 'action', label: 'Action' },
];

export default function PostTable(props) {

  const classes = useStyles();
  const [postData, setPostData] = useState([]);

  /// duc change
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, postData.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  ////
  useEffect(() => {
    get("/post/", {}, {})
      .then(postList => {
        const postComponent = postList.data.message;// contain rendered table body with data
        setPostData(postComponent);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  function BodyContent(post) {
    return (
      <TableRow key={post.post_id} hover className={classes.tableRow}>
        <TableCell><Link to={'post/' + post.post_name}>{post.post_name}</Link></TableCell>
        <TableCell>{post.post_name}</TableCell>
        <TableCell>{post.post_name}</TableCell>
        <TableCell>{post.post_name}</TableCell>
        <TableCell>{post.post_name}</TableCell>
        <TableCell>{post.post_name}</TableCell>
        <TableCell>
          <Button variant="contained" color="secondary">Remove</Button>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table >
        <EnhancedTableHead
          classes={classes}
          headCells={headCells}
          onRequestSort={handleRequestSort}
          order={order}
          orderBy={orderBy}
        />
        <TableBody>
          {postData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => BodyContent(post))}
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
              count={postData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
