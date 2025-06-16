import styles from "../styles/Modal.module.css";
import type { Task } from "../types/task";

interface ModalProps {
  setSelectedTaskId: (id: number | null) => void;
  loadingDetails: boolean;
  detailsError: string | null;
  taskDetails: Task | null;
}

function Modal({
  detailsError,
  loadingDetails,
  setSelectedTaskId,
  taskDetails,
}: ModalProps) {
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setSelectedTaskId(null)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {loadingDetails ? (
          <p>Loading...</p>
        ) : detailsError ? (
          <p className={styles.error}>{detailsError}</p>
        ) : taskDetails ? (
          <>
            <h2>{taskDetails.title}</h2>
            <p>{taskDetails.description || "No description"}</p>
            <p>
              <strong>Completed:</strong> {taskDetails.completed ? "Yes" : "No"}
            </p>
            <button onClick={() => setSelectedTaskId(null)}>Close</button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Modal;
