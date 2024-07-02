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
  try {
    const size = req.query.size ? parseInt(req.query.size) : undefined;
    const age = req.query.age ? parseInt(req.query.age) : undefined;
    const min = req.query.min ? parseInt(req.query.min) : undefined;
    const max = req.query.max ? parseInt(req.query.max) : undefined;

    // Tạo đối tượng filter
    let filter = {};

    if (size) filter.size = size;
    if (age) filter.age = age;
    if (min !== undefined && max !== undefined) {
      filter.newPrice = { $gte: min, $lte: max };
    }
    const wines = await WineModel.find(filter).populate("reviews");
    res
      .status(200)
      .json({ success: true, message: "search succes", data: wines });
  } catch (error) {
    res.status(500).json({ success: false, message: "not found" });
  }
};
