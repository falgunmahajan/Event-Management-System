const { BookedCustomer } = require("../models/BookedCustomerSchema")
const { catering } = require("../models/catering")

const { serviceProvider } = require("../models/usermodel")
const model={
    Catering:catering
}

const getCustomerBookingData=async(req,res)=>{
    console.log(req.user)
    const record=await BookedCustomer.find({CustomerId:req.user._id})
    if(record.length)
    {
        res.json({data:record})
    }
    else{
        res.json({msg:"You have not booked any services"})
    }
}
const getServiceProviderBookingData=async(req,res)=>{
    const record=await BookedCustomer.find({ServiceProviderId:req.user._id})
    if(record.length)
    {
        res.json({data:record})
    }
    else{
        res.json({msg:"Your services is not booked"})
    }
}

const getServiceDetails=async(req,res)=>{
    console.log(req.user)
    const user=await serviceProvider.findOne({_id:req.user._id})
    console.log(user)
    if(user.Service)
   { let service;
   Object.keys(model).map(key=>{
    if(user.Service===key){
     service = model[key];
    }
   })
   const record= await service.find({ServiceAddedBy:user._id})
   if(record.length)
   {
    res.json({data:record,Service:user.Service})
   }
   else{
    res.json({msg:"You have not added any service"})
   }
    }
    else{
        {
            res.json({msg:"You have not added any service"})
           }
    }
}
module.exports={getCustomerBookingData,getServiceProviderBookingData,getServiceDetails}