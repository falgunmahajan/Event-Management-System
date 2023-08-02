var email=document.getElementById("exampleInputEmail1");
var pwd=document.getElementById("exampleInputPassword1");
var fname=document.getElementById("name");
var role=document.querySelector(".form-select")
var contact=document.getElementById("exampleInputTel1");
var error=document.querySelector(".foremail");
var error1=document.querySelector(".forpwd");
var error2=document.querySelector(".forname");
var error3=document.querySelector(".forcontact");
var error4=document.querySelector(".forrole");
var submit=document.querySelector(".submit");
// console.log(role.value)
email.addEventListener("blur",(e)=>
{
 emailValid();
})
function emailValid()
{
    let regex=/^([\._A-Za-z0-9]+)@([A-Za-z0-9]+)\.([a-z]{2,6})$/;
    if(regex.test(email.value))
     {
      error.style.display="none";
      // console.log("true")
     return true;
     }
     else
     {
      // console.log("false")
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
    // console.log("grtrt")
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

fname.addEventListener("blur",(e)=>
{
  nameValid();  
})
function nameValid()
{
  // console.log("hello")
    let regex = /^[A-Z a-z]+$/i;
    if (regex.test(fname.value))
    {
      // console.log("true")
        error2.style.display="none"; 
    return true;
    }
   else
  {
    error2.style.display="block";
    // console.log("false")

    return false;
    } 
}

contact.addEventListener("blur",(e)=>
{
    contactValid();
})
function contactValid()
{
    let regex=/^[0-9]+$/;
    if(regex.test(contact.value))
    {
    if(contact.value.length==10)
    {
      error3.style.display="none";
      // console.log(error3.style.display);
    return true;
    }
    else
  {
  error3.style.display="block";
  return false;
  }
}
else
{
  error3.style.display="block";
  return false;
  }
}
role.addEventListener("change",(e)=>
{
    isRole();
})
function isRole()
{
  if(role.value=="")
  {
  error4.style.display="block";
     return false;
  }
  else
  {
    error4.style.display="none"; 
    return true;
  }
 
}
function validateSubmit()
{
  console.log("hello")
    // if((!emailValid()) && (!passwordValid()) && (!nameValid()) && (!contactValid()) &&(!isRole()))
    // {
    //   console.log("false")
    //     alert("Please filled all the details")
    //     return false;
    // }
    if((emailValid()) && (passwordValid()) && (nameValid())  && (contactValid()) && (isRole()))
    {
      console.log("true")

      return true;
    }
    else{
      emailValid();
      passwordValid();
      nameValid();
      contactValid();
      isRole()
        alert("Please provide the valid details")
        return false;
    }
}