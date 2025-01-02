const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Message = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accept", "decline"],
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    role: {
      type: String,
      default: "Message",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", Message);
