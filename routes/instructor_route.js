const express = require("express");
const {
  InstructorSignup,
  InstructorLogin,
  genratetokan,
} = require("../controller/Instructor/auth");
const { uploadFile } = require("../middleware/multerUploader");
const { ProfileUpdate, instructorProfile, instructordelete } = require("../controller/Instructor/profile");
const { VERYFY_JWT_INSTRUCTOR } = require("../middleware/jwt");
const { InstructorDetailsWithComparisonOprator, regularExptession, logicalOprator } = require("../controller/Instructor/mongodboprations");


const router = express.Router();

//instructor authntication
router.post("/instructor/signup", InstructorSignup);
router.post("/instructor/login", InstructorLogin);

//instructor profile
router.put("/instructor/profile/update",VERYFY_JWT_INSTRUCTOR,uploadFile("asstes/instructor/profile_picture").fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "idproof", maxCount: 1 },
  ]),
  ProfileUpdate
);

router.get("/instructor/profile/get/:instructorId",VERYFY_JWT_INSTRUCTOR,instructorProfile);
router.delete("/instructor/profile/remove/:instructorId",VERYFY_JWT_INSTRUCTOR,instructordelete)
router.post("/instructor/tokangenrate/:instructorId",genratetokan)

router.get("/instructor/compar/used",InstructorDetailsWithComparisonOprator)
router.get("/instructor/regular",regularExptession)
router.post("/instructor/logical",logicalOprator)
module.exports = router;


