import WineModel from "../models/WineModel.js";

export const getWines = async (req, res) => {
  try {
    const wines = await WineModel.find().populate("reviews");
    res
      .status(200)
      .json({ success: true, message: "get success", data: wines });
  } catch (error) {
    res.status(500).json({ success: false, message: "get failed" });
  }
};
export const getWineDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const wineDetail = await WineModel.findById(id).populate("reviews");
    res
      .status(200)
      .json({ success: true, message: "get succees", data: wineDetail });
  } catch (error) {
    res.status(500).json({ success: false, message: "get failde" });
  }
};
export const getFeatured = async (req, res) => {
  try {
    const featured = await WineModel.find({ featured: true }).populate(
      "reviews"
    );
    res
      .status(200)
      .json({ success: true, message: "get success", data: featured });
  } catch (error) {
    res.status(500).json({ success: false, message: "get failed" });
  }
};
export const getTopRated = async (req, res) => {
  try {
    const topRated = await WineModel.find({ topRated: true }).populate(
      "reviews"
    );
    res
      .status(200)
      .json({ success: true, message: "get success", data: topRated });
  } catch (error) {
    res.status(500).json({ success: false, message: "get failed" });
  }
};
export const getWineBySearch = async (req, res) => {
  const size = parseInt(req.query.size);
  const age = parseInt(req.query.age);
  const min = parseInt(req.query.min);
  const max = parseInt(req.query.max);
  try {
    const wines = await WineModel.find({
      size,
      age,
      price: { $gte: min, $lte: max },
    }).populate("reviews");
    res
      .status(200)
      .json({ success: true, message: "search succes", data: wines });
  } catch (error) {
    res.status(500).json({ success: false, message: "not found" });
  }
};
