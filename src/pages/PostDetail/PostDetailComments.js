import { Container, Link, Typography } from "@material-ui/core";
import React from "react";

export default function PostDetailComments(props) {
  // let renderComment = props.comments.map((cmt) =>{
  //   <Typography><Link>{cmt.username} </Link>{cmt.content} asdfasdf </Typography>
  // })
  // return {renderComment}
  const comments = props.comments;
  
  const url = window.location.href;
  let userlink = url.split("/posts/");
  userlink = userlink[0] + "/users/";
  const a = comments.map(cmt => {
    return (
      <Typography key={cmt.commentId}>
        <Link href={"http://localhost:3000/users/" + cmt.username} color="primary" > {cmt.username}</Link>
        {" " + cmt.content}
      </Typography>
    )
  });
  return <Container >{a}</Container>;
}
