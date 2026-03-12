import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

function SearchBar(props) {
    const { city, onCityChange } = props;
    const [inputValue, setInputValue] = useState(city);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onCityChange(inputValue);
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input 
                className="input"
                type="text" 
                id="form-input"
                placeholder="Enter city" 
                value={inputValue} 
                onChange={(e) => handleInputChange(e)} 
            />
            <button className="button" type="submit">Search</button>
        </form>
    );
}

SearchBar.propTypes = {
    city: PropTypes.string,
    onCityChange: PropTypes.func.isRequired
};

export default SearchBar;