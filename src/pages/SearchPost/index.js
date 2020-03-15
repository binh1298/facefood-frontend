import React, { useState } from 'react';
import SearchBar from './SearchBar';
import PostTable from './PostTable';
import { Container } from '@material-ui/core';

export default function Posts() {
  const [postData, setPostData] = useState([]);

  return (
    <Container>
      <SearchBar postData={postData} setPostData={setPostData}></SearchBar>
      <PostTable postData={postData} setPostData={setPostData}></PostTable>
    </Container>
  );
}
