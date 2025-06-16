import styles from "../styles/Filters.module.css";

interface FilterProps {
  onlyIncomplete: boolean;
  setOnlyIncomplete: (onlyIncomplete: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  fetching: boolean;
}

function Filters({
  onlyIncomplete,
  search,
  setOnlyIncomplete,
  setSearch,
  fetching,
  setPage,
}: FilterProps) {
  return (
    <div className={styles.searchBar}>
      <label htmlFor="incomplete-only" className={styles.checkboxLabel}>
        <input
          id="incomplete-only"
          type="checkbox"
          checked={onlyIncomplete}
          onChange={(e) => {
            setOnlyIncomplete(e.target.checked);
            setPage(1);
          }}
          disabled={fetching}
        />
        Only show incomplete
      </label>
      <div className={styles.formGroup}>
        <label htmlFor="search-input" className={styles.label}>
          <span className="srOnly">Search tasks</span>
        </label>
        <input
          id="search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={fetching}
        />
      </div>
      <button
        onClick={() => {
          setSearch("");
          setPage(1);
        }}
        disabled={fetching || search === ""}
        className={styles.clearButton}
      >
        Clear
      </button>
    </div>
  );
}

export default Filters;
