const express = require("express");
const app = express();
const user = require("../Modules/User.js");
const otp = require("../Modules/OtpVerification.js")
const nodemailer = require("nodemailer");


const otpVerification = app.post("/otpVerification",async (req,res)=>{
    const valueotp =  await otp.find({id:req.body.id});
    if(valueotp[0].otp == req.body.otp){
    try {
        const updateinfo = await user.updateOne({_id:req.body.id},{
            $set:{__v:1}
        });
    } catch (error) {
        console.log(error)
    }

    res.send("Data updated");
}
else{
    res.send("Invalid Otp");
}

});

module.exports = otpVerification;