"use strict";

const isDisabled = element => {
  return false;
}

function hideAllDropdowns(exception) {
  let dropdowns = document.querySelectorAll(".dropdown-toggle");
  for (let dropdown of dropdowns) {
    if (dropdown === exception) {
      continue;
    }
    toggleDropdownShowing(dropdown, { force: false });
  }
}

function handleDropDownClick(event) {
  let dropdown = event.target;
  hideAllDropdowns(dropdown);
  toggleDropdownShowing(dropdown);
}

function handleButtonClick(event) {
  let dropdown =
    event.target.parentElement.parentElement.previousElementSibling;
  toggleDropdownShowing(dropdown);
}

function toggleDropdownShowing(dropdown, options) {
  if (options?.force === true || options?.force === false) {
    dropdown.classList.toggle("show", options.force);

    let dropdownList = dropdown.nextElementSibling;
    dropdownList.classList.toggle("show", options.force);
  } else {
    dropdown.classList.toggle("show");

    let dropdownList = dropdown.nextElementSibling;
    dropdownList.classList.toggle("show");
  }
}

let dropdowns = document.querySelectorAll(".dropdown-toggle");
for (let dropdown of dropdowns) {
  dropdown.addEventListener("click", handleDropDownClick);
  dropdown.addEventListener("focusout", (event) => {
    toggleDropdownShowing(event.target, { force: false });
  });
}

document.addEventListener("click", (event) => {
  hideAllDropdowns(event.target);
});

let dropdownMenuButtons = document.querySelectorAll(".dropdown-menu a");
for (let button of dropdownMenuButtons) {
  button.addEventListener("click", handleButtonClick);
}
