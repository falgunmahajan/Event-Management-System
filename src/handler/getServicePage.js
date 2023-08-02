const  {serviceModel, parameterModel } = require("../models/adminSchema");
const getServicePage=async(req,res)=>{
    let query=req.query.service;
   if(query)
   {
       res.render(query)
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