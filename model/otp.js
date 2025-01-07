const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Otp = new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    studentId:{
        type:Schema.Types.ObjectId,
        ref:'Student',
        required:false
    },
    instructorId:{
        type:Schema.Types.ObjectId,
        ref:'Instructor',
        required:false
    },
    otpsend:{
        type:Boolean,
        required:true
    },
    otpUsed:{
        type:Boolean,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'Otp'
    }
},{timestamps:true})


module.exports = mongoose.model('Otp',Otp)
