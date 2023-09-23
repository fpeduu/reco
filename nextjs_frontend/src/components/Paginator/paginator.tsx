import Image from "next/image";
import Styles from "./paginator.module.scss";

interface PaginatorProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  pageLimit: number;
}

export default function Paginator({
  onPageChange,
  currentPage,
  pageLimit,
}: PaginatorProps) {
  const activeStyles = {
    backgroundColor: "black" /* Equivalent to bg-secondary */,
    color: "white" /* Equivalent to text-white */,
    // backgroundColorOpacity: 1 /* Equivalent to hover:bg-opacity-100 */,

    outline: "none",
  };

  function handlePreviousPage() {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onPageChange(newPage); // Update the currentPage
      currentPage = newPage;
    }
    const pageElements = document.querySelectorAll("[data-page]");
    pageElements.forEach((element) => {
      element.classList.remove(Styles["active-page"]);
    });
    const clickedPageElement = document.querySelector(
      `[data-page="${currentPage}"]`
    );

    // Add the active-page class to the clicked page element
    if (clickedPageElement) {
      clickedPageElement.classList.add(Styles["active-page"]);
    }
  }

  function handleNextPage() {
    if (currentPage < pageLimit) {
      const newPage = currentPage + 1;
      onPageChange(newPage); // Update the currentPage
      currentPage = newPage; // Update the currentPage variable
    }
    const pageElements = document.querySelectorAll("[data-page]");
    console.log(pageElements);
    pageElements.forEach((element) => {
      element.classList.remove(Styles["active-page"]);
      console.log(element);
    });

    const clickedPageElement = document.querySelector(
      `[data-page="${currentPage}"]`
    );
    console.log(clickedPageElement);

    // Add the active-page class to the clicked page element
    if (clickedPageElement) {
      clickedPageElement.classList.add(Styles["active-page"]);
    }
  }

  function handlePageClick(page: number) {
    onPageChange(page);
    const pageElements = document.querySelectorAll("[data-page]");
    console.log(pageElements);
    pageElements.forEach((element) => {
      element.classList.remove(Styles["active-page"]);
    });
    const clickedPageElement = document.querySelector(
      `[data-page="${page}"]`
    ) as HTMLElement;
    console.log(clickedPageElement);

    if (clickedPageElement) {
      clickedPageElement.classList.add(Styles["active-page"]);

      clickedPageElement.focus();
    }
  }

  const renderPagination = () => {
    if (pageLimit <= 6) {
      // If there are 2, 3, 4, 5, or 6 pages, display all pages
      return (
        <div className="flex items-center">
          {Array.from({ length: pageLimit }, (_, index) => (
            <a
              key={index + 1}
              href="#"
              className={`px-5 py-3 rounded-md ${Styles.pageButton} ${
                index === 0 ? Styles["active-page"] : ""
              }`}
              onClick={() => handlePageClick(index + 1)}
              data-page={index + 1}
            >
              {index + 1}
            </a>
          ))}
        </div>
      );
    } else {
      // If there are more than 6 pages, display 1 2 3 4 5 ... [number of pages]
      return (
        <div className="flex items-center ">
          {Array.from({ length: 5 }, (_, index) => (
            <a
              key={index + 1}
              href="#"
              className={`px-2 py-1 rounded-md ${
                index === 0
                  ? "bg-secondary text-white active-page"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </a>
          ))}
          <span className="px-2 py-1 text-gray-600">...</span>
          <a
            href="#"
            className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-200"
            onClick={() => handlePageClick(pageLimit)}
          >
            {pageLimit}
          </a>
        </div>
      );
    }
  };

  return (
    <div
      className="flex justify-center items-center rounded-xl
                    border-y-[1px] border-secondary gap-5
                    bg-[#d9d9d9]"
    >
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
      {renderPagination()}
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
  );
}
