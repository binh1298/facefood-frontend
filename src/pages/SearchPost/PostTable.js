import { Button, Link, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableFooter, TablePagination } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { get } from '../../utils/ApiCaller';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '5px'
  },
  tableHead: {
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

const header = ["title", "category", "Step", "Like", "Comment", "Creator", "Action"]

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map(el => el[0]);
}

export default function PostTable(props) {

  const classes = useStyles();
  const [postData, setPostData] = useState([]);

  const listTitle = header.map((x) =>
    <TableCell key={x}><Typography>{x}</Typography></TableCell>
  );
  /// duc change
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, postData.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <Table>
        <TableHead >
          <TableRow className={classes.tableHead}>
            {listTitle}
          </TableRow>
        </TableHead>
        <TableBody>
        {stableSort(postData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => BodyContent(post))}
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
