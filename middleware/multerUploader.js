const multer = require('multer');
const fs = require("fs");
const path = require("path");

module.exports.uploadFile = (folderName) => {
  return multer({

    storage: multer.diskStorage({

      destination: (req, file, cb) => {
        fs.mkdirSync(path.resolve(folderName), { recursive: true });
        cb(null, folderName);
      },
      
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),

    fileFilter: (req, file, cb) => {
      const allowedMimes = ["image/jpeg", "image/png","image/jpg"];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(new Error("Invalid file type. Only image files are allowed."));
      }
    }
  });
};

module.exports.DeleteFiles = (filepath) => {
  const fullpath = path.join(__dirname,'..',filepath)
  console.log(fullpath)
  if(fs.existsSync(fullpath)){
    fs.unlinkSync(fullpath)
  }
}