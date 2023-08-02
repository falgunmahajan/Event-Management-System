const mongoose=require("mongoose");
const adminSchema=new mongoose.Schema({
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true
    }
})
const schema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Contact:{
        type:Number,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    }
})
const admin =new mongoose.model("admin",adminSchema)
const serviceProvider=new mongoose.model("Service Provider",schema);
const Customer=new mongoose.model("Customer",schema)
admin.create({
    Email:"admin@gmail.com",
    Password:"admin"
})
module.exports={serviceProvider,Customer,admin}