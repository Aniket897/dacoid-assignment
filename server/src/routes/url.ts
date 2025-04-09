import { Router } from "express";
import linkController from "../controllers/url";
import { authMiddleware } from "../middlewares/auth";
const routes = Router();

routes.post("/", authMiddleware, linkController.shortUrl);
routes.get("/list", authMiddleware, linkController.getUrlList);

export default routes;
