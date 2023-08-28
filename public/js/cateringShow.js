const url=new URLSearchParams(location.search)
const service=url.get("service")


const getServiceData = async () => {
    let res = await fetch("/serviceData");
    serviceData = await res.json();
    return serviceData
}
(async function () {
    const serviceData = await getServiceData();
    console.log(serviceData)
    document.querySelector(".optionSidebar").innerHTML = serviceData.map(item => {
        const parameter = item.Parameter;
        const nameParameter = parameter.replaceAll(" ", "")
        const checkboxDiv = item.Option.map((subitem) => {
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
}
)();
const form = document.querySelector(".form")
const locationDiv = document.querySelector(".location")
const noOfPlateDiv = document.querySelector(".noOfPlates")
const start = document.querySelector(".start")
const end = document.querySelector(".end")
let head,filteredData,total,customerCoordinates,serviceProviderCoordinates
let diffDays,filterValue
let today=new Date()
let min=`${today.getFullYear()}-${`0${today.getMonth()+1}`.slice(-2)}-${`0${today.getDate()+3}`.slice(-2)}`
start.setAttribute("min",min)
end.setAttribute("min",min)
function checkDate() {

    if (start.value && end.value) {
        const startDate = new Date(start.value)
        const endDate = new Date(end.value)
        const diffTime = endDate - startDate;
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 0) {
            document.querySelector(".error").classList.remove("d-none")
            document.querySelector(".error").classList.add("d-block")
        }
        else {
            document.querySelector(".error").classList.add("d-none")
            document.querySelector(".error").classList.remove("d-block")
        }
    }
}
locationDiv.addEventListener("change",(e)=>{
    let locationValue=JSON.parse(e.target.value)
    customerCoordinates={latitude:locationValue.Latitude,longitude:locationValue.Longitude}
    console.log(customerCoordinates)
    
})



function main(id) {
    let div = document.getElementById(id)
    let checkboxes = div.querySelectorAll(` input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
        myfunction(id, checkbox, checkboxes)
    })
}
let value;
function myfunction(id, checkbox, spreadCheckboxes) {
    console.log(id)
    let name=id.replaceAll(" ", "")
    let classId=id.replaceAll(" ", "")
    if (checkbox.checked) {
        value = checkbox.value;
        let div1
        if (id === "Type Of Preparation" || id === "Type Of Spread" || id === "Spread Bifurcation" || id === "Crockery Preferences") {
            if (!document.getElementById(`text ${id}`)) {
               
                div1 = document.createElement("div");
                div1.classList.add("m-3");
                div1.classList.add("d-flex")
                div1.classList.add("flex-column")
                div1.classList.add(`${classId}`)
                div1.innerHTML = `<label class='me-3'>${id}</label>
    <input type='text' id='text ${id}' name='${name}' value='${value}'style="width:300px;">`
                form.appendChild(div1)
            }
            else {
                document.getElementById(`text ${id}`).value = value;
            }
        }
        if (id !== "Type Of Preparation" && id !== "Type Of Spread" && id !== "Spread Bifurcation") {
            if (!document.getElementById(`Number${classId}`)) {
                let div2 = document.createElement("div");
                div2.classList.add("m-3");
                div2.classList.add("d-flex")
                div2.classList.add("flex-column")
                div2.classList.add(`${classId}`)
                div2.innerHTML = `<label class=' me-3'>Number of ${id}</label>
    <input type='text' id='Number${classId}' name='NumberOf${name}' style="width:300px;">`
                form.appendChild(div2)
            }
        }
           checkbox.addEventListener("change",()=>{
            if(!checkbox.checked)
            {
                let divs=document.querySelectorAll(`.${classId}`)
                if(divs.length==1)
                {
                    divs[0].remove()
                }
                else{
                    divs[0].remove()
                    divs[1].remove()
                }
            }
           })
    }
  
    getFilter();
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
(async function fetchServiceProvider(){
    let res = await fetch("/cateringData");
    serviceProvider = await res.json();
    console.log(serviceProvider)

})();

function getFilter() {
    let location = document.querySelector(".serviceProviderlocation")
    console.log(location)
   
    let checkboxes = document.querySelectorAll("input[type='checkbox']:checked")
   
    filterValue = Array.from(checkboxes).map(checkbox => {
        return {
            value: checkbox.value,
            name: checkbox.name,
            head: checkbox.getAttribute("head")
        }
    })
    if(location.value)
    { 
     filterValue.splice(0,0,{
           value:location.value,
           name:location.name,
     })}
    console.log(filterValue)
    filteredData= serviceProvider.filter(provider=>{
        return filterValue.every(filter=>{
             const name=filter.name;
            console.log(provider[name]);
             if(typeof provider[name]==="object")
             {
            //    console.log(provider[name].value)
            if(typeof provider[name].value==="object")
            {
                return (provider[name].value.Location==filter.value)
            }
               return (provider[name].value==filter.value)
             }
             return (provider[name]==filter.value)
         })
        })
        console.log(filteredData)
        createTable(filteredData)
        
        filterValue.map(item=>{
            
            if(item.name=="TypeOfPreparation" || item.name=="TypeOfSpread" || item.name=="SpreadBifurcation" || item.name=="Location")
            {
                createTable(filteredData);
                // searchRecord();
            }
            else
            {
                console.log("item",item)
                addRow(filteredData,item)
            }
        })
  

}
 function createTable(data) {
    console.log(data)
   if(data.length)
  {  document.querySelector("thead").innerHTML=`<tr class="heading">
    <th>Service Provider</th> <th>Type Of Preparation</th>
    <th>Type Of Spread</th> <th>Spread Bifurcation</th>
    </tr>`
    document.querySelector("tbody").innerHTML=data.map(item=>{
        return `<tr id=${item._id}>
        <td class="row-data">${item.Name}</td>
        <td class="row-data">${item.TypeOfPreparation}</td>
        <td class="row-data">${item.TypeOfSpread}</td>
        <td class="row-data">${item.SpreadBifurcation.value}</td>
        </tr>`   
    }).join("")
    head=document.querySelector(".heading")}
    else{
        document.querySelector("thead").innerHTML=`<h4>No result found. Please try some different combination</h4>`
        document.querySelector("tbody").innerHTML=""
    }
}
function addRow(filteredData,item)
{
    console.log("hello")
    let th=document.createElement("th");
    th.innerHTML=item.head;
    head.appendChild(th);
    let name=item.name
    filteredData.map(filteredItem=>{
        let td=document.createElement("td");
        td.classList.add("row-data")
        td.innerHTML=filteredItem[name].value
        document.getElementById(filteredItem._id).appendChild(td)
    })
}
function searchRecord(){
    let inputFilled=true;
   const inputFields = form.querySelectorAll("input");
   inputFields.forEach(input=>{
    console.log(input.value)
    if(!input.value){
        inputFilled=false;
    }
   })
   console.log(inputFilled); 
   if(inputFilled)
   {
    if(filterValue){
        addPriceRow();
    }
    else{
        filteredData=serviceProvider
        createTable(serviceProvider)
        addPriceRow()
    }
   }
}

function addPriceRow(){
    let th1=document.createElement("th")
        th1.innerHTML=`Cost Per Unit(Thali/Packet)`
        head.appendChild(th1);
        if(filterValue)
       { 
        filterValue.forEach(item=>{
            if(item.name!="TypeOfPreparation" && item.name!="TypeOfSpread" && item.name!="SpreadBifurcation" && item.name!="Location")
           { let th2=document.createElement("th")
              th2.innerHTML=`Cost Per Unit(${item.head})`
              head.appendChild(th2);}
        })
    }
        let th3=document.createElement("th");
    th3.innerHTML="Total value"
    head.appendChild(th3);
    let th4=document.createElement("th");
    th4.innerHTML="Action"
    head.appendChild(th4);
    filteredData.forEach(provider=>{
        serviceProviderCoordinates={latitude:provider.Location.value.Latitude,longitude:provider.Location.value.Longitude}
        console.log(serviceProviderCoordinates)
        console.log(getDistance(customerCoordinates,serviceProviderCoordinates))
        console.log(provider.Location.price*getDistance(customerCoordinates,serviceProviderCoordinates))
        total= provider['SpreadBifurcation'].price*document.querySelector("#SpreadBifurcation").value*(diffDays+1)+provider.Location.price*getDistance(customerCoordinates,serviceProviderCoordinates);
        let td=document.createElement("td");
        td.classList.add("row-data")
        td.innerHTML=provider.SpreadBifurcation.price;
        document.getElementById(provider._id).appendChild(td)
        if(filterValue)
       {
         filterValue.forEach(item=>{
           console.log(item.name)
            if(item.name!="TypeOfPreparation" && item.name!="TypeOfSpread" && item.name!="SpreadBifurcation" && item.name!="Location")
            {
                let name=item.name;
              total+=provider[name].price*form.querySelector(`#Number${name}`).value*(diffDays+1)
              let td1=document.createElement("td");
              td1.classList.add("row-data")
              td1.innerHTML=provider[name].price;
              document.getElementById(provider._id).appendChild(td1)
            }
        })}
        
       
        
        let td2=document.createElement("td");
        td2.classList.add("row-data")
        td2.innerHTML=total;
        document.getElementById(provider._id).appendChild(td2)
        console.log(total)
        let td3=document.createElement("td");
        td3.classList.add("row-data")
        td3.innerHTML=`<button class="btn btn-danger" type="submit" onclick="bookedService(this,'${provider._id}','${provider.ServiceAddedBy
        }')">Book</button>`;
        document.getElementById(provider._id).appendChild(td3)
        // console.log(total)
    })

}
function getDistance(customerCoordinates,serviceProviderCoordinates)
{
   
    return (Math.trunc(geolib.getDistance(customerCoordinates,serviceProviderCoordinates)/1000))
  
}


