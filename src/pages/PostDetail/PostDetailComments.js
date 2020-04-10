import { Container, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
export default function PostDetailComments(props) {
  
  const comments = props.comments;
  
  const url = window.location.href;
  let userlink = url.split("/posts/");
  userlink = userlink[0] + "/users/";
  const a = comments.map(cmt => {
    return (
      <Typography key={cmt.id}>
        <Link to={"/users/" + cmt.username} color="primary" > {cmt.username}</Link>
        {" " + cmt.content}
      </Typography>
    )
  });
  return <>{a}</>;
}
