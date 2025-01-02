const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TimeSlote = new Schema(
  {
    classDate: {
      type: Date,
      required: true,
    },
    timeSlote: {
      type: [],
      required: true,
    },
    ClassType: {
      type: String,
      enum: ["Online", "FaceToFace"],
      required: true,
    },
    classrate: {
      type: Number,
      required: true
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true
    },
    role: {
      type: String,
      default: "TimeSlote",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TimeSlote", TimeSlote);
