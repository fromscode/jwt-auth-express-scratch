import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import queries from "../db/queries.js";
import createJWT from "../auth/createJWT.js";
import decodeJWT from "../auth/decodeJWT.js";

function homePage(req: Request, res: Response) {
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

  /* TODO: Figure out a way to save the cookie on server side,
  Do not user res.render() as it breaks the PRG pattern
  The solution is probably to use httponly cookie to send the token via a redirect, and the in that controller extract the 
  token from the cookie and send it to the client */

  res.redirect("dashboard");
}

async function postRegister(req: Request, res: Response) {
  const { username, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  await queries.saveUser(username, hashedPass);
  res.redirect("/");
}

async function getDashboard(req: Request, res: Response) {
  const user = decodeJWT(req.cookies.token);

  if (!user) {
    res.redirect("/login");
    return;
  }

  res.send(`Hello ${user.name}`);
}

async function getProfile(req: Request, res: Response) {}

export default {
  homePage,
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  getDashboard,
  getProfile,
};
