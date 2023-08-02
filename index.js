const express = require("express");
const mongoose= require("mongoose");
const app = express();
const path = require("path");
const {
  serviceSchema,
  parametersSchema,
  optionsSchema
} = require('./userData');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, ""));  


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});


mongoose.connect("mongodb://127.0.0.1:27017/service").then(()=>console.log("DataBase Connected")).catch((err)=>console.log("Mongo Error",err));



app.get("/add", (req, res) => {
  res.render("addService.hbs");
  });

const userData=mongoose.model("userData",serviceSchema); 
app.post("/add", async(req,res)=>
{
var body=req.body;
console.log(body);

if(!body || !body.service_name|| !body.Url)
{
return res.status(400).json({msg:"All fields are required"})
}
const result=await userData.create({
  Name:body.service_name,
  Image_url:body.Url
})
res.send(result);
})

app.get("/addParameters", (req, res) => {
  res.render("AdminAddParameter.hbs");
  });

    
    const serviceParameters=mongoose.model("serviceParameters",parametersSchema); 

   app.post("/addParameters", async(req,res)=>
{
var body=req.body;
console.log(body);

if(!body || !body.category|| !body.parameters)
{
return res.status(400).json({msg:"All fields are required"})
}
const result=await serviceParameters.create({
  Category:body.category,
  Parameter_Name:body.parameters
})
res.send(result);
})

app.get("/addOptions", (req, res) => {
  res.render("AdminAddOptions.hbs");
  });


  
  const parameterOptions=mongoose.model("serviceOptions",optionsSchema); 

  app.post("/addOptions", async(req,res)=>
{
var body=req.body;
console.log(body);

if(!body || !body.Category|| !body.Parameters||!body.Options)
{
return res.status(400).json({msg:"All fields are required"})
}
const result=await parameterOptions.create({
  Category:body.Category,
  Parameter:body.Parameters,
  Option:body.Options
})
res.send(result);
})