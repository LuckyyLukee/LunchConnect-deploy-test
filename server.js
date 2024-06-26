import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import authRouter from "./routes/authRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

import { app, server } from "./utils/socket.js";
import { connectDB } from "./utils/connectDB.js";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Use router
app.use("/api", router);
app.use("/api", authRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.get("/", (req, res) => {  
  res.json("Connected to backend")
})


server.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
