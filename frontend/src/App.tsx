import { Login } from "./components/Login";
import { TaskTable } from "./components/TaskTable";
import { useAuth } from "./hooks/useAuth";
import styles from "./styles/App.module.css";

function App() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <div className={styles.app}>
      {isAuthenticated ? (
        <>
          <header className={styles.header}>
            <button onClick={logout} className={styles.logout}>
              Logout
            </button>
          </header>
          <main>
            <TaskTable />
          </main>
        </>
      ) : (
        <Login onLogin={() => window.location.reload()} />
      )}
    </div>
  );
}

export default App;
