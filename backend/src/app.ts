import express from 'express';
import cors from 'cors';
import v1Routes from './routes/v1';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from "./routes/auth.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use('/api/v1', v1Routes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(errorHandler);

export default app;
