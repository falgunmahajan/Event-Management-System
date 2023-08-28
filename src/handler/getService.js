
const { State } = require("country-state-city");
const { optionsModel } = require("../models/adminSchema");
const  {catering } = require("../models/catering");
console.log(catering)
const getServiceData=async(req,res)=>
{
    let query=req.query.service;
    console.log(query)
    let services=catering;
    console.log("services",services)
    let serviceProvider=await services.find({})
    let servicesParameters=await optionsModel.find({Category:"Catering"})
    
let states=State.getStatesOfCountry("IN")
// console.log(states)
    res.render("cateringShow",{
        states:states,
        serviceProvider:(serviceProvider),
        servicesParameters:servicesParameters

    })
    
}

module.exports={getServiceData}