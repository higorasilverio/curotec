import { useCallback, useEffect, useRef, useState } from "react";
import type { Task } from "../types/task";
import { useDebounce } from "./useDebounce";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = `${import.meta.env.VITE_API_TASK_URL}/tasks`;

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
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (selectedTaskId === null) return;

      setLoadingDetails(true);
      setDetailsError(null);
      try {
        const res = await fetchWithAuth(
          `${import.meta.env.VITE_API_TASK_URL}/tasks/${selectedTaskId}`
        );
        if (!res.ok) throw new Error("Task not found");
        const data = await res.json();
        setTaskDetails(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setDetailsError("Failed to load task details.");
        setSelectedTaskId(null);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchTaskDetails();
  }, [selectedTaskId]);

  const fetchTasks = useCallback(async () => {
    try {
      setFetching(true);
      const params = new URLSearchParams({
        search: debouncedSearch,
        page: String(page),
        limit: String(limit),
        onlyIncomplete: String(onlyIncomplete),
      });

      const res = await fetchWithAuth(`${API_URL}?${params.toString()}`);
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
      await fetchWithAuth(API_URL, {
        method: "POST",
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
      await fetchWithAuth(`${API_URL}/${id}`, {
        method: "PUT",
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
      await fetchWithAuth(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      toast.success("Task deleted");
      await fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setFetching(false);
    }
  };

  const handleCreate = () => {
    if (!title.trim()) {
      setFormError("Title is required.");
      return;
    }

    if (title.length > 100) {
      setFormError("Title must be under 100 characters.");
      return;
    }

    if (description.length > 300) {
      setFormError("Description must be under 300 characters.");
      return;
    }

    setFormError(null);
    createTask({ title, description, completed: false });
    setTitle("");
    setDescription("");
    titleRef.current?.focus();
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
    selectedTaskId,
    setSelectedTaskId,
    loadingDetails,
    detailsError,
    taskDetails,
    formError,
  };
}
