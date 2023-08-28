const { catering } = require("../models/catering");

const registerCatering=async(req,res)=>{
  const data=req.body;
  console.log(data);
  await catering.create({
    Name:req.user.Name,
    ServiceAddedBy:req.user._id,
    Location:{
      value:JSON.parse(data.Location),
      price:data.LocationPrice
    },
    TypeOfPreparation:data.TypeofPreparation,
    TypeOfSpread:data.TypeOfSpread,
    SpreadBifurcation:{
      value:data.SpreadBifurcation,
      price:data.spreadPrice
    },
    SoftDrinks:{
      value:data.SoftDrinks,
      price:data.Soft_DrinksPrice
    },
    CrockeryPreferences:{
      value:data.CrockeryPreferences,
      price:data.CrockeryPrice
    },
    NonVegSnack:{
      value:data.NonvegSnack,
      price:data.Non_veg_Snack_Price
    },
    Deserts:{
      value:data.Deserts,
      price:data.Deserts_Price
    },
    VegDish:{
      value:data.VegDish,
      price:data.VegDish_Price
    },
    NonVegDish:{
      value:data.Non_VegDish,
      price:data.NonVegDish_Price
    },
    VegSnack:{
      value:data.VegSnack,
      price:data.VegSnack_Price
    },
    Water:{
      value:data.Water,
      price:data.Water_Price
    },
    FreshCannedJuice:{
      value:data.FreshCannedJuice,
      price:data.Juice_Price
    }
  })
  res.redirect("/services?service=Catering")
}
module.exports={registerCatering}