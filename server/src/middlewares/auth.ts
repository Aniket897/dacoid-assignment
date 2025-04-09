import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: string;
  }
}

export const authMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies ? req.cookies["authentication-token"] : null;

    console.log(token);
    if (!token) {
      resp.status(400).json({
        message: "Unauthorized",
      });
      return;
    }

    const payload = verify(token, process.env.JWT_SECRET as string);

    req.user = (payload as JwtPayload).id;
    next();
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Unauthorized",
    });
  }
};
