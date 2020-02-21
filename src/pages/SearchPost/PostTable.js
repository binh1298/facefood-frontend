import { Button, Link, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { get } from '../../utils/ApiCaller';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '5px'
  },
  tableHead: {
    backgroundColor: '#212121',

    "& Typography": {
      fontWeight: 'bold',
      color: '#ffffff',

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
  headerCell: {
    color: 'fffdf9',
  }
}));

const header = ["title", "category", "Step", "Like", "Comment", "Creator", "Action"]

export default function PostTable(props) {

  const classes = useStyles();
  const [postData, setPostData] = useState([]);

  const listTitle = header.map((x) =>
    <TableCell key={x} style={{ color: '#FAFAFA', }}  ><Typography>{x}</Typography></TableCell>
  );

  useEffect(() => {
    get("/post/", {}, {})
      .then(postList => {
        const postComponent = postList.data.message.map(post => BodyContent(post)); // contain rendered table body with data
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
          <Button variant="contained">Remove</Button>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow >
            {listTitle}
          </TableRow>
        </TableHead>
        <TableBody>
          {postData}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
