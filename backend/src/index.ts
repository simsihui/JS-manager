import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import protect from './middleware/auth';
import { errorHandler, notFound } from './middleware/error';
import projectRoutes from './routes/project';
import taskRoutes from './routes/task';
import userRoutes from './routes/user';

const port = process.env.PORT || 5000;
const app: Application = express();

app.use(cors());

// Middleware
app.use(express.json()); // parse request body
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(cookieParser()); // parse cookies

// Routes
app.use("/api/task", protect, taskRoutes);
app.use("/api/project", protect, projectRoutes);
app.use("/api/user", userRoutes);
app.get("/api", (req: Request, res: Response) => {
  res.send("Backend server is running");
});

app.use(notFound); // 404 handler
app.use(errorHandler); // error handler

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
