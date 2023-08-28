const { BookedCustomer } = require("../models/BookedCustomerSchema.js");
const {serviceModel,parameterModel,optionsModel}=require("../models/adminSchema.js");
const { Customer, serviceProvider } = require("../models/usermodel.js");

const addService=async(req,res)=>{
var body=req.body;
console.log(body);

if(!body || !body.service_name|| !body.Url)
{
return res.status(400).json({msg:"All fields are required"})
}
const result=await serviceModel.create({
  Name:body.service_name,
  Image_url:body.Url
})
res.render("addService");
}
const addServiceParameters=async(req,res)=>{
  var body=req.body;
  console.log(body);
  
  if(!body || !body.category|| !body.parameters)
  {
  return res.status(400).json({msg:"All fields are required"})
  }
  const category=body.category
  const user = await parameterModel.findOne({Category:category})
  if(user)
  {
    console.log(user)
  await parameterModel.updateOne({
    Category:"Catering"
  },{
    $push:{Parameter:{value:body.parameters}}
  })
  res.render("AdminAddParameter",{
    msg:"Data is submitted"
  });
  }
  else{
    const result=await parameterModel.create({
      Category:body.category,
      Parameter:{value:body.parameters}
    })
  res.render("AdminAddParameter",{
    msg:"Data is submitted"
  });

  }
 
  }

  const addServiceOptions = async(req,res)=>{
    var body=req.body;
console.log(body);

if(!body || !body.Category|| !body.Parameters||!body.Options)
{
return res.status(400).json({msg:"All fields are required"})
}
const result=await optionsModel.create({
  Category:body.Category,
  Parameter:body.Parameters,
  Option:body.Options
})
res.render("AdminAddOptions",{
  msg:"Data is submitted"
});
}

const dashboard=async(req,res)=>{
  // const service=req.params.service;
  
  const services = await serviceModel.find({})
  const customers = await Customer.find({})
  const serviceProviders=await serviceProvider.find({})
  const bookedCustomer=await BookedCustomer.find({})
  res.render("adminPanel",{
    serviceLength:services.length,
    customerLength:customers.length,
    serviceProviderLength:serviceProviders.length,
    bookedCustomerLength:bookedCustomer.length
  })
}

const getServiceCategories=async(req,res)=>{
let params=req.params.service;
console.log(params)
if(params=="service")
{
  const services=await serviceModel.find({})
  console.log(services)
  res.json(services)
}
if(params=="customer")
{
  const customers=await Customer.find({})
  console.log(customers)
  res.json(customers)
}
if(params=="serviceprovider")
{
  const serviceprovider=await serviceProvider.find({})
  console.log(serviceprovider)
  res.json(serviceprovider)
}
if(params=="bookedCustomer")
{
  const bookedcustomer=await BookedCustomer.find({})
  console.log(bookedcustomer)
  res.json(bookedcustomer)
}
}
module.exports={addService,addServiceParameters,addServiceOptions,dashboard,getServiceCategories}