import request from 'supertest';
import app from '../../app';
import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';

jest.mock('../../lib/prisma', () => require('../../__mocks__/prisma'));
jest.mock('../../middlewares/authMiddleware', () => ({
  authenticateToken: (req: any, res: any, next: any) => {
    req.user = { id: 1 };
    next();
  },
}));

const token = jwt.sign({ id: 1, username: 'testuser' }, 'your_jwt_secret');

describe('Task Routes', () => {
  const mockTask = {
    id: 1,
    title: 'Mock Task',
    description: 'This is a mock task',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/v1/tasks should return all tasks', async () => {
    (prisma.task.findMany as jest.Mock).mockResolvedValue([mockTask]);

    const res = await request(app)
      .get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(prisma.task.findMany).toHaveBeenCalled();
  });

  it('GET /api/v1/tasks/:id should return a task by id', async () => {
    (prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

    const res = await request(app)
      .get('/api/v1/tasks/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(prisma.task.findUnique).toHaveBeenCalled();
  });

  it('POST /api/v1/tasks should create a task', async () => {
    const newTask = {
      title: 'New Task',
      description: 'New task desc',
      completed: false,
    };

    (prisma.task.create as jest.Mock).mockResolvedValue({ ...mockTask, ...newTask });

    const res = await request(app)
      .post('/api/v1/tasks')
      .send(newTask)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Task');
    expect(prisma.task.create).toHaveBeenCalled();
  });

  it('PUT /api/v1/tasks/:id should update a task', async () => {
    (prisma.task.update as jest.Mock).mockResolvedValue({ ...mockTask, completed: true });

    const res = await request(app)
      .put('/api/v1/tasks/1')
      .send({ completed: true })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(prisma.task.update).toHaveBeenCalled();
  });

  it('DELETE /api/v1/tasks/:id should delete a task', async () => {
    (prisma.task.delete as jest.Mock).mockResolvedValue(mockTask);

    const res = await request(app)
      .delete('/api/v1/tasks/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
    expect(prisma.task.delete).toHaveBeenCalled();
  });
});
