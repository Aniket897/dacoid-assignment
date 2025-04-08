import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

// internal imports
import ConnectDatabase from "./config/db";
import { corsMiddleware } from "./middlewares/cors";

const PORT = process.env.PORT || 8080;
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// listening server
(async () => {
  try {
    await ConnectDatabase();
    app.listen(PORT, () => {
      console.log("app is running on port: ", PORT);
    });
  } catch (error) {
    console.log("failed to listen server", error);
  }
})();
