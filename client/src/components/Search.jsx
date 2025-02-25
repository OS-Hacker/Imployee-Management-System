import React from "react";

const Search = ({ setSearch, search, theme, setPage }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value); // Update the search term
    setPage(1); // Reset to the first page when searching
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className={`${
          theme
            ? "bg-black text-white border-gray-700"
            : "bg-white text-black border-gray-300"
        } outline-none border-2 pl-3 pr-10 py-1 w-70 rounded-3xl text-lg transition-all duration-300 focus:w-85 focus:border-purple-500`}
        aria-label="Search input"
      />
    </div>
  );
};

export default Search;
