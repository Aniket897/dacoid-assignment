import { Router } from "express";
import authControllers from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";

const routes = Router();

routes.get("/", authMiddleware, authControllers.me);
routes.post("/login", authControllers.login);
routes.post("/register", authControllers.register);

export default routes;
