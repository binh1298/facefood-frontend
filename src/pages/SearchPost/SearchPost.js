import React, { useState } from 'react'
import SearchBar from './SearchBar';
import PostTable from './PostTable';
import { Container } from '@material-ui/core';



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
            <PostTable></PostTable>
        </Container>
    );
}