async function bookedService(ele,providerId,serviceProviderId)
{
    let node=ele.parentNode.parentNode
    console.log(document.querySelector("form"))
    const formData=new FormData(document.querySelector("form"))
    let data=Object.fromEntries(formData)
    let rowData=node.querySelectorAll(".row-data")
    data={'Service':service,
        'ServiceProvider':rowData[0].innerHTML,
     'ServiceProviderId':serviceProviderId,
     "TypeOfPreparation":rowData[1].innerHTML,
     "TypeOfSpread":rowData[2].innerHTML,
     "SpreadBifurcation":rowData[3].innerHTML,
    ...data}
    // data.ServiceProvider=rowData[0].innerHTML;
    // data.ServiceProviderId=serviceProviderId;
    // data.TypeOfPreparation=rowData[1].innerHTML;
    // data.TypeOfSpread=rowData[2].innerHTML;
    // data.SpreadBifurcation=rowData[3].innerHTML;
    data.TotalPrice=rowData[rowData.length-2].innerHTML
    console.log(data)
    sessionStorage.setItem("data",JSON.stringify(data))
    location.href="/customer/services/payment"
    // await fetch("/booking",{
    //     method:"post",
    //     headers: {
    //         "Content-Type": "application/json",
    //       },
    //     body:JSON.stringify(data)
    // })
    // console.log("hello")
    // document.querySelector(".alert").classList.remove("d-none")
}
