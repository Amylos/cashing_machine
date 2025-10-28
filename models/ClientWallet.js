import mongoose from "mongoose";
import { Exchange } from "./Exchange";

const ClientWalletSchema = new mongoose.Schema({
  amount: number,
  exchange: Exchange,
  bills: boolean
});

export default mongoose.model("ClientWallet", ClientWalletSchema);
