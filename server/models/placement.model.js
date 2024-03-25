import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Branch: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    criteria: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Placement = mongoose.model("Placement", placementSchema);
export default Placement;
