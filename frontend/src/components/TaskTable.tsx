import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import styles from '../styles/TaskTable.module.css';

export function TaskTable() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (title.trim()) {
      createTask({ title, description, completed: false });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Task Manager</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.form}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={handleCreate}>Add Task</button>
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
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => updateTask(task.id, { completed: !task.completed })}
                  />
                </td>
                <td>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
