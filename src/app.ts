import { NextFunction } from "express";
import eventRoutes from "./api/v1/routes/eventRoutes";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { HTTP_STATUS } from "./constants/httpConstants";

const app: Express = express();

// Middleware
app.use(morgan("combined"));
app.use(express.json());

// Health check endpoint
app.get("/api/v1/health", (_req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Event routes
app.use("/api/v1/events", eventRoutes);

// Error handler
app.use((
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.error(error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
    });
});

export default app;