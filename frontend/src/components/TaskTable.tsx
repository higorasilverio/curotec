import { useTasks } from "../hooks/useTasks";
import styles from "../styles/TaskTable.module.css";
import CreateForm from "./CreateForm";
import Filters from "./Filters";
import Modal from "./Modal";
import Pagination from "./Pagination";
import { TaskRow } from "./TaskRow";

export function TaskTable() {
  const {
    tasks,
    loading,
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
    selectedTaskId,
    setSelectedTaskId,
    loadingDetails,
    detailsError,
    taskDetails,
    formError,
  } = useTasks();

  return (
    <div className={styles.container}>
      <h1>Task manager</h1>
      <CreateForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        formError={formError}
        fetching={fetching}
        handleCreate={handleCreate}
        titleRef={titleRef}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableContainer}>
          <Filters
            onlyIncomplete={onlyIncomplete}
            setOnlyIncomplete={setOnlyIncomplete}
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            fetching={fetching}
          />
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
                    onSelect={() => setSelectedTaskId(task.id)}
                    onDelete={deleteTask}
                    disabled={fetching}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              fetching={fetching}
            />
          )}
        </div>
      )}
      {selectedTaskId !== null && (
        <Modal
          setSelectedTaskId={setSelectedTaskId}
          loadingDetails={loadingDetails}
          detailsError={detailsError}
          taskDetails={taskDetails}
        />
      )}
    </div>
  );
}
