"use strict";

function setColor(color) {
  fetch(COLOR_URL + "?" + new URLSearchParams({ color }));
}

function setBackgroundColor(backgroundColor) {
  fetch(BACKGROUND_COLOR_URL + "?" + new URLSearchParams({ backgroundColor }));
}

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
backgroundColorSelector.addEventListener("sl-input", () => {
  let newBackgroundColor = backgroundColorSelector.value;
  for (let classString of document.body.classList) {
    if (classString.includes("-background")) {
      document.body.classList.remove(classString);
    }
  }

  document.body.classList.add(`${newBackgroundColor}-background`);

  for (let classString of backgroundPreview.classList) {
    if (classString.includes("-background")) {
      backgroundPreview.classList.remove(classString);
    }
  }

  backgroundPreview.classList.add(`${newBackgroundColor}-background`);

  setBackgroundColor(newBackgroundColor);
});
