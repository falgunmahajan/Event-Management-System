async function getData()
{ 
  let response,customer=false;
  if(window.location.pathname==="/customer/booking")
  {
    customer=true
    response = await fetch("/customer/bookingData");
  }
  if(window.location.pathname==="/serviceProvider/booking")
  {
    response = await fetch("/serviceprovider/bookingData");
  }
   
    const result =await response.json()
    if(result.data)
    {
        document.querySelector(".headrow").innerHTML= `<th class="py-4 fs-5">${customer?'Service':'Customer'}</th>
                <th class="py-4 fs-5">${customer?'ServiceProvider':'Contact Number'}</th>
                ${!customer ? '<th class="py-4">Address</th>':''}
                <th class="py-4 fs-5">Parameters</th>
                <th class="py-4 fs-5">Booking Start Date</th>
                <th class="py-4 fs-5">Booking End Date</th>
                <th class="py-4 fs-5">Price</th>`
        const data = result.data;
        console.log(data)
        const tableBody=data.map(item=>{
            const start=new Date(item.BookingStartDate);
            const end=new Date(item.BookingEndDate);
           
            return `<tr>
            <td  class="align-middle">${customer?item.ServiceName:item.CustomerName}</td>
            <td  class="align-middle">${customer?item.ServiceProviderName:item.PhoneNumber}</td>
            ${!customer ?` <td  class="align-middle">${item.Address}</td>`:''}
            <td class="text-start align-middle px-5">${Object.keys(item.SelectedParameters).map(key=>{
                  return `<b>${key.split(/(?=[A-Z])/).join(" ")}</b> : ${item.SelectedParameters[key]}<br>`
            }).join("")}</td>
            <td  class="align-middle">${start.getFullYear()}-${`0${start.getMonth()+1}`.slice(-2)}-${`0 ${start.getDate()}`.slice(-2)}</td>
            <td  class="align-middle">${end.getFullYear()}-${`0${end.getMonth()+1}`.slice(-2)}-${`0${end.getDate()}`.slice(-2)}</td>
            <td  class="align-middle">₹${item.Price}</td>
            </tr>`
        }).join("")
        document.querySelector("tbody").innerHTML= `${tableBody}`
    }
    else{
        document.querySelector("table").classList.add("d-none");
        document.querySelector(".errorMsg").innerHTML=result.msg;
    }
}
getData();