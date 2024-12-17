require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// --------------------image live show -------------
// Route for serving images
app.get("/:folder1/:folder2/:folder3/:imagename", (req, res) => {
  const { folder1, folder2, folder3, imagename } = req.params;
  const filePath = path.join(__dirname, folder1, folder2, folder3, imagename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Error displaying image");
    }
  });
});
// -------------------------

// Routes
const student = require("./routes/student_route");
const instructor = require("./routes/instructor_route");
const errHandler = require("./error/error");

app.use('/api', student);
app.use('/api', instructor);

// Error handler
app.use(errHandler);

// Connect to MongoDB
mongoose.connect(process.env.MO_URL)
  .then(() => {
    console.log("Database Connected!");

    app.listen(4000,() => {
      console.log("Srever was runnig....")
    })
  })
  .catch((error) => {
    console.log(error);
  });
