import { Request } from "express";

declare module "Express" {
  export interface Request {
    user?: string;
  }
}
