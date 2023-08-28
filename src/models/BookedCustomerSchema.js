const mongoose = require("mongoose");

const schema=new mongoose.Schema({
    ServiceName:{
        type:String,
        required:true
    },
    ServiceProviderId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "service providers",
      required:true
    },
    ServiceProviderName:{
        type:String,
        required:true
    },
    CustomerName:{
        type:String,
        required:true
    },
    CustomerId:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required:true
    },
    BookingStartDate:{
        type:Date,
        required:true
    },
    BookingEndDate:{
        type:Date,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    SelectedParameters:{
        type:Object,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    }
})
const BookedCustomer=new mongoose.model("Booked Customer",schema)
module.exports={BookedCustomer}