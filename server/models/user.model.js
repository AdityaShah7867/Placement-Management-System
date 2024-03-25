import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    Branch: {
      type: String,
      default: "",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Placement",
      },
    ],
    year: {
      type: String,
      required: true,
    },
    rollno: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
