import FavoriteModel from "../models/FavoriteModel.js";
import WineModel from "../models/WineModel.js";
import UserModel from "../models/UserModel.js";

export const toggleFavoriteWine = async (req, res) => {
  const { userId, wineId } = req.body;
  const existFavorite = await FavoriteModel.findOne({ userId, wineId });
  const newFavorite = new FavoriteModel({ ...req.body });
  try {
    if (existFavorite) {
      await FavoriteModel.findByIdAndDelete(existFavorite._id);
      await WineModel.findByIdAndUpdate(wineId, {
        isFavorite: false,
      });
      res.status(200).json({ success: true, message: "delete success" });
    } else {
      await WineModel.findByIdAndUpdate(wineId, {
        isFavorite: true,
      });
      await newFavorite.save();
      res.status(200).json({
        success: true,
        message: "add success",
        data: newFavorite,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "add failed" });
  }
};
export const getFavortieWine = async (req, res) => {
  const userId = req.params.userId;
  try {
    const favoritesWines = await FavoriteModel.find({
      userId: userId,
    }).populate("wineId");
    res
      .status(200)
      .json({ success: true, message: "get success", data: favoritesWines });
  } catch (error) {
    res.status(400).json({ success: false, message: "get failed" });
  }
};
export const getDefaultStauts = async (req, res) => {
  try {
    await WineModel.updateMany({
      isFavorite: false,
    });
    res.status(200).json({ success: true, message: "success" });
  } catch (error) {
    res.status(400).json({ success: false, message: "failed" });
  }
};
