const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Student = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    profile_complete: {
      type: Number,
      required: true,
    },
    aboutMe: {
      type: String,
      required: false,
    },
    additionlDetail: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "Student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", Student);
