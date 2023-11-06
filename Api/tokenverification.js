const express = require("express");
const app = express();
const user = require("../Modules/User.js");
const otp = require("../Modules/OtpVerification.js");
const nodemailer = require("nodemailer");
const path = require("path");
const bcrypt = require("bcrypt");

const tokenverification = app.get("/tokenverification",(req,res)=>{
    console.log("token verification", req.body);
    res.send("true user");
})

module.exports = tokenverification;