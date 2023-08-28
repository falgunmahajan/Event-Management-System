const { State } = require("country-state-city");
const  {serviceModel, parameterModel } = require("../models/adminSchema");
const { serviceProvider } = require("../models/usermodel");
const getServicePage=async(req,res)=>{
    console.log(req.user)
    let query=req.query.service;
    console.log(req.user._id)
    await serviceProvider.findByIdAndUpdate(req.user._id,{$set:{Service:query}})
    
    let states=State.getStatesOfCountry("IN")
   if(query)
   {
       res.render(query,{
        states:states
       })
   }
   else{
    const services = await serviceModel.find({})
       res.render("services",{
        services:services
        
       })
   }
}
const addParameters=async(req,res)=>{
    const services = await serviceModel.find({})
    console.log(services)
        res.render("AdminAddParameter",{
            services:services
        })
}

const addOptions = async(req,res)=>{
    const parameters = await parameterModel.find({}) 
    res.render("AdminAddOptions",{
        parameters:parameters
    })
}
module.exports={getServicePage,addParameters,addOptions}