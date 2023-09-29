import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit(e); // Call the search submit function when Enter is pressed
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search games"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
