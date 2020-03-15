import React from 'react';
import { get } from '../../utils/ApiCaller';
import { SearchPost } from './SearchPost';

export default function Posts() {

  async function getData(){
    const result =  await get("/posts", {} , {});
    console.log(result.data.message);
  };
  return (
     <SearchPost />
  );
}
