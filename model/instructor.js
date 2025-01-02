const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Instructor = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      required: false,
    },
    idproof: {
      type: String,
      required: false,
    },
    mobile_No: {
      type: Number,
      required: false,
    },
    add_availability: {
      type: Date,
      required: false,
    },
    add_bio: {
      type: String,
      required: false,
    },
    add_tagline: {
      type: String,
      require: false,
    },
    experience: {
      type: String,
      required: false,
    },
    history: {
      type: String,
      required: false,
    },
    certifications: {
      type: String,
      required: false,
    },
    keywords: {
      type: String,
      required: false,
    },
    first_session: {
      type: Number,
      required: false,
    },
    frist_classType: {
      type: String,
      enum: ["Online", "FaceToFace"],
      required: false,
    },
    private_classType: {
      type: String,
      enum: ["Online", "FaceToFace"],
      required: false,
    },
    private_session: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["accept", "pending", "block"],
      required: false,
    },
    profile_complete: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "Instructor",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Instructor", Instructor);
