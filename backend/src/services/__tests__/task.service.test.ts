import { Task } from '@prisma/client';

jest.mock('../../lib/prisma', () => require('../../__mocks__/prisma'));

import { prisma } from '../../lib/prisma';
import * as taskService from '../task.service';

describe('Task Service', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test task',
    description: 'A test task',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('fetches all tasks', async () => {
    (prisma.task.findMany as jest.Mock).mockResolvedValue([mockTask]);

    const result = await taskService.getAllTasks();
    expect(prisma.task.findMany).toHaveBeenCalled();
    expect(result).toEqual([mockTask]);
  });

  it('fetches task by id', async () => {
    (prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

    const result = await taskService.getTaskById(1);
    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockTask);
  });

  it('creates a task', async () => {
    const newTask = {
      title: 'Create test',
      description: 'This is a test task',
      completed: false,
    };

    const createdTask: Task = {
      id: 123,
      ...newTask,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.task.create as jest.Mock).mockResolvedValue(createdTask);

    const result = await taskService.createTask(newTask);
    expect(prisma.task.create).toHaveBeenCalledWith({ data: newTask });
    expect(result).toMatchObject({
      ...newTask,
      id: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('updates a task', async () => {
    const updates = { completed: true };
    const updatedTask = { ...mockTask, ...updates };

    (prisma.task.update as jest.Mock).mockResolvedValue(updatedTask);

    const result = await taskService.updateTask(1, updates);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updates,
    });
    expect(result).toEqual(updatedTask);
  });

  it('deletes a task', async () => {
    (prisma.task.delete as jest.Mock).mockResolvedValue(mockTask);

    const result = await taskService.deleteTask(1);
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockTask);
  });

  it('fetches filtered tasks', async () => {
    const filters = {
      search: 'Test',
      page: 1,
      limit: 10,
      onlyIncomplete: false,
    };

    const mockFilteredTasks = [mockTask];
    const mockCount = 1;

    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockFilteredTasks);
    (prisma.task.count as jest.Mock).mockResolvedValue(mockCount);

    const result = await taskService.getFilteredTasks(filters);
    expect(prisma.task.findMany).toHaveBeenCalled();
    expect(prisma.task.count).toHaveBeenCalled();
    expect(result).toEqual({
      tasks: mockFilteredTasks,
      total: mockCount,
    });
  });
});
