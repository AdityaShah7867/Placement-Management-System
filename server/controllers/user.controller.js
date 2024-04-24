import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, Branch, year, rollno } = req.body;

    if (!req.file) {
      return res.status(401).json("No file uploaded");
    }

    // console.log(req.file);
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
      resume: req.file.filename,
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
    res.status(200).json({
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
    // Check if req.userId is valid
    console.log("User ID:", req.userId);

    // Find the user by ID and populate the 'applications' field
    const user = await User.findById(req.userId).populate("applications");

    // Check if user is found
    if (!user) {
      console.log("User not found");
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // Log the populated user
    // console.log("Populated User:", user);

    // Send the populated user in the response
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


export const adminSignup= async(req,res)=>{
  try {
    const {email,Branch,name,password}=req.body;
    console.log(req.body)
    if(!email || !Branch || !name || !password){
      return res.status(400).json({message:"Please fill all the fields",success:false});
    }
    const existinguser = await User.findOne({ email });
    if (existinguser){
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    // console.log(existinguser)/
    const isAdmin=true;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      Branch,
      isAdmin
    });
    return res.status(201).json({user,success:true,message:"Admin created successfully"});
  } catch (error) {
    return res.status(500).json({ message: error.message,success: false});
  }
}
