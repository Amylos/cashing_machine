import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const user = { name: "Aboubakr", age: 25 };
  res.render("index", { user });
});

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`✅ MongoDB connexion établie`);
  }
);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});
