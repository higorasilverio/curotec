import { useTasks } from "../hooks/useTasks";
import styles from "../styles/TaskTable.module.css";
import { TaskRow } from "./TaskRow";

export function TaskTable() {
  const {
    tasks,
    loading,
    error,
    updateTask,
    deleteTask,
    title,
    setTitle,
    description,
    setDescription,
    search,
    setSearch,
    handleCreate,
    fetching,
    page,
    setPage,
    totalPages,
    onlyIncomplete,
    setOnlyIncomplete,
    titleRef,
  } = useTasks();

  return (
    <div className={styles.container}>
      <h1>Task manager</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="task-title" className={styles.label}>
            Title
          </label>
          <input
            id="task-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={fetching}
            ref={titleRef}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="task-desc" className={styles.label}>
            Description
          </label>
          <input
            id="task-desc"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={fetching}
          />
        </div>
        <button onClick={handleCreate} disabled={fetching}>
          Add task
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableContainer}>
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
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Completed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onToggle={(id, completed) => updateTask(id, { completed })}
                    onDelete={deleteTask}
                    disabled={fetching}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
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
          )}
        </div>
      )}
    </div>
  );
}
