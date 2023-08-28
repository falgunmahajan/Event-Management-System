const EventTypeCheckboxes=document.querySelectorAll('#Event_Type input[type="checkbox"]');
const ThemeCheckboxes=document.querySelectorAll('#Theme input[type="checkbox"]');
const DecorationStyleCheckboxes=document.querySelectorAll('#DecorationStyle input[type="checkbox"]');
const VenueSizeCheckboxes=document.querySelectorAll('#VenueSize input[type="checkbox"]');
const FlowersCheckboxes=document.querySelectorAll('#Flowers input[type="checkbox"]');
const CandlesCheckboxes=document.querySelectorAll('#Candles input[type="checkbox"]');
const VasesCheckboxes=document.querySelectorAll('#Vases input[type="checkbox"]');
const LightingCheckboxes=document.querySelectorAll('#Lighting input[type="checkbox"]');
const TableClothesCheckboxes=document.querySelectorAll('#TableClothes input[type="checkbox"]');
const ChairCoversCheckboxes=document.querySelectorAll('#ChairCovers input[type="checkbox"]');
const NapkinsCheckboxes=document.querySelectorAll('#Napkins input[type="checkbox"]');
const SittingCheckboxes=document.querySelectorAll('#Sitting input[type="checkbox"]');
function main() {
    handleCheckboxGroup(EventTypeCheckboxes);
    handleCheckboxGroup(ThemeCheckboxes);
    handleCheckboxGroup(DecorationStyleCheckboxes);
    handleCheckboxGroup(VenueSizeCheckboxes);
    handleCheckboxGroup(FlowersCheckboxes);
    handleCheckboxGroup(TableClothesCheckboxes);
    handleCheckboxGroup(CandlesCheckboxes);
    handleCheckboxGroup(VasesCheckboxes);
    handleCheckboxGroup(LightingCheckboxes);
    handleCheckboxGroup(ChairCoversCheckboxes);
    handleCheckboxGroup(NapkinsCheckboxes);
    handleCheckboxGroup(SittingCheckboxes);
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
