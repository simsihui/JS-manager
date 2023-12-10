import express from "express";
import "dotenv/config";

const app = express();

// Middleware to parse request body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
