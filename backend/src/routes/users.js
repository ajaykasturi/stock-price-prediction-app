import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import "dotenv/config";
import registerInputValidator from "../middlewares/registerInputValidator.js";
const router = express.Router();

router.post("/signup", registerInputValidator, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User(req.body);
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 8640000,
    });
    return res.status(200).json({
      message: "signed up",
      userId: user._id,
      token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
