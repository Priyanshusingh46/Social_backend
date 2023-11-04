const express = require("express");
const app = express();
const user = require("../Modules/User.js");
const otp = require("../Modules/OtpVerification.js")
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const newotpVerification = app.post("/newotpVerification",async (req,res)=>{
    console.log(req.body.otp);

    const otp_table =  await otp.find({id:req.body.id});
    console.log("otp_table",otp_table[0])

   if(otp_table[0].otp == req.body.otp)
   {
     console.log("otp matches matches");
     const hashPassword = await bcrypt.hash(req.body.password, 10);

     console.log("new hassed password", hashPassword);

     /* update password */

     const user_table = await user.find({_id:req.body.id});

     console.log("user",user_table[0]);

     try {
        const updateinfo = await user.updateOne(
          { _id: user_table[0]._id },
          {
            $set: { 
            password: hashPassword,
            __v:1

            },
          }
        );
      } 
      catch (error) {
        console.log(error);
      }
 
      res.send("updated the value");
   }

   else{
    res.status(404).send("Wrong OTP");
   }


});

module.exports = newotpVerification;