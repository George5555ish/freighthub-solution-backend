import mongoose from "mongoose";
import config from 'config';

const MONGO_DB_URL = process.env.MONGO_DB_URL;
export async function connectToDatabase(cb: unknown) {
  try {
    
    if (process.env.NODE_ENV === 'production'){
        await mongoose
        .connect(MONGO_DB_URL, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        })
        .then(() => cb());
    } else {
        await mongoose
        .connect(config.get<string>('dbUri'))
        .then(() => cb());
    }
  } catch (error) {
    console.log("error from db");
    console.error(error);
    process.exit(1);
  }
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
