import { Button, IconButton } from '@material-tailwind/react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  isTable: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange, isTable }) => {
  return (
    <>
      {!isTable ? (
        <div className="flex justify-end items-end gap-4 m-10">
          {currentPage > 1 && (
            <button
              disabled
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none bg-pink-500 active:bg-pink-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
              </svg>
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <div className="flex items-center gap-2" key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${page === currentPage ? 'bg-pink-400' : 'bg-pink-100'} text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {page}
                </span>
              </button>
            </div>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-pink-500 active:bg-pink-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
              </svg>
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-1">
          {currentPage > 1 && (
            <Button
              variant="outlined"
              size="sm"
              color='pink'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
          )}

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <IconButton
                variant={currentPage === page ? 'gradient' : 'outlined'}
                size="sm"
                color='pink'
                key={page}
                onClick={() => handlePageChange(page)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {page}
              </IconButton>
            ))}
          </div>
          {currentPage < totalPages && (
            <Button
              variant="outlined"
              size="sm"
              color='pink'
              onClick={() => handlePageChange(currentPage + 1)}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Next
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
