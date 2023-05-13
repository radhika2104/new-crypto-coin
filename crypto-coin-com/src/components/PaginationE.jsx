import React from "react";
import "../styles/Pagination.css";

const PaginationE = ({
  pageNumbers,
  currentPage,
  setCurrentPage,
  prevPage,
  nextPage,
  scrollToRef,
}) => {
  return (
    <div className="pagination">
      <a href="#!" onClick={prevPage}>
        &laquo;
      </a>

      {pageNumbers.map((pageNum) => (
        <a
          href="#!"
          key={pageNum}
          onClick={() => {
            setCurrentPage(pageNum);
            scrollToRef.current.scrollIntoView();
            // window.scrollTo({
            //   top: 500,
            //   left: 500,
            //   behavior: "smooth",
            // });
          }}
        >
          {pageNum}
        </a>
      ))}

      <a href="#!" onClick={nextPage}>
        &raquo;
      </a>
    </div>
  );
};

export default PaginationE;
