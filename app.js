const express= require("express");
const cookieParser = require("cookie-parser");
const hbs= require("hbs");
const mongoose=require("mongoose");
const app=express();
const route=require("./src/routes/home.js")
mongoose.connect('mongodb://127.0.0.1:27017/EventManagementSystem').then(()=>{
    console.log("Database Successfully connected")
})
const {serviceProvider,Customer,admin}=require("./src/models/usermodel.js");
const {catering}=require("./src/models/catering.js");
const {serviceModel,parameterModel,optionsModel} = require('./src/models/adminSchema.js');
app.listen(3000,()=>{
    console.log("The app is listening at port 3000");
})
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use('/static',express.static('public'));
app.use('',route);
app.set("view engine","hbs");
app.set("views","views");

hbs.registerPartials("views/partials")
