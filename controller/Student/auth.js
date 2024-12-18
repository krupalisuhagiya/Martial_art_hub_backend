const Student = require("../../model/student");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

exports.studentSignup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password, confrim_password } = req.body;

    if (!name || !email || !password || !confrim_password) {
      return next(
        new ErrorHandler("All filds are requeid", StatusCodes.BAD_REQUEST)
      );
    }
    const alredyExits = await Student.findOne({ email: email });
    console.log(alredyExits);
    if (alredyExits) {
      return next(
        new ErrorHandler(
          "Email alredy exits try diffrentOne",
          StatusCodes.CONFLICT
        )
      );
    }
    if (password != confrim_password) {
      return next(new ErrorHandler("not match", StatusCodes.NOT_ACCEPTABLE));
    }
    const hasshpaword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hasshpaword,
      profile_complete: 50,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Student signup succesfully",
      code: StatusCodes.CREATED,
      data: student,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.studentLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorHandler("All fiedl are requried", StatusCodes.BAD_REQUEST)
      );
    }
    const student = await Student.findOne({ email });
    if (!student) {
      return next(new ErrorHandler("Signup first", StatusCodes.NOT_FOUND));
    }
    const orginalPaaword = await bcrypt.compare(password, student.password);
    if (!orginalPaaword) {
      return next(
        new ErrorHandler(
          "Email and password not match",
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    const Token = jwt.sign(
      {
        _id: student._id,
        role: student.role,
      },
      process.env.JWT_SECARET_STUDENT,
      { expiresIn: "3h" }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student login succesfully",
      code: StatusCodes.OK,
      data: student,
      Token,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

exports.genrateTokenStudent = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ErrorHandler("student not found", StatusCodes.NOT_FOUND));
    }
    const Tokengenrate = jwt.sign(
      {
        email: student.email,
        role: student.role,
      },
      process.env.JWT_SECARET_STUDENT,
      {
        expiresIn: "1d",
      }
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Tokan genrate succesfully",
      code: StatusCodes.OK,
      data: student,
      Tokengenrate,
    });

  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

//studentId throw find in Student collections
//then afer genrate token using jwt
//first paramertr email,role
//second paramaerter secrest key
//thried paramter exprinin 1d
