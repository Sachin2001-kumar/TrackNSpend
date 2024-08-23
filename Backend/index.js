const express=require("express");
const mongoose = require('mongoose'); 
const cors=require("cors");
const { db } = require("./db/db");
const {readdirSync} = require('fs')
require('dotenv').config();



const app=express();
app.use(cors());
app.use(express.json());
const Port=process.env.PORT || 5000;

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


app.listen(Port,(req,res)=>{
    db()
    console.log(`Server Listen at Port: ${Port}`);
})
