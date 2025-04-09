import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import Url from "../models/url";
import Click from "../models/click";

const routes = Router();

routes.get("/:id", authMiddleware, async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const url = await Url.findById(id);

    if (!url) {
      resp.status(400).json({
        message: "url not found",
      });
      return;
    }

    const clicks = await Click.find({
      urlId: url,
    });

    resp.status(200).json({
      clicks,
      url,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
});

export default routes;
