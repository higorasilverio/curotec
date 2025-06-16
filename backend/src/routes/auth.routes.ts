import * as express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "dev-secret";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

const registerHandler = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing)
    return res.status(409).json({ message: "Username already exists." });

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  res.status(201).json({ token });
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: JWT Token
 *       409:
 *         description: Username already exists
 */
router.post("/register", (req, res, next) => {
  registerHandler(req, res).catch(next);
});

const loginHandler = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT Token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", (req, res, next) => {
  loginHandler(req, res).catch(next);
});

export default router;
