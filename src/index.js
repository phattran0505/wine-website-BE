import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import WineRoutes from "./routes/wine.js";
import BlogRoutes from "./routes/blog.js";
import ContactRoutes from "./routes/contact.js";
import AuthRoutes from "./routes/auth.js";
import ReviewRoutes from "./routes/review.js";
import FavoriteRoutes from './routes/favorite.js'
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/wine-website");
    console.log("connect to database successfull");
  } catch (error) {
    console.log("connect to database failed");
  }
};

// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// routes
app.use("/api/v1/wines", WineRoutes);
app.use("/api/v1/blog", BlogRoutes);
app.use("/api/v1/contact", ContactRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/reviews", ReviewRoutes);
app.use("/api/v1/favorite", FavoriteRoutes);

app.listen(port, (req, res) => {
  connectDB();
  console.log("connect to server successfull");
});
