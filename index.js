const express = require("express");
const cors = require('cors');
require("./Connection/conn.js");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("listining");
});

const registerAPI = require("./Api/Register.js");
app.use(registerAPI);

const OtpVerificationAPI = require("./Api/OtpVerification.js");
app.use(OtpVerificationAPI);

const loginAPI = require("./Api/Login.js");
app.use(loginAPI);

app.listen(3001, (req,res)=>{
    console.log("listining on port 3001");
})