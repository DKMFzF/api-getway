import express from "express";
import cors from "cors";
import { config } from "./config/index.config";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { logger } from "./middleware/logging.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { rateLimiter } from "./middleware/rateLimiter.middleware";
import helmet from 'helmet';

/**
 * init service
 */

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(rateLimiter);
app.use(helmet());

// Routes
app.use(config.AUTH_SERVICE_ROUTE, authRoutes);
app.use(config.USER_SERVICE_ROUTE, userRoutes);

// errors handler
app.use(errorHandler);

export default app;
