import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");


// CLIENT 
app.post("/api/payment", async (req, res) => {
  const { amount, exchange, bigBills } = req.body;

  // TODO: traitement + renvoie du exchange

  res.render("change", { exchange });
});

app.get("/payment", (req, res) => {
  res.render("payment");
});

app.get("/change", (req, res) => {
  res.render("change");
});


await connectDb();

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});
