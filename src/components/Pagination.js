import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                className={`mr-2 px-4 py-2 rounded-md ${isFirstPage ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'
                    }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFirstPage}
            >
                Previous
            </button>
            <button
                className={`ml-2 px-4 py-2 rounded-md ${isLastPage ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'
                    }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
