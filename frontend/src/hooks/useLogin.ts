import { useState } from "react";
import { useAuth } from "./useAuth";

export function useLogin(onLogin: () => void) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      await login(username, password);
      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  return { username, setUsername, password, setPassword, error, handleSubmit };
}
