async function getData() {
    if (window.location.pathname === "/serviceProvider/booking") {
        response = await fetch("/serviceprovider/bookingData");
        document.querySelector(".titlediv").innerHTML = "Booking Services Details"
        const result = await response.json()
        console.log(result)
        if (result.data) {
            const data = result.data;
            document.querySelector(".headrow").innerHTML = `<th class="py-4 fs-5">Customer</th>
            <th class="py-4 fs-5">Contact Number</th>
           <th class="py-4">Address</th>
            <th class="py-4 fs-5">Parameters</th>
            <th class="py-4 fs-5">Booking Start Date</th>
            <th class="py-4 fs-5">Booking End Date</th>
            <th class="py-4 fs-5">Price</th>`
            const tableBody = data.map(item => {
                const start = new Date(item.BookingStartDate);
                const end = new Date(item.BookingEndDate);

                return `<tr>
            <td  class="align-middle">${item.CustomerName}</td>
            <td  class="align-middle">${item.PhoneNumber}</td>
             <td  class="align-middle">${item.Address}</td>
            <td class="text-start align-middle px-5">${Object.keys(item.SelectedParameters).map(key => {
                    return `<b>${key.split(/(?=[A-Z])/).join(" ")}</b> : ${item.SelectedParameters[key]}<br>`
                }).join("")}</td>
            <td  class="align-middle">${start.getFullYear()}-${`0${start.getMonth() + 1}`.slice(-2)}-${`0 ${start.getDate()}`.slice(-2)}</td>
            <td  class="align-middle">${end.getFullYear()}-${`0${end.getMonth() + 1}`.slice(-2)}-${`0${end.getDate()}`.slice(-2)}</td>
            <td  class="align-middle">₹${item.Price}</td>
            </tr>`
            }).join("")
            document.querySelector("tbody").innerHTML = `${tableBody}`
        }
    else {
        document.querySelector("table").classList.add("d-none");
        document.querySelector(".errorMsg").innerHTML = result.msg;
    }
}
if (window.location.pathname === "/serviceProvider/addedservices") {
    response = await fetch("/servicedetails");
    document.querySelector(".titlediv").innerHTML = "Services Added Details"
    const result = await response.json()
    console.log(result)
    if (result.data) {
        const data = result.data;
        document.querySelector(".headrow").innerHTML = `<th class="align-middle py-4 fs-5">Service</th>${Object.keys(data[0]).map(key => {
            if (key !== "_id" && key !== "Name" && key !== "ServiceAddedBy" && key !== "createdAt" && key !== "updatedAt" && key !== "__v") {
                return `<th class="align-middle py-4 fs-5">
            ${key.split(/(?=[A-Z])/).join(" ")}</th>`
            }
        }).join("")}`
        document.querySelector("tbody").innerHTML = data.map(item => {
            return `<tr>
                <td  class="align-middle">${result.Service}</td>
                ${Object.keys(item).map(key => {
                if (key === "Location") {
                    return `<td  class="align-middle">${item[key].value.Location}<br><b>price</b> :${item[key].price}</td>`
                }
                if (typeof item[key] === "object") {

                    return `<td class="align-middle">${Object.keys(item[key]).map(subkey => {
                        if (subkey === "value") {
                            return `${item[key][subkey]}<br>`
                        }
                        if (item[key].value !== "No") {
                            return `<b>${subkey.split(/(?=[A-Z])/).join(" ")}</b>:${item[key][subkey]}<br>`
                        }

                    }).join("")}</td>`
                }
                if (key !== "_id" && key !== "Name" && key !== "ServiceAddedBy" && key !== "createdAt" && key !== "updatedAt" && key !== "__v") {
                    return `<td  class="align-middle">${item[key]}</td>`
                }
            }).join("")}</tr>`
        }).join("")

    }
    else {
        document.querySelector("table").classList.add("d-none");
        document.querySelector(".errorMsg").innerHTML = result.msg;
    }
}



}
getData();