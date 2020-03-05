import React, { useState } from 'react';
import { Typography, Link } from '@material-ui/core';



export default function PostDetailComments(props) {

  console.log(props.comments);
  // let renderComment = props.comments.map((cmt) =>{
  //   <Typography><Link>{cmt.username} </Link>{cmt.content} asdfasdf </Typography>
  // })
  // return {renderComment}
  const comments = props.comments;
  const a = comments.map((cmt) => {
    <div>{cmt.ff} this is a comment</div>
  })
  return (
    <div>{a}fff</div>
  )
}
