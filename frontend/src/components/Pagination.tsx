import styles from "../styles/Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  fetching: boolean;
}

function Pagination({ page, setPage, totalPages, fetching }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1 || fetching}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          disabled={p === page || fetching}
          className={p === page ? styles.activePage : ""}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages || fetching}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
