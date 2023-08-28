const data = JSON.parse(sessionStorage.getItem("data"))
const details = document.querySelector(".details");
let body={}
if (data) {
    const keys = Object.keys(data);

    let parameters = {}
    keys.map(key => {
        if (key != "Location" && key != "StartDate" && key != "EndDate" && key != "ServiceProvider" && key != "ServiceProviderId" && key != "Service" && key != "TotalPrice") {
            parameters[key] = data[key]
        }
    })
    console.log(parameters)
     body = {
        Service: data.Service,
        ServiceProvider: data.ServiceProvider,
        ServiceProviderId: data.ServiceProviderId,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        Parameters: parameters,
        TotalPrice: data.TotalPrice,
        CustomerAddress: JSON.parse(data.Location)
    }

    const parameterDiv = Object.keys(parameters).map(key => {

        return `<div class="col-6 card-text px-5">${key.split(/(?=[A-Z])/).join(" ")} : ${parameters[key]}</div>`
    }).join("")
    document.querySelector(".details").innerHTML = `<div class="card ">
            <div class="card-header  d-flex justify-content-between align-items-center">
                <span>Start Date : ${body.StartDate}</span>
                <span>End Date : ${body.EndDate}</span>
            </div>
            <div class="card-body">
                <h5 class="card-title text-center">Service Provider : ${body.ServiceProvider}</h5>
                <div class="row mt-4">
                  ${parameterDiv}
                </div>
            </div>
            <div class="card-footer text-muted text-end">
                Total Price: ₹${body.TotalPrice}
            </div>
        </div>`
}
const form = document.querySelector("#form")
const phnNo = document.querySelector(".phn");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if ((/^([0-9]){10}$/).test(phnNo.value)) {
        document.querySelector(".error").classList.add("d-none")
        body.PhoneNumber = phnNo.value;
        const res = await fetch("/booking", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const resData = await res.json()
        form.classList.add("d-none");
        document.querySelector(".msg").innerHTML=`<div class="card w-75 mx-auto">
  <div class="card-header">
  Booking Status
  </div>
  <div class="card-body">
    <p class="card-text">${resData.msg}</p>
    <a href='/customer/services?service=${data.Service}' class="btn btn-danger">Go Back</a>
  </div>
</div>`
      document.querySelector(".msg").classList.remove("d-none")
      details.classList.add("d-none")
        sessionStorage.removeItem("data")
        console.log(resData);
    }
    else {
        document.querySelector(".error").classList.remove("d-none")
    }
})
