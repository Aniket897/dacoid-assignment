import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;

async function ConnectDatabase() {
  mongoose
    .connect(MONGO_URL, {
      dbName: "url-shortner",
    })
    .then(() => {
      console.log("Database connected.");
    })
    .catch((error) => {
      throw error;
    });
}

export default ConnectDatabase;
