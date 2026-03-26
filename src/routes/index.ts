import express from "express";

import controller from "../controllers/index.js";
import authenticate from "../middlewares/authenticate.js";
const router = express.Router();

router.get("/", controller.homePage);

router.get("/login", controller.getLogin);
router.get("/register", controller.getRegister);
router.post("/login", controller.postLogin);
router.post("/register", controller.postRegister);

router.get("/dashboard", authenticate, controller.getDashboard);
router.get("/profile", authenticate, controller.getProfile);

export default router;
