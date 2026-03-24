import type { Request, Response } from "express";

function homePage(req: Request, res: Response) {
  res.render("index");
}

function getLogin(req: Request, res: Response) {
  res.render("login");
}

function getRegister(req: Request, res: Response) {
  res.render("register");
}

async function postLogin(req: Request, res: Response) {}

async function postRegister(req: Request, res: Response) {}

export default {
  homePage,
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};
