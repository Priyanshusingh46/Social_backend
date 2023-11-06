const express = require("express");
const app = express();
const user = require("../Modules/User.js");
const otp = require("../Modules/OtpVerification.js");
const nodemailer = require("nodemailer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tokenverification = app.post("/tokenverification",async (req,res)=>{
    try {
        const my_token = req.body.token;
       // console.log(my_token);

        const id = jwt.decode(my_token);

        const userid = id.id;

        //console.log("id==",userid);


        const isuser =  await user.find({_id:userid});
      //  console.log("isuser",isuser);

        if(isuser)
        {
            //console.log("if loop");
            res.status(200).send("got the user")
        }
        else{
        res.status(404).send("Wrong token");
        }


    } catch (error) {
        console.log("token error", error);
        res.status(404).send("wrong credintial");
    }
})

module.exports = tokenverification;