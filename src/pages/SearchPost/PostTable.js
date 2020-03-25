import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnhancedTableHead from "../../components/EnhanceTableHead";
import { get, put } from "../../utils/ApiCaller";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "5px"
  },
  tableHeadRow: {
    backgroundColor: theme.table.background.main,

    "&  > *": {
      fontWeight: "bold",
      color: theme.table.row.head
    }
  },
  Link: {
    fontWeight: "bold"
  },
  tableRow: {
    "& td": {
      fontStyle: "italic",
      width: "156px"
    }
  }
}));

const headCells = [
  { id: "postName", label: "Title" },
  { id: "categoryName", label: "Category" },
  { id: "stepCount", label: "Step" },
  { id: "likeCount", label: "Like" },
  { id: "commentCount", label: "Comment" },
  { id: "username", label: "Creator" },
  { id: "isDeleted", label: "Action" }
];

export default function PostTable(props) {
  const classes = useStyles();
  const { postData, setPostData } = props;

  /// duc change
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, postData.length - page * rowsPerPage);

  const [txtName, setTxtName] = useState("");

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
  ////

  function refreshList() {
    get("/posts/", {}, {})
      .then(postList => {
        const postComponent = postList.data.message; // contain rendered table body with data
        setPostData(postComponent);
      })
      .catch(e => {
        console.log(e);
      });
  }
  useEffect(() => {
    refreshList();
  }, []);
  async function handleBanClick(e, id) {
    e.preventDefault();
    const endpoint = "/posts/" + id;
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
  function BodyContent(post) {
    let actionButton;
    const createBanHandler = id => event => {
      handleBanClick(event, id);
    };

    if (post.isDeleted) {
      actionButton = (
        <Button
          variant="contained"
          color="primary"
          onClick={createBanHandler(post.id)}
        >
          RESTORE
        </Button>
      );
    } else {
      actionButton = (
        <Button
          variant="contained"
          color="secondary"
          onClick={createBanHandler(post.id)}
        >
          DELETE
        </Button>
      );
    }
    let url = "/posts/" + post.id;
    return (
      <TableRow key={post.id} hover className={classes.tableRow}>
        <TableCell>
          <Link to={url}>{post.postName}</Link>
        </TableCell>
        <TableCell>{post.categoryName}</TableCell>
        <TableCell>{post.stepCount}</TableCell>
        <TableCell>{post.likeCount}</TableCell>
        <TableCell>{post.commentCount}</TableCell>
        <TableCell>{post.username}</TableCell>
        <TableCell>{actionButton}</TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <EnhancedTableHead
          classes={classes}
          headCells={headCells}
          onRequestSort={handleRequestSort}
          order={order}
          orderBy={orderBy}
        />
        <TableBody>
          {stableSort(postData, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(post => BodyContent(post))}
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
