import express from "express";
import {
  toggleFavoriteWine,
  getFavortieWine,
} from "../app/controllers/FavoriteController.js";

const router = express.Router();

router.post("/", toggleFavoriteWine);
router.get("/:userId", getFavortieWine);

export default router;
