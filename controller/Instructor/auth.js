const Instructor = require("../../model/instructor");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { findById } = require("../../model/student");

exports.InstructorSignup = async (req, res, next) => {
  try {
    const { email, password, confirm_password } = req.body;
    if (!email || !password || !confirm_password) {
      return next(
        new ErrorHandler("All fiedls are requied", StatusCodes.BAD_REQUEST)
      );
    }
    const alredyExits = await Instructor.findOne({ email: email });
    if (alredyExits) {
      return next(
        new ErrorHandler(
          "Email alredy exits try diffrentOne",
          StatusCodes.CONFLICT
        )
      );
    }
    if (password != confirm_password) {
      return next(
        new ErrorHandler("password not match", StatusCodes.NOT_ACCEPTABLE)
      );
    }

    const changepassword = await bcrypt.hash(password, 10);
    const instructor = await Instructor.create({
      email,
      password: changepassword,
      profile_complete: 50,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Student Signup succesfully",
      code: StatusCodes.CREATED,
      data: instructor,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.InstructorLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new ErrorHandler("all fild are requied", StatusCodes.BAD_REQUEST)
      );
    }
    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      return next(new ErrorHandler("signup first", StatusCodes.NOT_FOUND));
    }
    const orginalPaasword = await bcrypt.compare(password, instructor.password);
    if (!orginalPaasword) {
      return next(
        new ErrorHandler(
          "email and password not match",
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    const Token = jwt.sign(
      {
        _id: instructor._id,
        role: instructor.role,
      },
      process.env.JWT_SECARET_INSTRUCTOR,
      { expiresIn: "3h" }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "login successfully",
      code: StatusCodes.OK,
      data: instructor,
      Token,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.genratetokan = async (req, res, next) => {
  try {
    const { instructorId } = req.body;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {return next(new ErrorHandler("instructor not found",StatusCodes.NOT_FOUND));
    }
    const tokangenrate =jwt.sign({
        email: instructor.email,
        role: instructor.role,
      },
      process.env.JWT_SECARET,
      {
        expiresIn: "1d",
      });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Tokan Genrate successfully",
      code: StatusCodes.OK,
      data: instructor,
      tokangenrate,
    });
  } catch (error) {
    new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
