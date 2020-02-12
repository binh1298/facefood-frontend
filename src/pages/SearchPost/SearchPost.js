import React, { useState } from 'react'
import {Grid} from '@material-ui/core'

function SearchPost(props){
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    function handleSearchNameChange(e){
        setSearchName(e.target.value);
    }

    function handleSearchCategoryChange(e){
        setSearchCategory(e.target.value);
    }
    
}