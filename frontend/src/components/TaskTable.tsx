import { useTasks } from "../hooks/useTasks";
import styles from "../styles/TaskTable.module.css";

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
  } = useTasks();

  return (
    <div className={styles.container}>
      <h1>Task manager</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.form}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={fetching}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={fetching}
        />
        <button onClick={handleCreate} disabled={fetching}>
          Add task
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableContainer}>
          <div className={styles.searchBar}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={onlyIncomplete}
                onChange={(e) => {
                  setOnlyIncomplete(e.target.checked);
                  setPage(1);
                }}
                disabled={fetching}
              />
              Show incomplete only
            </label>
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={fetching}
            />
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
                <tr key={task.id}>
                  <td className={styles.dataCentered}>{task.title}</td>
                  <td className={styles.dataCentered}>{task.description}</td>
                  <td className={styles.dataCentered}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        updateTask(task.id, { completed: !task.completed })
                      }
                      disabled={fetching}
                    />
                  </td>
                  <td className={styles.dataCentered}>
                    <button
                      onClick={() => deleteTask(task.id)}
                      disabled={fetching}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
