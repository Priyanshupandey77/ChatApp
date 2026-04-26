import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }
    const normalizedEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password is too short" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user._id);

    const { password: _, ...userData } = user._doc;
    res.json({ accessToken, user: userData });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "all fields are required" });
    }
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user._id);

    const { password: _, ...userData } = user._doc;
    res.json({ accessToken, user: userData });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
