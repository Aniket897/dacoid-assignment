import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

// internal imports
import ConnectDatabase from "./config/db";
import { corsMiddleware } from "./middlewares/cors";
import authRoutes from "./routes/auth";
import urlRoutes from "./routes/url";
import analyticsRoutes from "./routes/analytics";
import Url from "./models/url";
import Click from "./models/click";

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

// routes
app.use("/auth", authRoutes);
app.use("/url", urlRoutes);
app.use("/analytics", analyticsRoutes);
app.get("/:shortId", async (req: Request, resp: Response) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({
      shortId,
    });

    if (!url) {
      resp.status(400).json({
        message: "Url not found",
      });
      return;
    }
    url.clickCount++;
    await url.save();
    Click.create({
      urlId: url._id,
      ip: req.ip,
    });
    resp.status(200).json({
      originalUrl: url.originalUrl,
    });
  } catch (error) {
    console.log(error);
  }
});

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
