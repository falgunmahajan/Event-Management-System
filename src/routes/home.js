const express=require("express");
const {signUp,signIn, adminSignin}=require("../handler/register.js");
const { registerCatering } = require("../handler/registerCatering.js");
const { getServiceData }=require("../handler/getService.js");
const { isLogin,loggedinServiceProvider} = require("../middleware/authorization.js");
const {addService, addServiceParameters, addServiceOptions, dashboard, getServiceCategories}=require("../handler/admin.js");
const { getServicePage, addParameters, addOptions } = require("../handler/getServicePage.js");
const { serviceModel, optionsModel } = require("../models/adminSchema.js");
const { catering } = require("../models/catering.js");
const { bookedCustomer } = require("../handler/BookedCustomer.js");
const { getCustomerBookingData, getServiceProviderBookingData, getServiceDetails } = require("../handler/getBookingData.js");
const route= express.Router();
route.get('/admin',(req,res)=>{
    res.render("adminLogin")
})
route.get("/admin/logout",(req,res)=>{
    res.redirect("/admin")
})
route.get("/admin/:service",dashboard)
route.get("/api/data/:service",getServiceCategories)
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
// route.get("/admin/service",getServiceCategories)
route.get('/login',(req,res)=>{
    res.render("login")
})
route.get('/signup',(req,res)=>{
    res.render("signup")
})
route.get('/signOut',(req,res)=>{
    res.clearCookie("id");
    res.redirect("/")
})
route.get('/services',loggedinServiceProvider,getServicePage)
route.get("/customer/services/payment",(req,res)=>{
    res.render("payment");
})
route.get('/customer/services',isLogin,getServiceData)
route.get("/cateringData",async(req,res)=>{
    let serviceProvider=await catering.find({})
    res.json(serviceProvider)
})
route.get("/serviceData",async(req,res)=>{
    let servicesParameters=await optionsModel.find({Category:"Catering"})
    res.json(servicesParameters)
})
route.get("/customer/booking",(req,res)=>{
    res.render("booking")
})
route.get("/serviceProvider/booking",(req,res)=>{
    res.render("serviceProvider")
})
route.get("/serviceProvider/addedservices",(req,res)=>{
    res.render("serviceProvider")
})
route.get('/serviceprovider/bookingData',loggedinServiceProvider,getServiceProviderBookingData)
route.get("/servicedetails",loggedinServiceProvider,getServiceDetails)
route.get('/customer/bookingData',loggedinServiceProvider,getCustomerBookingData)
route.get("/Cateringdetails",(req,res)=>res.render("Service_Agreement"))
route.post('/signup',signUp);
route.post('/login',signIn);
route.post('/admin',adminSignin)
route.post('/catering',loggedinServiceProvider,registerCatering)
route.post('/booking',loggedinServiceProvider,bookedCustomer)
route.post("/admin/dashboard/addService",addService)
route.post("/admin/dashboard/addParameters",addServiceParameters)
route.post("/admin/dashboard/addOptions",addServiceOptions)
module.exports=route;