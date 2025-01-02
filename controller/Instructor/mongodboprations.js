const Instructor = require("../../model/instructor");
const ErrorHandler = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");

exports.InstructorDetailsWithComparisonOprator = async (req,res,next) => {
  try {
    const { percentage } = req.query;
    const instructor = await Instructor.find({
      profile_complete: { $gte: percentage },
    })
      .limit(3)
      .skip(2)
      .sort({ email: 1 });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Instructor serched succefully",
      code: StatusCodes.OK,
      date: instructor,
    });
  } catch (error) {
    return new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.regularExptession = async (req, res, next) => {
  try {
    const { email } = req.query;
    const instructor = await Instructor.find({
      email: { $regex: `^${email}`, $options: "i" },
    }); ///first latter metch in find

    // const instructor = await Instructor.find({email: { $regex: email, $options: "i" }}); //any latter metch in find

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Instructor serched succefully",
      code: StatusCodes.OK,
      data: instructor,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.logicalOprator = async (req, res, next) => {
  try {
    const { email, profile_complete } = req.body;
    const instructor = await Instructor.find({$and: [{ email }, { profile_complete }],
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Instructor searched succesfully",
      code: StatusCodes.OK,
      data: instructor,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};
