import express from "express";
import cors from "cors";
import v1Routes from "./routes/v1";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { apiLimiter } from "./middlewares/rateLimiter";
import helmet from "helmet";

const strictTransportSecurity =
  process.env.ENABLE_TRANSPORT_SECURITY === "true";

const origin = process.env.WEB_APPLICATION_DOMAIN_URL || "";

const app = express();

app.set('trust proxy', 1);

app.use(
  helmet({
    strictTransportSecurity,
  })
);

app.use(
  cors({
    origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", apiLimiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/v1", v1Routes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

export default app;
