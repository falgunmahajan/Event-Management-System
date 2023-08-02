const jwt=require("jsonwebtoken")


function setToken(user)
{
 
   return jwt.sign({
        _id:user._id,
         Name:user.Name
    },"Event Management System");
    
}
function getUser(token)
{
    return jwt.verify(token,"Event Management System")
}
module.exports={setToken,getUser}