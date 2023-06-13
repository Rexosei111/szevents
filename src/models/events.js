import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  startTime: {
    type: Date,
  },
  coverImage: {
    type: String,
  },
  status: {
    type: String,
    // enum: ["live", "upcoming", "past", "draft"],
    default: "upcoming",
    index: true,
  },
  location: {
    type: Object,
    schema: {
      address: String,
      latitude: String,
      longitude: String,
    },
    default: {},
  },
  ticketInfo: {
    type: Object,
    schema: {
      total: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        default: 0.0,
      },
      sold: {
        type: Number,
        default: 0,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
  },
});

const Event = models.Event || model("Event", eventSchema);

export default Event;
