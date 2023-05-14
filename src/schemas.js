import dynamoose from "dynamoose";
import { number } from "yup";
const uuid = require("uuid");

const ddb = new dynamoose.aws.ddb.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

dynamoose.aws.ddb.set(ddb);

dynamoose.aws.ddb.local();

const userSchema = new dynamoose.Schema(
  {
    email: {
      type: String,
      hashKey: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      default: null,
    },
  },
  { timestamp: true }
);

export const Users = dynamoose.model("Users", userSchema);

const eventSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: false,
    default: () => uuid.v4(),
    forceDefault: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: String,
  },
  startTime: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  status: {
    type: String,
    enum: ["live", "upcoming", "past", "draft"],
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
    },
  },
});

export const Events = dynamoose.model("Event", eventSchema);
