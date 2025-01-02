const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Dispute = new Schema(
  {
    // class_name: {
    //   type: String,
    //   required: true,
    // },
    Instructors_Name:{
        type:String,
        required:true
    },
    Dispute_Amount:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        required:true
    },
    Time_to_Respond:{
        type:String,
        required:true
    },
    Result:{
        type:String,
        required:true
    },
    Date_Closed:{
        type:String,
        required:true
    },
    Type_of_Dispute:{
        type:String,
        required:true
    },
    // Class:{
    //     type:String,
    //     required:true
    // },
    Raising_dispute:{
        type:String,
        required:true
    },
    Add_evidence:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Dispute",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Dispute", Dispute);
