const express = require("express");
const {
  studentSignup,
  studentLogin,
  genrateTokenStudent,
} = require("../controller/Student/auth");
const {
  ProfileUpdate,
  studentProfile,
  studentdelete,
} = require("../controller/Student/profile");
const { uploadFile } = require("../middleware/multerUploader");
const { VERYFY_JWT_STUDENT } = require("../middleware/jwt");
const { StudentDetailsWithComparisonOprator, regularExptession, logicalOprator } = require("../controller/Student/mongodboprations");
const { SendOtp, resendOtp, otpVerification, NewPassword } = require("../controller/Student/ForgetPassword");

const router = express.Router();

//Student authntication
router.post("/student/signup", studentSignup);
router.post("/student/login", studentLogin);

//Student profiles
router.put("/student/profile/update",VERYFY_JWT_STUDENT,uploadFile("asstes/student/profile_picthur").single("profile_picture"),ProfileUpdate);
router.get("/student/profile/get/:studentId", VERYFY_JWT_STUDENT, studentProfile);
router.delete("/student/remove/:studentId", VERYFY_JWT_STUDENT, studentdelete);

router.post("/student/tokangenrate", genrateTokenStudent);


//for leraning 

router.get('/student/compar/used',StudentDetailsWithComparisonOprator)
router.get('/student/regular',regularExptession)
router.post('/student/loficalopratoe',logicalOprator)

// forgot password
router.post("/student/forgot/password/sendotp",SendOtp)
router.post("/student/forgot/password/resendotp",resendOtp)
router.post("/student/forgot/password/otpVerification",otpVerification)
router.post("/student/newpassword",NewPassword)

module.exports = router;
