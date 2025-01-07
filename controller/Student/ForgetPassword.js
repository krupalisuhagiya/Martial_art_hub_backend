const ErrorHandler = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");
const Student = require("../../model/student");
const InstructorSendMail = require("../../util/InstructorEmailService");
const Otp = require("../../model/otp");
const bcrypt = require("bcrypt");

exports.SendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Email not found", StatusCodes.BAD_REQUEST));
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return next(new ErrorHandler("Student not found", StatusCodes.NOT_FOUND));
    }

    const otpGen = Math.floor(1000 + Math.random() * 9000);

    const otp = await Otp.create({
      email,
      otp: otpGen,
      studentId: student._id,
      otpsend: true,
      otpUsed: false,
      userType: student.role,
    });

    await InstructorSendMail({
      to: email,
      subject: "Martial-art-hub Forget Password Otp",
      htmlContent: `
          <html>
            <body>
              <h1 style="color:black;">ForgetPassword otp ${otp.otp}</h1>
            </body>
          </html>
        `,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Otp send succesfully",
      code: StatusCodes.CREATED,
      data: otp,
    });
  } catch (error) {
    return  next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
};

exports.resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Email not found", StatusCodes.BAD_REQUEST));
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return next(new ErrorHandler("Student not found", StatusCodes.NOT_FOUND));
    }

    const oldOtpFind = await Otp.findOne({
      email,
      studentId: student._id,
      otpsend: true,
      otpUsed: false,
      userType: student.role,
    });

    oldOtpFind.otpUsed = true;
    await oldOtpFind.save();

    const otpGen = Math.floor(1000 + Math.random() * 9000);

    const otp = await Otp.create({
      email,
      otp: otpGen,
      studentId: student._id,
      otpsend: true,
      otpUsed: false,
      userType: student.role,
    });

    await InstructorSendMail({
      to: email,
      subject: "Martial-art-hub Forget Password Otp",
      htmlContent: `
          <html>
            <body>
              <h1 style="color:red;">ForgetPassword otp ${otp.otp}</h1>
            </body>
          </html>
        `,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Student resendotp succesfully",
      code: StatusCodes.CREATED,
      data: student,
    });
  } catch (error) {
    return  next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
};

exports.otpVerification = async (req, res, next) => {
  try {
    const { otp, studentId } = req.body;

    if (!otp || !studentId) {
      return next(
        new ErrorHandler("Otp and studentId requried", StatusCodes.BAD_REQUEST)
      );
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ErrorHandler("Student not found", StatusCodes.NOT_FOUND));
    }

    const oldOtpFind = await Otp.findOne({
      email: student.email,
      studentId: studentId,
      otp: otp,
      otpsend: true,
      otpUsed: false,
      userType: student.role,
    });

    if (oldOtpFind) {
      await Otp.findByIdAndUpdate(
        oldOtpFind._id,
        { otpUsed: true },
        { new: true }
      );
    } else {
      return next(new ErrorHandler("Invalid Otp", StatusCodes.UNAUTHORIZED));
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Otp verify succesfully",
      code: StatusCodes.OK,
      data: oldOtpFind.studentId,
    });
  } catch (error) {
    return  next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
};

exports.NewPassword = async (req, res, next) => {
  try {
    const { NewPassword, confrim_password, studentId } = req.body;

    if (!studentId) {
      return next(
        new ErrorHandler("Student id requried", StatusCodes.BAD_REQUEST)
      );
    }

    if (NewPassword !== confrim_password) {
      return next(
        new ErrorHandler("Passwords not match", StatusCodes.NOT_ACCEPTABLE)
      );
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ErrorHandler("Student not found", StatusCodes.NOT_FOUND));
    }

    const convertPassword = await bcrypt.hash(NewPassword, 10);

    const updateStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        password: convertPassword,
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Password update succesfully",
      code: StatusCodes.OK,
      data: updateStudent,
    });
  } catch (error) {
    return  next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
};
