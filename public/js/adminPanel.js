if(window.location.pathname=="/admin/service"||window.location.pathname=="/admin/customer"||window.location.pathname=="/admin/serviceprovider"|| window.location.pathname=="/admin/bookedCustomer")
{
let res,data,title;
(async()=>{
    if(window.location.pathname=="/admin/service")
    {
        title="Services"
        res= await fetch("/api/data/service");
        data=await res.json()
        console.log(data)
        return data;
    }
    if(window.location.pathname=="/admin/customer")
    {
        title="Customers"
        res= await fetch("/api/data/customer");
        data=await res.json()
        console.log(data)
        return data;
    }
    if(window.location.pathname=="/admin/serviceprovider")
    {
        title="Service Providers"
        res= await fetch("/api/data/serviceprovider");
        data=await res.json()
        console.log(data)
        return data;
        
    }
    if(window.location.pathname=="/admin/bookedCustomer")
    {
        console.log("hello")
        title="Booked Customer"
        res= await fetch("/api/data/bookedCustomer");
        data=await res.json()
        console.log(data)
        return data;
        
    }
})().then(
    data=>{
        document.querySelector(".tabletitle").innerHTML=`${title}`;
        const headRow=document.querySelector(".headrow");
        const tbody=document.querySelector(".tbody")
        headRow.innerHTML=Object.keys(data[0]).map(item=>{
           if(item!=='_id'&& item!=='__v' && item!=="Password" && item!=='ServiceProviderId' && item!=='CustomerId')
           {
             if(item=="Address" || item=="PhoneNumber")
             {
                return `<th class="align-middle py-4">Customer ${item.split(/(?=[A-Z])/).join(" ")}</th>`
             }
             return `<th class="align-middle py-4">${item.split(/(?=[A-Z])/).join(" ")}</th>`
           }
        }).join("")
        tbody.innerHTML=data.map(item=>{
            console.log(Object.keys(item))
            return  `<tr>${Object.keys(item).map(key=>{
                if(key!=='_id'&& key!=='__v' && key!=="Password" && key!=='ServiceProviderId' && key!=='CustomerId')
                {
                    if(typeof item[key]=="object")
                    {
                        return `<td class="text-start align-middle px-5">${Object.keys(item[key]).map(subKey=>{
                            return `<b>${subKey.split(/(?=[A-Z])/).join(" ")}</b> : ${item[key][subKey]}<br>`
                        }).join("")}</td>`
                    }
                    if(key=="BookingStartDate" || key=="BookingEndDate")
                    {
                        return `<td class="align-middle">${item[key].slice(0,10)}</td>`
                    }
                    if(key=="Price")
                    {
                        return `<td class="align-middle">₹${item[key]}</td>`
                    }
                    return `<td class="align-middle">${item[key]}</td>`
                    
                }
            }).join("")}</tr>`
        }).join("")
    }
    
)
}

