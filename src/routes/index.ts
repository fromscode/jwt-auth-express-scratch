import express from "express";

import controller from "../controllers/index.js";
const router = express.Router();

router.get("/", controller.homePage);

router.get("/login", controller.getLogin);
router.get("/register", controller.getRegister);
router.post("/login", controller.postLogin);
router.post("/register", controller.postRegister);

router.get("dashboard", controller.getDashboard);
router.get("profile", controller.getProfile);

export default router;
