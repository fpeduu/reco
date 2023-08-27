import Image from 'next/image';

interface PaginatorProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  pageLimit: number;
}

export default function Paginator({
  onPageChange,
  currentPage,
  pageLimit
}: PaginatorProps) {
  function handlePreviousPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < pageLimit) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className="flex justify-center items-center rounded-xl
                    border-y-[1px] border-secondary gap-5
                    bg-[#d9d9d9]">
      <button
        className="bg-secondary rounded-l-lg py-3 px-5"
        onClick={handlePreviousPage}
      >
        <Image
          src="/icons/left-arrow.svg"
          alt="Previous Page"
          width={10}
          height={15}
        />
      </button>
      <span className="px-1 py-1 font-semibold text-2xl">
        {currentPage}
      </span>
      <button
        className="bg-secondary rounded-r-lg py-3 px-5"
        onClick={handleNextPage}
      >
        <Image
          src="/icons/right-arrow.svg"
          alt="Next Page"
          width={10}
          height={15}
        />
      </button>
    </div>
  )
}