const {serviceModel,parameterModel,optionsModel}=require("../models/adminSchema.js");
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
res.send(result);
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
module.exports={addService,addServiceParameters,addServiceOptions}