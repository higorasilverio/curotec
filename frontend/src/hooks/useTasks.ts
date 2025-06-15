import { useCallback, useEffect, useState } from "react";
import type { Task } from "../types/task";

const API_URL = "http://localhost:3000/api/v1/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resetAppStates = () => {
    setError(null);
    setLoading(true);
  };

  const fetchTasks = useCallback(async () => {
    try {
      resetAppStates();
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const optimisticTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      resetAppStates();
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await res.json();
      setTasks((prev) => [
        newTask,
        ...prev.filter((t) => t.id !== optimisticTask.id),
      ]);
    } catch {
      setError("Failed to create task");
      setTasks((prev) => prev.filter((t) => t.id !== optimisticTask.id));
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    const prev = [...tasks];
    const optimistic = tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTasks(optimistic);

    try {
      resetAppStates();
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch {
      setError("Failed to update task");
      setTasks(prev);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    const prev = [...tasks];
    setTasks(tasks.filter((t) => t.id !== id));

    try {
      resetAppStates();
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch {
      setError("Failed to delete task");
      setTasks(prev);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, createTask, updateTask, deleteTask };
}
