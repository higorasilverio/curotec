import { PrismaClient, Task, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTasks = () => prisma.task.findMany();

export const getTaskById = (id: number) =>
  prisma.task.findUnique({ where: { id } });

export const createTask = (
  data: Omit<Task, "id" | "createdAt" | "updatedAt">
) => prisma.task.create({ data });

export const updateTask = (id: number, data: Partial<Task>) =>
  prisma.task.update({ where: { id }, data }).catch(() => null);

export const deleteTask = (id: number) => prisma.task.delete({ where: { id } });

export const getFilteredTasks = async ({
  search,
  page,
  limit,
  onlyIncomplete,
}: {
  search: string;
  page: number;
  limit: number;
  onlyIncomplete: boolean;
}) => {
  const where: Prisma.TaskWhereInput = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        {
          description: { contains: search, mode: Prisma.QueryMode.insensitive },
        },
      ],
    }),
    ...(onlyIncomplete && {
      completed: false,
    }),
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.task.count({ where }),
  ]);

  return { tasks, total };
};
