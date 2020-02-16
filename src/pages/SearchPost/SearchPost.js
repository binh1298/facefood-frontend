import React, { useState } from 'react'
import SearchBar from './SearchBar';
import PostTable from './PostTable';
import { Container } from '@material-ui/core';

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


export function SearchPost(props) {
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    function handleSearchNameChange(e) {
        setSearchName(e.target.value);
    }

    function handleSearchCategoryChange(e) {
        setSearchCategory(e.target.value);
    }
    return (
        <Container>
            <SearchBar></SearchBar>
            <PostTable posts={list}></PostTable>
        </Container>
    );
}