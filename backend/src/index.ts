import 'dotenv/config';

import express, { Application, Request, Response } from 'express';

import userRoutes from './routes/user';

const app: Application = express();

// Middleware to parse request body
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend server is running");
});

app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
