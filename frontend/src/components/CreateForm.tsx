import type React from "react";
import styles from "../styles/CreateForm.module.css";

interface CreateFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  formError: string | null;
  fetching: boolean;
  handleCreate: () => void;
  titleRef: React.RefObject<HTMLInputElement | null>;
}

function CreateForm({
  description,
  fetching,
  formError,
  setDescription,
  setTitle,
  title,
  titleRef,
  handleCreate,
}: CreateFormProps) {
  return (
    <div className={styles.form}>
      {formError && <p className={styles.error}>{formError}</p>}
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
  );
}

export default CreateForm;
