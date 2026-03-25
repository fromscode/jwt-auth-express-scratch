import type { Request, Response } from "express";
import queries from "../db/queries.js";

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

async function postRegister(req: Request, res: Response) {
  const { username, password } = req.body;
  await queries.saveUser(username, password);
  res.redirect("/");
}

export default {
  homePage,
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};
