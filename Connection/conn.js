/**/

const mongoose = require("mongoose");
const DB = 'mongodb+srv://priyanshu:priya123@cluster0.cll8ndo.mongodb.net/'

mongoose.connect(DB).then(()=>{
    console.log("connection Succesful");
}).catch((err)=>{
    console.log(err);
})

module.exports = mongoose.connection;