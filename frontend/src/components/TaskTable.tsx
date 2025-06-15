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
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={fetching}
          />
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
        </div>
      )}
    </div>
  );
}
