import express from "express";
import cors from "cors";
import { config } from "./config";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { logger } from "./middleware/logger";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

export default app;
