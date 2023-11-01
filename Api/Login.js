const express = require("express");
const app = express();
const user = require("../Modules/User.js");
const bcrypt = require("bcrypt");

const Login = app.post("/login", async (req,res)=>{
    const userroll = req.body.roll;
    const details = await user.find({roll:userroll});
    console.log(details);

    const password = details[0].password;
    const isvaliduser = details[0].__v;
    const passwordChecker = await bcrypt.compare(req.body.password,password);

    if(isvaliduser===1 && passwordChecker )
    {
        res.status(200).send("write user");
    }
    else{
        res.status(401).send("wrong user");
    }


})

module.exports = Login;