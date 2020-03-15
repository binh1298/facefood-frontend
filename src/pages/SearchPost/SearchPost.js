import { Container } from "@material-ui/core";
import React, { useState } from "react";
import PostTable from "./PostTable";
import SearchBar from "./SearchBar";

export function SearchPost(props) {
  const [postData, setPostData] = useState([]);

  return (
    <Container>
      <SearchBar postData={postData} setPostData={setPostData}></SearchBar>
      <PostTable postData={postData} setPostData={setPostData}></PostTable>
    </Container>
  );
}
