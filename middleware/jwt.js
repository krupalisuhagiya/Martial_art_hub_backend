const ErrorHandler = require("./errorHandler");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const Student = require("../model/student");
const Instructor = require("../model/instructor");

exports.VERYFY_JWT_STUDENT = async(req,res,next) => {
    try {
        let authHeader = req.headers.authorization;

        if(!authHeader){
            return next(new ErrorHandler("Please log in to access this resource",StatusCodes.UNAUTHORIZED))
        }

        const token = authHeader.split(' ')[1]

        const tokendata = jwt.verify(token, process.env.JWT_SECARET_STUDENT)
        console.log(tokendata)
        const { _id, role } = tokendata;

        let user;
        if(role === 'Student'){
            user = await Student.findById(_id)
            if(!user){
                return next(new ErrorHandler("Student not found",StatusCodes.NOT_FOUND))
            }

            req.student = { _id, role }
        } else {
            return next(new ErrorHandler("You will not access any resource",StatusCodes.UNAUTHORIZED))
        }

        console.log({ _id, role })

        next();

    } catch (error) {
        return next(new ErrorHandler("Invalid token, Please Log-Out and Log-In again", StatusCodes.UNAUTHORIZED));
    }
}


exports.VERYFY_JWT_INSTRUCTOR = async(req,res,next) => {
    try {
        let authHeader = req.headers.authorization;

        if(!authHeader){
            return next(new ErrorHandler("Please log in to access this resource",StatusCodes.UNAUTHORIZED))
        }

        const token = authHeader.split(' ')[1]

        const tokendata = jwt.verify(token, process.env.JWT_SECARET_INSTRUCTOR)
        console.log(tokendata)
        const { _id, role } = tokendata;

        let user;
         if(role === 'Instructor'){
            user = await Instructor.findById(_id)
            if(!user){
                return next(new ErrorHandler("Instructor not found",StatusCodes.NOT_FOUND))
            }

            req.instructor = { _id, role }
        } else {
            return next(new ErrorHandler("You will not access any resource",StatusCodes.UNAUTHORIZED))
        }

        console.log({ _id, role })

        next();

    } catch (error) {
        return next(new ErrorHandler("Invalid token, Please Log-Out and Log-In again", StatusCodes.UNAUTHORIZED));
    }
}




