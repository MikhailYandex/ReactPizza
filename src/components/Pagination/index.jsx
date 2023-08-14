import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useState } from "react";

const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
			className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={e => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
