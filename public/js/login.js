var email=document.getElementById("exampleInputEmail1");
var pwd=document.getElementById("exampleInputPassword1");
var error=document.querySelector(".foremail");
var error1=document.querySelector(".forpwd");
var error2=document.querySelector(".forrole");
var signin=document.querySelector(".sign");
var role=document.querySelector(".form-select")
email.addEventListener("blur",(e)=>
{
 emailValid();
})
function emailValid()
{
    let regex=/^([\._A-Za-z0-9]+)@([A-Za-z0-9]+).([a-z]{2,6})$/;
    if(regex.test(email.value))
     {
      error.style.display="none";
     return true;
     }
     else
     {
     error.style.display="block";
     return false;
      }  
}
pwd.addEventListener("blur",(e)=>
{
    passwordValid();
})

function passwordValid()
{
    console.log("grtrt")
    if(pwd.value.length >= 8)
    {
        error1.style.display="none";
    return true;
    }
    else
    {
     error1.style.display="block";
     return false;
    }
}
function isRole()
{
  if(role.value=="")
  {
    error2.style.display="block";
     return false;
  }
  error2.style.display="none";
    return true;
}
function validateSubmit()
{
// if((!emailValid()) && (!passwordValid()) && (!isRole()))
// {
//     e.preventDefault();
//     return false;
// }
// if((emailValid()) && (passwordValid()) && (isRole()))
// {
//     e.preventDefault();
//    return true;
    
// }
if((emailValid()) && (passwordValid()) && (isRole()))
{
  console.log("true")

  return true;
}
else{
  emailValid();
  passwordValid();
  isRole()
    alert("Please provide the valid details")
    return false;
}
}