import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const user = { name: "Aboubakr", age: 25 };
  res.render("index", { user });
});

await connectDb();

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});
