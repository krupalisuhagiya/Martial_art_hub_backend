const Student = require("../../model/student");
const ErrorHandler = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");

exports.StudentDetailsWithComparisonOprator = async (req, res, next) => {
  try {
    const { percentage } = req.query;

    const student = await Student.find({ profile_complete:{ $gte:percentage }}).limit(3).skip(2).sort({email:1})

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "student serached succesfully",
      code: StatusCodes.OK,
      data: student
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
};

exports.regularExptession = async(req,res,next) => {
  try {
    const {name} = req.query

    const student = await Student.find({name:{$regex:name,$options:'i'}})

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "student serached succesfully",
      code: StatusCodes.OK,
      data: student
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}

exports.logicalOprator = async(req,res,next) => {
  try {
    const {name,email} = req.body

    const student = await Student.find({$and:[{name},{email}]})

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "student serached succesfully",
      code: StatusCodes.OK,
      data: student
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
}



