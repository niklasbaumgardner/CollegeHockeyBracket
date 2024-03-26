"use strict";

function setColor(color) {
  fetch(COLOR_URL + "?" + new URLSearchParams({ color }));
}

function setBackgroundColor(backgroundColor) {
  fetch(BACKGROUND_COLOR_URL + "?" + new URLSearchParams({ backgroundColor }));
}

const BACKGROUND_COLOR_REGEX = /^hsla\(\d+,\s?\d+%,\s?\d+%\,\s?\d{1}\.\d+\)$/;

let themeSelector = document.getElementById("preferences-theme-selector");
themeSelector.addEventListener("sl-input", () => setTheme(themeSelector.value));

let primaryColorSelector = document.getElementById(
  "preferences-primary-color-selector"
);
primaryColorSelector.addEventListener("sl-input", () => {
  let newColor = primaryColorSelector.value;
  for (let classString of document.documentElement.classList) {
    if (classString.includes("-primary")) {
      document.documentElement.classList.remove(classString);
    }
  }

  document.documentElement.classList.add(`${newColor}-primary`);

  setColor(newColor);
});

let backgroundColorSelector = document.getElementById(
  "preferences-background-color-selector"
);
let backgroundPreview = document.querySelector(".background-preview");
backgroundColorSelector.addEventListener(
  "sl-input",
  handleBackgroundColorInputEvent
);

let customColorPicker = document.getElementById("colorPicker");
function handleBackgroundColorInputEvent(event) {
  let newBackgroundColor;
  let target = event.target;
  if (target === customColorPicker || target.value === "custom") {
    newBackgroundColor = customColorPicker.getFormattedValue("hsla");
  } else {
    newBackgroundColor = backgroundColorSelector.value;
  }

  removeBackgroundColor();
  addBackgroundColor(newBackgroundColor);
  setBackgroundColor(newBackgroundColor);
}

function removeBackgroundColor() {
  document.body.style.backgroundColor = "";
  backgroundPreview.style.backgroundColor = "";

  for (let classString of document.body.classList) {
    if (classString.includes("-background")) {
      document.body.classList.remove(classString);
    }
  }

  for (let classString of backgroundPreview.classList) {
    if (classString.includes("-background")) {
      backgroundPreview.classList.remove(classString);
    }
  }
}

function addBackgroundColor(color) {
  if (color.match(BACKGROUND_COLOR_REGEX)) {
    document.body.style.backgroundColor = color;
    backgroundPreview.style.backgroundColor = color;
  } else {
    document.body.classList.add(`${color}-background`);
    backgroundPreview.classList.add(`${color}-background`);
  }
}

function maybeSetCustomBackgroundColor() {
  if (
    backgroundColorSelector.getAttribute("value").match(BACKGROUND_COLOR_REGEX)
  ) {
    backgroundColorSelector.value = "custom";
    customColorPicker.value = document.body.style.backgroundColor;
    backgroundPreview.style.backgroundColor =
      document.body.style.backgroundColor;
  }
}

maybeSetCustomBackgroundColor();
