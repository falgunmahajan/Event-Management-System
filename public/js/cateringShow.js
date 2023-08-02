
let serviceProvider;

(async function()
{
  let res=await fetch("/serviceData");
   serviceData=await res.json();
   console.log(serviceData);
 document.querySelector(".sidebar").innerHTML= serviceData.map(item=>{
    const parameter = item.Parameter;
    const nameParameter = parameter.replaceAll(" ","")
   const checkboxDiv= item.Option.map((subitem)=>{
       return `<div class="formcheck">
                <input class="formcheckinput" type="checkbox" head="${parameter}"  value="${subitem}"
                     name="${nameParameter}" id="${subitem}">
                <label class="formchecklabel" for="${subitem}">
                   ${subitem}
                </label>
            </div>`   
    }).join("")
    return ` <div class="data" id="${parameter}" onchange="main(this.id)" >
             <label class="my-2"><strong>${parameter}</strong></label>
             ${checkboxDiv}
             </div>`
   }).join("")
 
})();

async function createTable()
{
  let checkboxes=document.querySelectorAll("input[type='checkbox']:checked")
  // console.log(checkboxes)
  const filterValue=Array.from(checkboxes).map(checkbox=>{
    return {
      value:checkbox.value,
      name:checkbox.name ,
      head:checkbox.getAttribute("head")      
    }
  })
  console.log(filterValue)
 let res=await fetch("/cateringData");
 serviceProvider=await res.json();
//  console.log(serviceProvider)
//  console.log(filterValue)
  filteredData= serviceProvider.filter(provider=>{
 return filterValue.every(filter=>{
      const name=filter.name;
      // console.log(typeof provider[name]);
      if(typeof provider[name]==="object")
      {
        console.log(provider[name].value)
        return (provider[name].value==filter.value)
      }
      return (provider[name]==filter.value)
  })
 })
 console.log(filteredData);
 let heading =filterValue.map((item)=>{
  return `<th>${item.head}</th>`
 }).join("")
 document.querySelector("thead").innerHTML=`<tr class="heading"><th>Service Provider</th>
 ${heading}</tr>`
 let bodyRow=filteredData.map(data=>{
let bodyData=filterValue.map((item)=>{
  if(typeof data[item.name]==="object")
  {
    return`<td>${data[item.name].value}</td>`
  }
  return `<td>${data[item.name]}</td>`
}).join("")
return `<tr id=${data._id}><td>${data.Name}</td>
${bodyData}</tr>`
 }).join("")
 document.querySelector("tbody").innerHTML=bodyRow
 head=document.querySelector(".heading")
 console.log(head)
};


const form=document.querySelector(".form")
const locationDiv=document.querySelector(".location")
const noOfPlateDiv=document.querySelector(".noOfPlates")
const start=document.querySelector(".start")
const end=document.querySelector(".end")
let head,filteredData


function main(id){
    let div=document.getElementById(id)
    let checkboxes=div.querySelectorAll(` input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
        myfunction(id,checkbox,checkboxes)
      })
}
let value;
function myfunction(id,checkbox,spreadCheckboxes) {
  console.log(id)
  if (checkbox.checked) {
    value=checkbox.value;
    let div1
    if(id==="Type Of Preparation"|| id==="Type Of Spread" || id==="Spread Bifurcation"  || id==="Crockery Preference")
    {
    if(!document.getElementById(`text ${id}`))
  {
  
     div1=document.createElement("div");
    div1.classList.add("m-3");
    div1.classList.add("d-flex")
    div1.classList.add("flex-column")
    div1.innerHTML= `<label class='me-3'>${id}</label>
    <input type='text' id='text ${id}' value='${value}'style="width:300px;">`
    form.appendChild(div1) 
  }
    else{
      document.getElementById(`text ${id}`).value=value;
   }
  }
  if(id!=="Type Of Preparation" && id!=="Type Of Spread" && id!=="Spread Bifurcation")
  {
    if(!document.getElementById(`Number ${id}`))
    {
    let div2=document.createElement("div");
    div2.classList.add("m-3");
    div2.classList.add("d-flex")
    div2.classList.add("flex-column")
    div2.innerHTML= `<label class=' me-3'>Number of ${id}</label>
    <input type='text' id='Number ${id}' style="width:300px;">`
    form.appendChild(div2) 
  }
}

createTable();
  }
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        spreadCheckboxes.forEach((otherCheckbox) => {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
            
          }

        });
       
      }
    });
  }
 let diffDays
  function checkDate()
  {
    
    if(start.value && end.value)
    {
        const startDate = new Date(start.value)
        const endDate= new Date(end.value)
        const diffTime = endDate- startDate;
 diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if(diffDays<=0)
        {
          document.querySelector(".error").classList.remove("d-none")
          document.querySelector(".error").classList.add("d-block")
        }
        else{
            document.querySelector(".error").classList.add("d-none")
          document.querySelector(".error").classList.remove("d-block")
        }
    }
  }
function searchRecord(){
   

    if(locationDiv.value && noOfPlateDiv.value && start.value && end.value)
    {
        
        let th1=document.createElement("th");
        let th2=document.createElement("th");
        
        th1.innerHTML="Cost per thali/plate/packet";
        th2.innerHTML="Total value"
        head.appendChild(th1);
        head.appendChild(th2)
       
  
       filteredData.map(item=>{
        let td1=document.createElement("td");
        let td2=document.createElement("td")
        // console.log(item)
        td1.innerHTML=item.SpreadBifurcation.price;
        td2.innerHTML=item.SpreadBifurcation.price*noOfPlateDiv.value*diffDays;
        console.log(td1,td2)
        document.getElementById(item._id).appendChild(td1)
        document.getElementById(item._id).appendChild(td2)
       })
    }
}




  
