import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function CustomPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className
}: CustomPaginationProps) {
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

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current page
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn("flex flex-col items-center mt-12 mb-8 space-y-4", className)}>
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300",
            currentPage === 1
              ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600 border border-gray-400"
              : "bg-gradient-to-r from-[#DBBB90] to-[#C2A17B] hover:from-[#C2A17B] hover:to-[#B8956A] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
          )}
        >
          <ChevronLeft /> <span className="hidden sm:block">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {/* Show first page and ellipsis if needed */}
          {currentPage > 3 && totalPages > 5 && (
            <>
              <button
                onClick={() => handlePageClick(1)}
                aria-current={currentPage === 1 ? "page" : undefined}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 bg-white/90 border border-[#DBBB90]/30 text-gray-700 hover:border-[#DBBB90]/50 hover:bg-white shadow-sm hover:shadow-md"
              >
                1
              </button>
              {currentPage > 4 && (
                <span className="px-2 py-2 text-gray-400">
                  ...
                </span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page, index) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                page === currentPage
                  ? "bg-gradient-to-r from-[#DBBB90] to-[#C2A17B] text-white shadow-lg border-0"
                  : "bg-white/90 border border-[#DBBB90]/30 text-gray-700 hover:border-[#DBBB90]/50 hover:bg-white shadow-sm hover:shadow-md"
              )}
            >
              {page}
            </button>
          ))}

          {/* Show last page and ellipsis if needed */}
          {currentPage < totalPages - 2 && totalPages > 5 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className="px-2 py-2 text-gray-400">
                  ...
                </span>
              )}
              <button
                onClick={() => handlePageClick(totalPages)}
                aria-current={currentPage === totalPages ? "page" : undefined}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 bg-white/90 border border-[#DBBB90]/30 text-gray-700 hover:border-[#DBBB90]/50 hover:bg-white shadow-sm hover:shadow-md"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300",
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600 border border-gray-400"
              : "bg-gradient-to-r from-[#DBBB90] to-[#C2A17B] hover:from-[#C2A17B] hover:to-[#B8956A] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
          )}
        >
          <span className="hidden sm:block">Next</span> <ChevronRight />
        </button>
      </div>

      {/* Results Info */}
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} properties
      </div>
    </div>
  );
}
