const mongoose= require("mongoose");
const serviceSchema=new mongoose.Schema({
    Name:
    {
    type:String,
    required:true
    },
    Image_url:
    {
    type:String,
     required:true
     }
  })

  const parametersSchema=new mongoose.Schema({
    Category:
    {
    type:String,
    required:true
    },
    Parameter:
    {
    type:[{value:{
      type:String
    }}],
     required:true
     }
  })

  const optionsSchema=new mongoose.Schema({
    Category:
    {
    type:String,
    required:true
    },
    Parameter:
    {
    type:String,
     required:true
     },
     Option:
     {
    type:[],
     required:true
     }
  })
  const serviceModel=new mongoose.model("Service Model",serviceSchema); 
  const parameterModel=new mongoose.model("Parameter Model",parametersSchema);
  const optionsModel=new mongoose.model("Service Options",optionsSchema); 
  module.exports= {serviceModel,parameterModel,optionsModel};