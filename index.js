const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("./Connection/conn.js");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("listining");
});

const registerAPI = require("./Api/Register.js");
app.use(registerAPI);

const OtpVerificationAPI = require("./Api/OtpVerification.js");
app.use(OtpVerificationAPI);

const loginAPI = require("./Api/Login.js");
app.use(loginAPI);

const forgetAPI = require("./Api/Forgetpassword.js");
app.use(forgetAPI);

const NewPasswordAPI = require("./Api/newotpVerification.js");
app.use(NewPasswordAPI);


const tokenverificationAPI = require("./Api/tokenverification.js");
app.use(tokenverificationAPI);

app.listen(3001, (req, res) => {
  console.log("listining on port 3001");
});
