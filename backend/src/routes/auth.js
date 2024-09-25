import express from "express";
import authInputValidator from "../middlewares/authInputValidator.js";
import User from "../models/user.js";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.post("/signin", authInputValidator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Crendentials" });
    }
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Crendentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 8640000,
    });

    return res.json({
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
router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).json({ userId: req.userId });
});
router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});
export default router;
