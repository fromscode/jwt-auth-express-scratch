import type { Request, Response } from "express";

function homePage(req: Request, res: Response) {
  res.send("Hello from controller!");
}

export default {
  homePage,
};
