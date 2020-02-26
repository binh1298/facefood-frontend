import { Button, Link, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, TableFooter, TablePagination } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { get } from '../../utils/ApiCaller';
import EnhancedTableHead from '../../components/EnhanceTableHead';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '5px'
  },
  tableHeadRow: {
    backgroundColor:theme.table.background.main,

    "&  > *": {
      fontWeight: 'bold',
      color:  theme.table.row.head,
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

const headCells = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
  { id: 'step', numeric: true, disablePadding: false, label: 'Step' },
  { id: 'like', numeric: true, disablePadding: false, label: 'Like' },
  { id: 'comment', numeric: true, disablePadding: false, label: 'Commentt' },
  { id: 'creator', numeric: true, disablePadding: false, label: 'Creator' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
              <TableRow style={{ height: 68.89 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
        </TableBody>
        <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, ,20]}
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
