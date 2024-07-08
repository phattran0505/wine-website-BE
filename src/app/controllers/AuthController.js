import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { mailService } from "../../services/MailService.js";
import UserModel from "../models/UserModel.js";

export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const email = req.body.email;
  const age = req.body.age;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ success: false, message: "Email has been used !!" });
    }
    if (age < 18) {
      return res
        .status(400)
        .json({ success: false, message: "Age is not allowed" });
    }
    const newUser = new UserModel({
      username: req.body.username,
      email: email,
      password: hash,
      phone: req.body.phone,
      age: age,
    });
    await newUser.save();
    await mailService({
      email: email,
      subject: "Register Success 🎉",
      html: "<b>Welcome to my website. Wish you have a good experience. </b>",
    });
    res.status(200).json({
      success: true,
      message: "Register success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Create account failed",
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
        .json({ success: false, message: "Incorrect password" });
    }

    const { password, role, ...rest } = user._doc;

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 3 }
    );
    res.status(200).json({
      success: true,
      data: { ...rest },
      role,
      token,
      expiresIn: 180,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
export const resetPassworrd = async (req, res) => {
  const { newPass, confirmPass, email } = req.body;
  try {
    const comparePassword = bcrypt.compare(newPass, confirmPass);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password doesn't match" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(newPass, salt);
    const newUser = await UserModel.findOneAndUpdate({
      email,
      password: hashPass,
    });
    return res.status(200).json({
      success: true,
      message: "Update password success",
      data: newUser,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Update password faile", err: error });
  }
};
