import { useCallback, useEffect, useRef, useState } from "react";
import type { Task } from "../types/task";
import { useDebounce } from "./useDebounce";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [onlyIncomplete, setOnlyIncomplete] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const titleRef = useRef<HTMLInputElement | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setFetching(true);
      const params = new URLSearchParams({
        search: debouncedSearch,
        page: String(page),
        limit: String(limit),
        onlyIncomplete: String(onlyIncomplete),
      });

      const res = await fetch(`${API_URL}?${params.toString()}`);
      const json = await res.json();

      setTasks(json.data);
      setTotalPages(json.totalPages);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
      setFetching(false);
    }
  }, [debouncedSearch, page, limit, onlyIncomplete]);

  const createTask = async (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setFetching(true);
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      toast.success("Task created");
      await fetchTasks();
    } catch {
      toast.error("Failed to create tasks");
    } finally {
      setFetching(false);
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    try {
      setFetching(true);
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      toast.success("Task updated");
      await fetchTasks();
    } catch {
      toast.error("Failed to update task");
    } finally {
      setFetching(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setFetching(true);
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      toast.success("Task deleted");
      await fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setFetching(false);
    }
  };

  const handleCreate = () => {
    if (title.trim()) {
      createTask({ title, description, completed: false });
      setTitle("");
      setDescription("");
      titleRef.current?.focus();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    fetching,
    updateTask,
    deleteTask,
    handleCreate,
    title,
    setTitle,
    description,
    setDescription,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    onlyIncomplete,
    setOnlyIncomplete,
    titleRef,
  };
}
