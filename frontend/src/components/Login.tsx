import { useLogin } from "../hooks/useLogin";
import styles from "../styles/Login.module.css";

export function Login({ onLogin }: { onLogin: () => void }) {
  const {
    error,
    username,
    setUsername,
    setPassword,
    handleSubmit,
    password,
  } = useLogin(onLogin);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          name="username"
          className={styles.input}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
