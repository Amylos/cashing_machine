import mongoose from "mongoose";
import { Exchange } from "./Exchange";

const ClientWalletSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  exchange: { type: ExchangeSchema, required: true },
  bills: { type: Boolean, default: false },
});

export default mongoose.model("ClientWallet", ClientWalletSchema);
