require("dotenv").config()
const jwt=require("jsonwebtoken")


function setToken(user)
{
 console.log(process.env.jwtSecret)
   return jwt.sign({
        _id:user._id,
         Name:user.Name
    },process.env.jwtSecret);
    
}
function getUser(token)
{
    return jwt.verify(token,process.env.jwtSecret)
}
module.exports={setToken,getUser}