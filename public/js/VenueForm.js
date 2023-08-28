const VenueTypeCheckboxes=document.querySelectorAll('#Venue_Type input[type="checkbox"]');
const WiFi_Checkboxes=document.querySelectorAll('#Wi_Fi input[type="checkbox"]');
const cateringCheckboxes=document.querySelectorAll('#catering input[type="checkbox"]');
const ParkingCheckboxes=document.querySelectorAll('#Parking input[type="checkbox"]');
const AudioEquipmentCheckboxes=document.querySelectorAll('#AudioEquipment input[type="checkbox"]');
const WheelChairCheckboxes=document.querySelectorAll('#WheelChair input[type="checkbox"]');
const ElevatorsCheckboxes=document.querySelectorAll('#Elevators input[type="checkbox"]');
const RestroomsCheckboxes=document.querySelectorAll('#Restrooms input[type="checkbox"]');
const DecorationCheckboxes=document.querySelectorAll('#Decoration input[type="checkbox"]');

function main() {
    handleCheckboxGroup(VenueTypeCheckboxes);
    handleCheckboxGroup(WiFi_Checkboxes);
    handleCheckboxGroup(cateringCheckboxes);
    handleCheckboxGroup(ParkingCheckboxes);
    handleCheckboxGroup(AudioEquipmentCheckboxes);
    handleCheckboxGroup(DecorationCheckboxes);
    handleCheckboxGroup(WheelChairCheckboxes);
    handleCheckboxGroup(RestroomsCheckboxes);
    handleCheckboxGroup(ElevatorsCheckboxes);
  }

  function handleCheckboxGroup(checkboxes) {
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox,index) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
              console.log(otherCheckbox.checked,index)
            }
          });
        }
      });
    });
  }


  const prices=document.querySelectorAll(".price");
  console.log(prices);
  const price=document.querySelectorAll(".price");
const spans=document.querySelectorAll(".span");
var regex = /^[0-9]+$/;

function priceValidation() {
    console.log("scgn")
  price.forEach((item) => {
    
    spans.forEach((item1) => {
      if (item.name === item1.id) {
        if (item.value && !regex.test(item.value)) {
            
          item1.style.display = "block";
          item.focus();
        } else {
          
          item1.style.display = "none";
        }
      }
    });
  });
}

function validation()
{
   var isValidationPassed = true;  
    var dataDiv = document.querySelectorAll(".data");
    dataDiv.forEach((item) => {
      var checkboxes = item.querySelectorAll(".form-check-input");
      var count = 0; 
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          count++;
        }
      });
      if (count !== 1) {       
        isValidationPassed = false; 
      }
    });
    price.forEach(item=>
        { 
            if(!item.value)
            {             
            isValidationPassed = false; 
                }
        })

console.log(isValidationPassed);
if(!isValidationPassed)
{
alert("please fill all the fields")
}
return isValidationPassed;
}

const locationDiv=document.querySelector(".location_capacity");
const locationAndCapacity=locationDiv.querySelectorAll(".form-control");
const errorMessages=locationDiv.querySelectorAll(".span");
console.log(errorMessages)
var pattern=/^[A-Za-z]+[' ']*[A-Za-z]*$/;
var pattern1= /^[0-9]+$/;
function Location()
{
  if(pattern.test(locationAndCapacity[0].value))
    {
      console.log(locationAndCapacity[0].value)
      errorMessages[0].style.display="none";
    }
    else
    {
      errorMessages[0].style.display="block";
    }
}  

function Capacity()
{
  if(pattern1.test(locationAndCapacity[1].value))
  {
    console.log(locationAndCapacity[1].value)
    errorMessages[1].style.display="none";
  }
  else
  {
    errorMessages[1].style.display="block";
  }
}