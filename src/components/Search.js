import React, { useState } from "react";

const Search = ({search}) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    }
    

    const callSearchFunction = (e) => {
        e.preventDefault();
        search(searchValue);
        setSearchValue("");
    }

    return(
        <form className = "search">
            <input value = {searchValue} onChange={handleSearchInputChange} type="text" />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    )


}

export default Search;