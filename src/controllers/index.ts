import type { Request, Response } from "express";

function homePage(req: Request, res: Response) {
  res.render("index");
}

export default {
  homePage,
};
