const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const app = express();
// cors 허용
app.use(cors());

// mongoose 연결
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("connected to database"));

module.exports = app