import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 border text-xs rounded transition-colors ${
          currentPage === 1
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
        }`}
      >
        上一页
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              isActive
                ? 'bg-primary text-white border border-primary'
                : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border text-xs rounded transition-colors ${
          currentPage === totalPages
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
        }`}
      >
        下一页
      </button>
    </div>
  );
};
