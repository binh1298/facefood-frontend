import { Container, TablePagination } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnhancedTableHead from "../../components/EnhanceTableHead";
import searchBar from "../../components/CommentSearchBar/index.js";
import { get, put } from "../../utils/ApiCaller";

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeadRow: {
    backgroundColor: theme.table.background.main,
    "& > *": {
      fontWeight: "bold",
      color: theme.table.row.head
    }
  },
  Link: {
    fontWeight: "bold"
  },
  tableBody: {
    "& td": {
      fontStyle: "italic",
      width: "156px"
    }
  }
}));

function commentTable(commentData, setCommentData) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fullname");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };
  ///-----------------------------------------
  function descendingComparator(a, b, orderBy) {
    const firstRow =
      typeof a[orderBy] == "string" ? a[orderBy].toLowerCase() : a[orderBy];
    const secondRow =
      typeof b[orderBy] == "string" ? b[orderBy].toLowerCase() : b[orderBy];
    if (secondRow < firstRow) {
      return -1;
    }
    if (secondRow > firstRow) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  ///-----------------------------------------

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    console.log("stab: ", stabilizedThis);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  function refreshList() {
    get("/comments/", {}, {})
      .then(commentList => {
        const CommentComponent = commentList.data.message;
        setCommentData(CommentComponent);
      })
      .catch(e => {
        console.log("Error at ListComment: " + e);
      });
  }
  useEffect(() => {
    refreshList();
  }, []);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, commentData.length - page * rowsPerPage);
  const headCells = [
    { id: "username", label: "Username" },
    { id: "createdAt", label: "Date created" },
    { id: "content", label: "Comment content" },
    { id: "isReported", label: "Status" },
    { id: "isDeleted", label: "Action" }
  ];

  async function handleDeleteClick(e, commentId) {
    e.preventDefault();
    const endpoint = "/comments/" + commentId+'/delete';
    try {
      const res = await put(endpoint, {}, {});
      if (res.data.success === false) {
        console.log("Error at ", res.data.error);
      } else {
        refreshList();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function commentRow(comment) {
    let actionButton;
    const createDeleteHandler = id => event => {
      handleDeleteClick(event, id);
    };

    if (comment.isDeleted) {
      actionButton = (
        <Button
          variant="contained"
          color="primary"
          onClick={createDeleteHandler(comment.id)}
        >
          Restore
        </Button>
      );
    } else {
      actionButton = (
        <Button
          variant="contained"
          color="secondary"
          onClick={createDeleteHandler(comment.id)}
        >
          Delete
        </Button>
      );
    }

    let url = "/users/" + comment.username;
    return (
      <TableRow hover key={comment.id}>
        <TableCell>
          <Link to={url}>{comment.username}</Link>
        </TableCell>
        <TableCell>{comment.createdAt}</TableCell>
        <TableCell>{comment.content}</TableCell>
        <TableCell>{comment.isReported?'Reported':'Normal'}</TableCell>
        <TableCell>{actionButton}</TableCell>
      </TableRow>
    );
  }
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <EnhancedTableHead
            classes={classes}
            headCells={headCells}
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
          />
          <TableBody className={classes.tableBody}>
            {stableSort(commentData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(comment => commentRow(comment))}
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
                count={commentData.length}
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

export default function ListComment() {
  const [userData, setUserData] = useState([]);

  return (
    <Container>
      {searchBar(setUserData)}
      {commentTable(userData, setUserData)}
    </Container>
  );
}
