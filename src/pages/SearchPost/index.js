import React from 'react'
import SearchBar from './SearchBar';
import PostTable from './PostTable';


const list = [
  {
    title: "name a",
    category: "title a",
    step: "step a",
    like: "10",
    comment: "comment a",
    creator: "post a",
    isBanned: true,
  },
  {
    title: "name b",
    category: "title b",
    step: "step b",
    like: "10",
    comment: "comment b",
    creator: "post b",
    isBanned: true,
  },
  {
    title: "name c",
    category: "title c",
    step: "step c",
    like: "10",
    comment: "comment c",
    creator: "post c",
    isBanned: false,
  }
]

export default function Posts() {
  return (
    <>
    <SearchBar></SearchBar>
    <PostTable posts={list}></PostTable>
    </>
  );
}
