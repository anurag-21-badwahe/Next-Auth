import { error } from "console";
import mongoose from "mongoose";

export async function connectDb() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MongoDB connection string is not provided.");
    }
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo DB Connected");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDb Connection Error,Please make sure DB in up and running: ",
        error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    console.log(error);
  }
}
