import React from "react";

const Pagination = ({ page, setPage, totalPages, data }) => {



  console.log(data)
  // If there are no users, don't render the pagination
  if (data.length === 0) return null;

  return (
    <div className="mt-3 flex items-center justify-center">
      {/* Previous Button */}
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
        className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800 mr-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`${
            page === pageNumber
              ? "bg-purple-800" // Active page
              : "bg-purple-700 hover:bg-purple-800" // Inactive page
          } text-white p-2 w-8 rounded ml-2 cursor-pointer`}
          aria-label={`Go to Page ${pageNumber}`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === totalPages}
        className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800 ml-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default React.memo(Pagination);
