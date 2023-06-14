import { Schema, model, models } from "mongoose";

const ticketSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    fullname: {
      type: String,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    code: {
      type: String,
      // required: true,
    },
    attended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Tickets = models.Tickets || model("Tickets", ticketSchema);
