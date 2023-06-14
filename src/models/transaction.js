import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    transaction: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    trxref: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transactions =
  models.Transactions || model("Transactions", transactionSchema);
