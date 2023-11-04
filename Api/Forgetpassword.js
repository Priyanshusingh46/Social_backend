const express = require("express");
const app = express();
const user = require("../Modules/User.js");
const otp = require("../Modules/OtpVerification.js");
const nodemailer = require("nodemailer");
const path = require("path");
const bcrypt = require("bcrypt");


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
        ", your new otp for email verification is " +
        otp +
        ". Thanks for Trusting us</p>",
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



const Forgetpassword = app.post("/forgetpassword", async (req, res) => {
  console.log("roll frontend", req.body.roll);
  const users = await user.find({ roll: req.body.roll });
  console.log(users[0]);
  if (users[0] === undefined) {
    res.status(404).send("users do not exist");
  } else {
    const new_otp = Math.floor(1000 + Math.random() * 9000);
    console.log(new_otp);
    /* Changing the new otp */
    let check_otp_table = await otp.find({ id: users[0]._id });

    try {
      const updateinfo = await otp.updateOne(
        { _id: check_otp_table[0]._id },
        {
          $set: { otp: new_otp },
        }
      );
    } catch (error) {
      console.log(error);
    }

    /* Sending mail to given roll no */

    emailVerification(new_otp, req.body.roll, users[0].name);

    /* Sending frontend users data that needs to be modified */

    res.send(users[0]);

  }
});

module.exports = Forgetpassword;
