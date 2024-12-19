const ErrorHandler = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");
const { DeleteFiles } = require("../../middleware/multerUploader");
const Instructor = require("../../model/instructor");

//---------------------------profile update two type----------------------------------------

exports.ProfileUpdate = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const {
      mobile_No,
      add_availability,
      add_bio,
      add_tagline,
      experience,
      history,
      keywords,
      first_session,
      frist_classType,
      private_classType,
      private_session,
      certifications,
      instructorId,
    } = req.body;

    const profile_picture = req.files.profile_picture
      ? req.files.profile_picture[0]
      : [];
    const idproof = req.files.idproof ? req.files.idproof[0] : [];

    if (!instructorId) {
      return next(
        new ErrorHandler("instructoreId requried", StatusCodes.BAD_REQUEST)
      );
    }

    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return next(
        new ErrorHandler("instructore not found", StatusCodes.NOT_FOUND)
      );
    }

    let profile;
    let idproofimage;
    let statusvalue;

    if (profile_picture) {
      if (instructor.profile_picture) {
        DeleteFiles(instructor.profile_picture);
      }

      profile = profile_picture.path.replace(/\\/g, "/");
      //instructor.profile_picture = profile_picture.path.replace(/\\/g, "/");
    }

    if (idproof) {
      if (instructor.idproof) {
        DeleteFiles(instructor.idproof);
      }

      idproofimage = idproof.path.replace(/\\/g, "/");
      //instructor.certifications = certifications.path.replace(/\\/g, "/");
    }

    if (instructor.status === "accept") {
      statusvalue = "accept";
      //instructor.status = "accept";
    } else {
      statusvalue = "pending";
      //instructor.status = "pending";
    }

    // instructor.mobile_No = mobile_No;
    // instructor.add_availability = add_availability;
    // instructor.add_bio = add_bio;
    // instructor.add_tagline = add_tagline;
    // instructor.experience = experience;
    // instructor.history = history;
    // instructor.keywords = keywords;
    // instructor.first_session = first_session;
    // instructor.frist_classType = frist_classType;
    // instructor.private_classType = private_classType;
    // instructor.private_session = private_session;
    // instructor.profile_complete = 100;

    // const updateprofile = await instructor.save();
    // console.log(updateprofile)

    const updateprofile = await Instructor.findByIdAndUpdate(
      instructorId,
      {
        mobile_No,
        add_availability,
        add_bio,
        add_tagline,
        experience,
        history,
        keywords,
        first_session,
        frist_classType,
        private_classType,
        private_session,
        profile_picture: profile,
        certifications,
        idproof: idproofimage,
        status: statusvalue,
        profile_complete: 100,
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Instructor Profile update succesfully",
      code: StatusCodes.OK,
      data: updateprofile,
    });
  } catch (error) {
    console.log(error);
    return new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// -------------------------------------------------profile get-------------------------

exports.instructorProfile = async (req, res, next) => {
  try {
    const { instructorId } = req.params;
    console.log("=========>", instructorId);
    if (!instructorId) {
      return next(new ErrorHandler("instructor Id requried"));
    }
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return next(new ErrorHandler("instructor is not found"));
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Instructor Profile fetch successfully",
      code: StatusCodes.OK,
      data: instructor,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

// ---------------------------------------------profile remove---------------------------------
exports.instructordelete = async (req, res, next) => {
  try {
    const { instructorId } = req.params;
    if (!instructorId) {
      return next(
        new ErrorHandler("instructorId requried", StatusCodes.BAD_REQUEST)
      );
    }
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return next(
        new ErrorHandler("Instructor not found", StatusCodes.NOT_FOUND)
      );
    }

    if (instructor.profile_picture) {
      DeleteFiles(instructor.profile_picture);
    }
    const deletestudent = await Instructor.findByIdAndDelete(instructorId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Instructor remove successfully",
      code: StatusCodes.OK,
      data: deletestudent,
    });
  } catch (error) {
    return new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
