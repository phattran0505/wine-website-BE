import express from "express";
import {
  register,
  login,
  resetPassworrd,
} from "../app/controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset", resetPassworrd);

export default router;
