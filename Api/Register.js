const express = require("express");
const app = express();
const user = require("../Modules/User.js");
const otp = require("../Modules/OtpVerification.js");
const nodemailer = require("nodemailer");
const path = require("path");
const bcrypt = require("bcrypt");

app.use("/files", express.static(path.join(process.cwd(), "./files")));

/* Setting the multer configuration*/
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationDir = path.join(process.cwd(), "./files");
    cb(null, destinationDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileNam = uniqueSuffix + file.originalname;
    req.fileId = fileNam;
    console.log(fileNam);
    cb(null, fileNam);
  },
});
const upload = multer({ storage });

/* Email verification function Sending email */

function emailVerification(otp, roll, name) {
  let email = roll.toString();
  email += "@iiitu.ac.in";
  console.log(email);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Configure your gmail by clicking on managing -> security and app
      port: 587,
      secure: false,
      requireTls: true,
      auth: {
        user: "priyanshusingh1877@gmail.com",
        pass: "zvwb yhut xzyl adae",
      },
    });

    const mailOption = {
      from: "priyanshusingh1877@gmal.com",
      to: email,
      subject: "Otp verification",
      html:
        "<p> Hii " +
        name +
        ", your otp for email verification is " +
        otp +
        ". Thanks for Registering</p>",
    };

    transporter.sendMail(mailOption, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail sent succesfull");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// upload.single("file") ->  ismai file frontend wala hai not conform

/* Post request for register */
const register = app.post(
  "/register",
  upload.single("file"),
  async (req, res) => {
    console.log(req.body);
    console.log(req.fileId);

    let newpassword = req.body.password;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log("jii", hashPassword);
    let users = new user({
      name: req.body.name,
      roll: req.body.roll,
      password: hashPassword,
      profilpic: req.fileId,
      isvalid: false,
    });
    let findUser = await user.find({ roll: req.body.roll });
    if (findUser.length != 0) {
      res.send(findUser[0]._id);
    } else {
      let result = await users.save();

      const num = Math.floor(1000 + Math.random() * 9000);
      let otptable = new otp({
        id: result._id,
        otp: num,
      });

      let otpresult = await otptable.save();
      emailVerification(num, req.body.roll, req.body.name);

      res.send(result._id);
    }
  }
);

module.exports = register;
