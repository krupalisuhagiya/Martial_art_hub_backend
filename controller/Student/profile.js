const Student = require("../../model/student");
const ErrorHandler = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");
const { DeleteFiles } = require("../../middleware/multerUploader");

// -----------------------------------------student first type update-------------------------------
// exports.ProfileUpdate = async (req, res, next) => {
//   try {
//     const { additionlDetail, aboutMe, studentId } = req.body;

//     if (!studentId) {
//       return next(
//         new ErrorHandler("Student id requried", StatusCodes.BAD_REQUEST)
//       );
//     }
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return next(new ErrorHandler("student not found", StatusCodes.NOT_FOUND));
//     }

//     if (req.file) {
//       if (student.profile_picture) {
//         DeleteFiles(student.profile_picture);
//       }
//       student.profile_picture = req.file.path.replace(/\\/g, "/");
//     }

//     student.aboutMe = aboutMe;
//     student.additionlDetail = additionlDetail;

//     const updateprofile = await student.save();

//     return res.status(StatusCodes.OK).json({
//       success: true,
//       message: "Student Profile update succesfully",
//       code: StatusCodes.OK,
//       data: updateprofile,
//     });
//   } catch (error) {
//     return next(
//       new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
//     );
//   }
// };

// ----------------------------------------profile seconde type update------------------
exports.ProfileUpdate = async (req, res, next) => {
  try {
    const { additionlDetail, aboutMe, studentId } = req.body;
    const profile_picture = req.file;

    if (!studentId) {
      return next(
        new ErrorHandler("Student id requried", StatusCodes.BAD_REQUEST)
      );
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ErrorHandler("student not found", StatusCodes.NOT_FOUND));
    }

    let profile;

    if (profile_picture) {
      if (student.profile_picture) {
        DeleteFiles(student.profile_picture);
      }
      profile = profile_picture.path.replace(/\\/g, "/");
    }
    console.log(profile);

    const updateprofile = await Student.findByIdAndUpdate(
      studentId,
      {
        additionlDetail,
        aboutMe,
        profile_complete: 100,
        profile_picture: profile,
      },
      { new: true }
    );
    console.log(updateprofile);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student Profile update succesfully",
      code: StatusCodes.OK,
      data: updateprofile,
    });
  } catch (error) {
    return new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// ---------------------------------profile get---------------------------------

exports.studentProfile = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    console.log("============>", studentId);

    if (!studentId) {
      return next(
        new ErrorHandler("Student id requried", StatusCodes.BAD_REQUEST)
      );
    }
    console.log(req.student._id)

    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ErrorHandler("Student not found", StatusCodes.NOT_FOUND));
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student Profile fetch succesfully",
      code: StatusCodes.OK,
      data: student,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

// ----------------------------------student profile delet------------------------------------

exports.studentdelete = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return next(
        new ErrorHandler("Student id requried", StatusCodes.BAD_REQUEST)
      );
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ErrorHandler("Student not found", StatusCodes.NOT_FOUND));
    }

    if (student.profile_picture) {
      DeleteFiles(student.profile_picture);
    }

    const deletestudent = await Student.findByIdAndDelete(studentId);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student remove succesfully",
      code: StatusCodes.OK,
      data: deletestudent,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

