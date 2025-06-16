import React from "react";
import type { Task } from "../types/task";
import styles from "../styles/TaskRow.module.css";

interface TaskRowProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onSelect: () => void;
  disabled: boolean;
}

function TaskRowComponent({
  task,
  onToggle,
  onDelete,
  onSelect,
  disabled,
}: TaskRowProps) {
  return (
    <tr>
      <td className={styles.dataCentered}>{task.title}</td>
      <td className={styles.dataCentered}>{task.description}</td>
      <td className={styles.dataCentered}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, !task.completed)}
          disabled={disabled}
        />
      </td>
      <td className={styles.dataCentered}>
        <button onClick={onSelect} disabled={disabled}>
          Details
        </button>
        <button onClick={() => onDelete(task.id)} disabled={disabled}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export const TaskRow = React.memo(TaskRowComponent);
