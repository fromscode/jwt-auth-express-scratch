import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import queries from "../db/queries.js";
import createJWT from "../auth/createJWT.js";

function homePage(req: Request, res: Response) {
  console.log("inside home");
  res.render("index");
}

function getLogin(req: Request, res: Response) {
  res.render("login");
}

function getRegister(req: Request, res: Response) {
  res.render("register");
}

async function postLogin(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await queries.getUserByUsername(username);

  if (!(await bcrypt.compare(password, user.password))) {
    res.redirect(400, "/login");
    return;
  }

  const jwt = await createJWT({ sub: String(user.id), name: user.username });

  res.cookie("token", jwt, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.redirect("dashboard");
}

async function postRegister(req: Request, res: Response) {
  const { username, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  await queries.saveUser(username, hashedPass);
  res.redirect("/");
}

function getDashboard(req: Request, res: Response) {
  res.send(`Hello ${(req as any).user.name}`);
}

function getProfile(req: Request, res: Response) {
  res.send(
    `Hello ${(req as any).user.name}, your id is: ${(req as any).user.sub}`,
  );
}

function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.redirect("/");
}

export default {
  homePage,
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  getDashboard,
  getProfile,
  logout,
};
