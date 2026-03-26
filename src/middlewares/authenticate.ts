import type { NextFunction, Request, Response } from "express";
import decodeJWT from "../auth/decodeJWT.js";

export default function (req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.token || !req.cookies.token.length) {
    res.redirect("/login");
    return;
  }

  const user = decodeJWT(req.cookies.token);
  if (!user) {
    res.redirect("/login");
    return;
  }

  (req as any).user = user;
  next();
}
