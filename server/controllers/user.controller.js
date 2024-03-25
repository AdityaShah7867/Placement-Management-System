import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, Branch, year, rollno } = req.body;
    // console.log(req.body)
    // const file = req.file;
    // console.log(file)
    if (!name || !email || !password || !Branch || !year || !rollno)
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      Branch,
      year,
      rollno,
      resume: {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
      },
    });
    res
      .status(201)
      .json({ user, success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res
      .status(200)
      .json({
        user,
        token,
        success: true,
        message: "User logged in successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


