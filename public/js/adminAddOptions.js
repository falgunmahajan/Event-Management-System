const addOptions=document.querySelector(".addOptions");
 const options=document.querySelector(".options");
addOptions.addEventListener("click", (e) => {
 
  const newInput = document.createElement("input");
  newInput.classList.add("form-control", "form-control-sm", "mb-3");
  newInput.type = "text";
  newInput.setAttribute("aria-label", ".form-control-sm example");
  newInput.name = "Options";
  options.appendChild(newInput);
});
