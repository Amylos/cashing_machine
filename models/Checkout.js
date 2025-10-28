import mongoose from "mongoose";
import { Exchange } from "./Exchange";

const CheckoutSchema = new Schema({
  exchange: Exchange,
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
