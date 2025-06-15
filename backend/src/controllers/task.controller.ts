import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/task.service";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search = "", page = "1", limit = "5" } = req.query;

    const currentPage = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const { tasks, total } = await taskService.getFilteredTasks({
      search: search as string,
      page: currentPage,
      limit: pageSize,
    });

    res.json({
      data: tasks,
      total,
      page: currentPage,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await taskService.getTaskById(+req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updated = await taskService.updateTask(+req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await taskService.deleteTask(+req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
