import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  name: { type: String },
  to_user: { type: String },
  order_id: { type: String },
  message: { type: String },
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;
