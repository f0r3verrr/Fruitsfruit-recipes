import React from 'react';
import './SearchAndFilter.css';

const SearchAndFilter = ({ searchQuery, onSearch, selectedFruit, onFilterChange, availableFruits }) => {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    onFilterChange(value);
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="Поиск рецептов..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="filter-box">
        <select
          value={selectedFruit}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">Все рецепты</option>
          {availableFruits.map((fruit) => (
            <option key={fruit} value={fruit}>{fruit}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;

