const { BookedCustomer } = require("../models/BookedCustomerSchema")

const bookedCustomer=async(req,res)=>{
    console.log(req.user)
    console.log(req.body)
    const start=req.body.StartDate
    const end=req.body.EndDate
    const sid=req.body.ServiceProviderId
    const user=await BookedCustomer.findOne({ServiceProviderId:sid,$or:[{BookingStartDate:{$gte:start,$lte:end}},{BookingEndDate:{$gte:start,$lte:end}},{BookingStartDate:{$lte:start},BookingEndDate:{$gte:end}}]})
    if(user)
    {
    const startDate=new Date(user.BookingStartDate)
    const endDate=new Date(user.BookingEndDate)
        res.json({msg:`Your Service is not booked.<br>Service is not available from ${startDate.getFullYear()}-${`0${startDate.getMonth()+1}`.slice(-2)}-${`0${startDate.getDate()}`.slice(-2)} to ${endDate.getFullYear()}-${`0${endDate.getMonth()+1}`.slice(-2)}-${`0${endDate.getDate()}`.slice(-2)}  .<br> Please choose another dates.`}) 
    }
    else
    {
        await BookedCustomer.create({
            ServiceName:req.body.Service,
            ServiceProviderId:req.body.ServiceProviderId,
            ServiceProviderName:req.body.ServiceProvider,
            CustomerName:req.user.Name,
            CustomerId:req.user._id,
            BookingStartDate:req.body.StartDate,
            BookingEndDate:req.body.EndDate,
            Address:req.body.CustomerAddress.Location,
            PhoneNumber:req.body.PhoneNumber,
            SelectedParameters:req.body.Parameters,
            Price:req.body.TotalPrice
        })
        res.json({msg:`Your service is successfully booked from ${start} to ${end} ` })
    }
   
}
module.exports={bookedCustomer}