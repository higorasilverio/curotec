import { useLogin } from "../hooks/useLogin";
import styles from "../styles/Login.module.css";

export function Login({ onLogin }: { onLogin: () => void }) {
  const { error, username, setUsername, setPassword, handleSubmit, password } =
    useLogin(onLogin);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.form}>
        <input
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}
