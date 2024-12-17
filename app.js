require("dotenv").config();
const express = require("express");
const cros = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();

app.use(cros());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// --------------------image live show -------------
app.get("/:folder1/:folder2/:folder3/:imagename", (req, res) => {
  const { folder1, folder2, folder3, imagename } = req.params;
  console.log(req.params);
  const filePath = path.join(__dirname, folder1, folder2, folder3, imagename);
  console.log(filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Error displaying image");
    }
  });
});
// -------------------------


const student = require("./routes/student_route");
const instructor = require("./routes/instructor_route");
const errHandler = require("./error/error");

app.use('/api',student);
app.use('/api',instructor);

app.use(errHandler);
mongoose
  .connect(process.env.MO_URL)
  .then(() => {
    console.log("Database Connected!");

    app.listen(4000, () => {
      console.log("Server was running...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
