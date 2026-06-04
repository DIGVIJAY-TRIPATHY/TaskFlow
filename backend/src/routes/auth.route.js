import { Router } from "express";

import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(verifyJWT, getCurrentUser);

export default router;