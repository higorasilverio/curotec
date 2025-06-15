import { PrismaClient, Task } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = () => prisma.task.findMany();

export const getTaskById = (id: number) => prisma.task.findUnique({ where: { id } });

export const createTask = (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => 
  prisma.task.create({ data });

export const updateTask = (id: number, data: Partial<Task>) => 
  prisma.task.update({ where: { id }, data }).catch(() => null);

export const deleteTask = (id: number) => 
  prisma.task.delete({ where: { id } });
