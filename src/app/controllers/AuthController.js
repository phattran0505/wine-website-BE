import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const email = req.body.email;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ success: false, message: "Email has been used !!" });
    }
    const newUser = new UserModel({
      username: req.body.username,
      email: email,
      password: hash,
      phone: req.body.phone,
      age: req.body.age,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "create account success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "create account failed",
    });
  }
};
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await UserModel.findOne({ email });
    // if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // if password is incorrect
    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      data: { ...rest },
      role,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "login failed" });
  }
};
