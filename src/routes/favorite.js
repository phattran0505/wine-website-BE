import express from "express";
import {
  toggleFavoriteWine,
  getFavortieWine,
  getDefaultStauts
} from "../app/controllers/FavoriteController.js";

const router = express.Router();

router.post("/", toggleFavoriteWine);
router.get("/", getDefaultStauts);
router.get("/:userId", getFavortieWine);

export default router;
