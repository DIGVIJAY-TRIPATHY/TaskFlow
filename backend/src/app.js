import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health Check Route
app.get("/health", (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Server is running"));
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        data: null,
    });
});

export default app;