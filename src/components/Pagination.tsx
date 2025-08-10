'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPaginationItems = () => {
    const siblingCount = 1;
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
    
    return range(1, totalPages);
  };

  const pages = getPaginationItems();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const buttonClass = "px-3 py-2 rounded-lg transition text-sm font-medium bg-white hover:bg-gray-100 text-gray-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex justify-center items-center mt-10 mb-10 space-x-1">
      <button onClick={() => onPageChange(1)} disabled={isFirstPage} className={buttonClass}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={isFirstPage} className={buttonClass}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return <span key={index} className="px-2 py-2 text-gray-500">...</span>;
        }

        return (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            disabled={page === currentPage}
            className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
              page === currentPage
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={isLastPage} className={buttonClass}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={isLastPage} className={buttonClass}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}