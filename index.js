import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";
import ExchangeService from "./services/ExchangeService.js";
import ClientWallet from "./models/ClientWalletSchema.js";
import CalculateChangeService from "./services/CalculateChangeService.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

await connectDb();

ExchangeService.createExchange();

console.log(
  `Total de la caisse actuellement : ${ExchangeService.getTotalExchange(
    await ExchangeService.getExchange()
  )}`
);

// CLIENT
app.post("/api/payment", async (req, res) => {
  const { amount, exchange, bigBills } = req.body;

  try {
    // 1️⃣ Calculer le rendu
    const result = await CalculateChangeService.calculateChange(
      amount,
      exchange,
      bigBills
    );

    console.log(result);

    if (!result.success) {
      return res.status(400).json(result);
    }

    console.log("update");

    // 2️⃣ Mettre à jour la caisse existante
    const caisseDoc = await ExchangeService.getExchange();
    Object.assign(caisseDoc, result.updatedCaisse);
    await caisseDoc.save();

    // 3️⃣ Créer une nouvelle ligne ClientWallet
    const clientWallet = new ClientWallet({
      amount,
      exchange,
      bigBills,
    });
    await clientWallet.save();

    // 4️⃣ Renvoyer le rendu au client
    res.json({ success: true, changeToGive: result.changeToGive });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.get("/payment", (req, res) => {
  res.render("payment");
});

app.get("/change", (req, res) => {
  const { data } = req.query;
  let changeToGive = {};

  try {
    if (data) changeToGive = JSON.parse(decodeURIComponent(data));
  } catch (e) {
    console.error("Erreur parsing change data");
  }

  res.render("change", { changeToGive });
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});
