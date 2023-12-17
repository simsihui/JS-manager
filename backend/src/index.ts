import 'dotenv/config';

import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';

import { errorHandler, notFound } from './middleware/error';
import userRoutes from './routes/user';

const port = process.env.PORT || 5000;
const app: Application = express();

// Middleware
app.use(express.json()); // parse request body
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(cookieParser()); // parse cookies

// Routes
app.use("/user", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Backend server is running");
});

app.use(notFound); // 404 handler
app.use(errorHandler); // error handler

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
