const express = require("express");
const app = express();
const user = require("../Modules/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Login = app.post("/login", async (req,res)=>{
    const userroll = req.body.roll;
    const details = await user.find({roll:userroll});
    //console.log(details);

    const password = details[0].password;
    const isvaliduser = details[0].__v;
    const passwordChecker = await bcrypt.compare(req.body.password,password);

    if(isvaliduser===1 && passwordChecker )
    {

        // Token Generate 
       const userid = details[0]._id;
       //console.log("id==",userid);
       const token =  jwt.sign({id : userid}, "hellopriyanshu");
      // console.log("token", token);

       // Decoding the token;

       //const decoded_token = jwt.decode(token);

      // console.log("decode_token", decoded_token.id);
        
       res.status(200).send(token);


        




    }
    else{
        res.status(404).send("wrong user");
    }


})

module.exports = Login;