import { useState } from "react";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (username: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_AUTH_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, login, logout, isAuthenticated: !!token };
}
