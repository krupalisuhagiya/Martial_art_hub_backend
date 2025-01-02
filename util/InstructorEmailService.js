const nodemailer = require("nodemailer");
const ErrorHandler = require("../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");

require("dotenv").config();
const Transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.INSTRUCTOR_USER_EMIAL,
    pass: process.env.INSTRUCTOR_EMAIL_SEND_CODE,
  },
});

const InstructorSendMail = async ({ to, subject, htmlContent }) => {
  try {
    const response = await Transport.sendMail({
        from: process.env.INSTRUCTOR_USER_EMIAL,
        to: to,
        subject: subject,
        html: htmlContent,
    });
    console.log("email send succefully", response);
    return response;
  } catch (error) {
    console.log(error, "error sending email");
    throw new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
module.exports = InstructorSendMail;
