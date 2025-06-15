import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import styles from "../styles/TaskTable.module.css";

export function TaskTable() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } =
    useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (title.trim()) {
      createTask({ title, description, completed: false });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Task manager</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.form}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleCreate} disabled={loading}>
          Add task
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
                    disabled={loading}
                  />
                </td>
                <td className={styles.dataCentered}>
                  <button
                    onClick={() => deleteTask(task.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
