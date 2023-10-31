const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    id:{
    type:String,
    unique:true
    },
    otp:Number
});

module.exports = mongoose.model("Otp",OtpSchema);