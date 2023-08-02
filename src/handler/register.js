
const {serviceProvider,Customer,admin}=require("../models/usermodel.js");
const {setToken} = require("../../jwt.js")
const signUp=async(req,res)=>{
    console.log("post request")
let data=req.body;
console.log(data)
if(data.Role==='Service Provider')
{
    const user=await serviceProvider.findOne({Email:data.Email})
    if(!user)
    {
        await serviceProvider.create({
            Name:data.Name,
            Contact:data.Contact,
            Email:data.Email,
            Password:data.Password
        })
        res.redirect("/login")
    }
    else{
        res.render("signup",{
            errormsg:true
        })
    }
 
}
if(data.Role==='Customer')
{
    const user=await Customer.findOne({Email:data.Email})
    if(!user)
    {
  await  Customer.create({
        Name:data.Name,
        Contact:data.Contact,
        Email:data.Email,
        Password:data.Password
    })
    res.redirect("/login")
}
else{
    res.render("signup",{
        errormsg:true
    })
}
}
}

const signIn=async(req,res)=>{
    let data=req.body;
console.log(data)
if(data.Role==='Service Provider')
{
   const user=await serviceProvider.findOne({Email:data.Email,Password:data.Password})
   console.log(user)
   if(user)
   {
   const token= setToken(user)
   console.log(token)
   res.cookie("id",token)
        res.redirect("/services")
   }
   else{
    res.render("login",{
        errormsg:true
    })
}
    
}
if(data.Role==='Customer')
{
    const user=await Customer.findOne({Email:data.Email,Password:data.Password})
    if(user)
    {
        const token= setToken(user)
        console.log(token)
        res.cookie("id",token)
        res.redirect("/")

    }
    else{
        res.render("login",{
            errormsg:true
        })
    }
     
}
}
const adminSignin=async(req,res)=>{
    const data=req.body;
    const user=await admin.findOne({Email:data.Email,Password:data.Password})
    if(user)
    {
        res.redirect("/admin/dashboard")
    }
    else{
        res.render("adminLogin")
    }
}
module.exports={
 signUp,signIn,adminSignin
}