import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import apiRouter from "./routes/apis.js";
mongoose.connect(process.env.MONGODB_URL);
const app = express();
const port = 3002;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
