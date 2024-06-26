import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  wineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wines",
  },
  // isFavorite: {
  //   type: Boolean,
  //   default: false,
  // },
});

const FavoriteModel = mongoose.model("favorites", FavoriteSchema);
export default FavoriteModel;
