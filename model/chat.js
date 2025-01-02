const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chat = new Schema(
  {
    message: {
      type: [],
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      reg: "Student",
      required: true,
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      reg: "Instructor",
      required: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    role: {
      type: String,
      default: "chat",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("chat", chat);
