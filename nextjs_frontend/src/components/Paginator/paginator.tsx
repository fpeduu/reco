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
  function handlePreviousPage() {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onPageChange(newPage);

      setTimeout(() => {
        const pageElements = document.querySelectorAll("[data-page]");
        pageElements.forEach((element) => {
          element.classList.remove(Styles["active-page"]);
        });

        const clickedPageElement = document.querySelector(
          `[data-page="${newPage}"]`
        ) as HTMLElement;

        if (clickedPageElement) {
          clickedPageElement.classList.add(Styles["active-page"]);
          clickedPageElement.focus();
        }
      }, 0);
    }
  }

  function handleNextPage() {
    if (currentPage < pageLimit) {
      const newPage = currentPage + 1;
      onPageChange(newPage);

      setTimeout(() => {
        const pageElements = document.querySelectorAll("[data-page]");
        pageElements.forEach((element) => {
          element.classList.remove(Styles["active-page"]);
        });

        const clickedPageElement = document.querySelector(
          `[data-page="${newPage}"]`
        ) as HTMLElement;

        if (clickedPageElement) {
          clickedPageElement.classList.add(Styles["active-page"]);
          clickedPageElement.focus();
        }
      }, 0);
    }
  }

  function handlePageClick(page: number) {
    onPageChange(page);
    currentPage = page;

    setTimeout(() => {
      const clickedPageElement = document.querySelector(
        `[data-page="${page}"]`
      ) as HTMLElement;
      console.log(clickedPageElement);

      const pageElements = document.querySelectorAll("[data-page]");
      pageElements.forEach((element) => {
        element.classList.remove(Styles["active-page"]);
      });

      if (clickedPageElement) {
        clickedPageElement.classList.add(Styles["active-page"]);
        clickedPageElement.focus();
      }
    }, 0);
  }

  const renderPagination = () => {
    const displayedPages: (number | string)[] = [];
    const pageRange = 5;

    if (pageLimit <= pageRange) {
      for (let i = 1; i <= pageLimit; i++) {
        displayedPages.push(i);
      }
    } else {
      if (currentPage <= Math.ceil(pageRange / 2)) {
        for (let i = 1; i <= pageRange - 1; i++) {
          displayedPages.push(i);
        }
        displayedPages.push("...");
        displayedPages.push(pageLimit);
      } else if (currentPage >= pageLimit - Math.floor(pageRange / 2)) {
        displayedPages.push(1);
        displayedPages.push("...");
        for (let i = pageLimit - pageRange + 2; i <= pageLimit; i++) {
          displayedPages.push(i);
        }
      } else {
        displayedPages.push(1);
        displayedPages.push("...");
        for (
          let i = currentPage - Math.floor(pageRange / 2);
          i <= currentPage + Math.floor(pageRange / 2);
          i++
        ) {
          displayedPages.push(i);
        }
        displayedPages.push("...");
        displayedPages.push(pageLimit);
      }
    }

    return (
      <div className="flex items-center">
        {displayedPages.map((page, index) => (
          <a
            key={index}
            href={typeof page === "number" ? "#" : undefined}
            className={`${
              typeof page === "number" ? Styles.pageButton : Styles.pageEllipsis
            } ${page === currentPage ? Styles["active-page"] : ""}`}
            onClick={() => {
              if (typeof page === "number") {
                console.log(page);
                handlePageClick(page);
              }
            }}
            data-page={page === "..." ? undefined : page}
          >
            {page}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div
      className="flex justify-center items-center 
                    gap-5
                    "
    >
      <button className=" py-3 px-5" onClick={handlePreviousPage}>
        <Image
          src="/icons/arrow_left.svg"
          alt="Previous Page"
          width={10}
          height={15}
        />
      </button>
      {renderPagination()}
      <button className=" py-3 px-5" onClick={handleNextPage}>
        <Image
          src="/icons/arrow_right.svg"
          alt="Next Page"
          width={10}
          height={15}
        />
      </button>
    </div>
  );
}
