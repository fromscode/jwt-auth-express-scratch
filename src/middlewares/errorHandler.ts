import type { NextFunction, Request, Response } from "express";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.send(`${err.status} | ${err.message}`);
}
