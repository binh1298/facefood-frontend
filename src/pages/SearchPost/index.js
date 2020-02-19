import React from 'react';
import { SearchPost } from './SearchPost';
import { Button } from '@material-ui/core';
import { get } from '../../utils/ApiCaller';

export default function Posts() {

  async function getData(){
    const result =  await get("/post", {} , {});
    console.log(result.data.message);
  };
  return (
     <SearchPost />
  );
}
