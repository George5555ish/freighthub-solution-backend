import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
export async function connectToDatabase(cb: unknown) {
  try {
    await mongoose
      .connect(MONGO_DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => cb());
  } catch (error) {
    console.log("error from db");
    console.error(error);
    process.exit(1);
  }
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
