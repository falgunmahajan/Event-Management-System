const price=document.querySelectorAll(".price");
const spans=document.querySelectorAll(".span");
var regex = /^[0-9]+$/;

function priceValidation() {
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
  
    
const preparationCheckboxes= document.querySelectorAll('#preparationDiv input[type="checkbox"]');
  const spreadCheckboxes = document.querySelectorAll('#spreadDiv input[type="checkbox"]');
  const spreadBifurcationCheckboxes = document.querySelectorAll('#spreadBifurcationDiv input[type="checkbox"]');
  const softDrinkCheckboxes = document.querySelectorAll('#softDrinksDiv input[type="checkbox"]');
  const crockeryCheckboxes = document.querySelectorAll('#crockeryDiv input[type="checkbox"]');
  const Non_veg_snack_Checkboxes = document.querySelectorAll('#Non-vegSnackDiv input[type="checkbox"]');
  const desertsCheckboxes = document.querySelectorAll('#desertsDiv input[type="checkbox"]');
  const vegDishCheckboxes = document.querySelectorAll('#VegDishDiv input[type="checkbox"]');
  const nonvegDishCheckboxes = document.querySelectorAll('#NonVegDishDiv input[type="checkbox"]');
  const vegSnackCheckboxes = document.querySelectorAll('#VegSnackDiv input[type="checkbox"]');
  const waterCheckboxes = document.querySelectorAll('#waterDiv input[type="checkbox"]');
  const juiceCheckboxes = document.querySelectorAll('#juiceDiv input[type="checkbox"]');


function main() {
  
  preparationCheckboxes.forEach((checkbox) => {
    myfunction(checkbox, preparationCheckboxes)
  });

  spreadCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,spreadCheckboxes)
  })
  spreadBifurcationCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,spreadBifurcationCheckboxes)
  })
  softDrinkCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,softDrinkCheckboxes)
  })
  crockeryCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,crockeryCheckboxes)
  })
  Non_veg_snack_Checkboxes.forEach((checkbox) => {
    myfunction(checkbox,Non_veg_snack_Checkboxes)
  })
  desertsCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,desertsCheckboxes)
  })
  vegDishCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,vegDishCheckboxes )
  })
  nonvegDishCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,nonvegDishCheckboxes)
  })
  vegSnackCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,vegSnackCheckboxes)
  })
  waterCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,waterCheckboxes)
  })
  juiceCheckboxes.forEach((checkbox) => {
    myfunction(checkbox,juiceCheckboxes)
  })
};

function myfunction(checkbox,spreadCheckboxes) {
      checkbox.addEventListener('change', function () {
        if (this.checked) {
          spreadCheckboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    }
