const nodemailer = require("nodemailer");
const ErrorHandler = require("../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

const Transport = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_SEND_CODE,
  },
});

const sendMail = async ({ to, subject, htmlContent }) => {
  try {
    const response = await Transport.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = sendMail;