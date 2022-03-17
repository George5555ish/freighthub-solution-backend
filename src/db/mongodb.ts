import mongoose from "mongoose";
import config from "config";


const port = process.env.PORT || 5000;

export async function connectToDatabase(app: any) {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(config.get<string>("MONGO_DB_URL")).then(() => {
        app.listen({ port }, () => {
          console.log("connected to MongoDB Successfully");
        });
      });
    } else {
      await mongoose.connect(config.get<string>("dbUri")).then(() => {
        app.listen({ port }, () => {
          console.log("connected to MongoDB Successfully");
          console.log("App is listening on http://localhost:" + port);
        });
      });
    }
  } catch (error) {
    console.log("error from db");
    console.error(error);
    process.exit(1);
  }
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
