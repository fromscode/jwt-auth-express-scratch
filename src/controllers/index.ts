import type { Request, Response } from "express";
import bcrypt from "bcrypt";

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
  const hashedPass = await bcrypt.hash(password, 10);
  await queries.saveUser(username, hashedPass);
  res.redirect("/");
}

export default {
  homePage,
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};
