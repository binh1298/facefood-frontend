import { Button, Table, TableBody, TableCell, TableHead, TableRow, Link } from '@material-ui/core';
import React from 'react';

const header = ["title", "category", "Step", "Like", "Comment", "Creator", "Action"]

export default function PostTable(props) {

  const listTitle = header.map((x) =>
    <TableCell key={x}>{x}</TableCell>
  );

  const listPost = props.posts.map((x) => {
    return (
      <TableRow key={x.title}>
        <TableCell><Link>{x.title}</Link></TableCell>
        <TableCell>{x.category}</TableCell>
        <TableCell>{x.step}</TableCell>
        <TableCell>{x.like}</TableCell>
        <TableCell>{x.comment}</TableCell>
        <TableCell>{x.creator}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary">Remove</Button>
        </TableCell>
      </TableRow>
    )
  });

  return (
    <Table>
      <TableHead color="primary">
        <TableRow>
          {listTitle}
        </TableRow>
      </TableHead>
      <TableBody>
        {listPost}
      </TableBody>
    </Table>

  );
}
