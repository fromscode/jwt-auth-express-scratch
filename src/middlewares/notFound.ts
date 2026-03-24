import type { NextFunction, Request, Response } from "express";
import error404 from "../errors/Error404.js";

export default function (req: Request, res: Response, next: NextFunction) {
  next(new error404());
}
