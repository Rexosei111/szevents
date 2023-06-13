import mongoose from "mongoose";
import Error from "next/error";

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw new Error({
      statusCode: 500,
      title: "Unable to connect to database",
    });
  }
};

export default connectMongo;
