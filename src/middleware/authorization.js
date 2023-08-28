const { getUser } = require("../../jwt")

const isLogin=(req,res, next)=>{
    console.log(req.cookies)
const token = req.cookies.id;
console.log(token)
if(!token)
{
    res.redirect("/login");
}
else{
    const user = getUser(token);
    req.user=user;
    next();
}
}
const loggedinServiceProvider=(req,res,next)=>{
    const token = req.cookies.id;
    if(token)
    {
    const user = getUser(token);
    req.user=user;
}
next();
}
module.exports={isLogin,loggedinServiceProvider}