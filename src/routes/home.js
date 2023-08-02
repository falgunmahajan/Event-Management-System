const express=require("express");
const {signUp,signIn, adminSignin}=require("../handler/register.js");
const { registerCatering } = require("../handler/registerCatering.js");
const { getServiceData }=require("../handler/getService.js");
const { isLogin,loggedinServiceProvider} = require("../middleware/authorization.js");
const {addService, addServiceParameters, addServiceOptions}=require("../handler/admin.js");
const { getServicePage, addParameters, addOptions } = require("../handler/getServicePage.js");
const { serviceModel, optionsModel } = require("../models/adminSchema.js");
const { catering } = require("../models/catering.js");
const route= express.Router();
route.get('/admin',(req,res)=>{
    res.render("adminLogin")
})
route.get("/admin/dashboard",(req,res)=>{
    res.render("adminPanel")
})
route.get("/admin/dashboard/addService",(req,res)=>{
    res.render("addService")
})
route.get("/admin/dashboard/addParameters",addParameters)
route.get("/admin/dashboard/addOptions",addOptions)
route.get('/',async(req,res)=>{
    const services = await serviceModel.find({})
    res.render("index",{
    services:services})
})

route.get('/login',(req,res)=>{
    res.render("login")
})
route.get('/signup',(req,res)=>{
    res.render("signup")
})
route.get('/services',getServicePage)
route.get('/customer/services',isLogin,getServiceData)
route.get("/cateringData",async(req,res)=>{
    let serviceProvider=await catering.find({})
    res.json(serviceProvider)
})
route.get("/serviceData",async(req,res)=>{
    let servicesParameters=await optionsModel.find({Category:"Catering"})
    res.json(servicesParameters)
})
route.post('/signup',signUp);
route.post('/login',signIn);
route.post('/admin',adminSignin)
route.post('/catering',loggedinServiceProvider,registerCatering)
route.post("/admin/dashboard/addService",addService)
route.post("/admin/dashboard/addParameters",addServiceParameters)
route.post("/admin/dashboard/addOptions",addServiceOptions)
module.exports=route;