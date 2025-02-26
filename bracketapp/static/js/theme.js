"use strict";

const themeStorage = window["localStorage"];

function setTheme(theme, options) {
  theme = theme === "dark" ? "dark" : "light";

  console.log("setting theme", theme);

  themeStorage.setItem("theme", theme);
  // Set html element theme
  document.documentElement.setAttribute("data-bs-theme", theme);
  document.documentElement.classList.toggle("sl-theme-dark", theme === "dark");
  document.documentElement.classList.toggle(
    "sl-theme-light",
    theme === "light"
  );

  if (!(options?.dontSend === true)) {
    fetch(THEME_URL + "?" + new URLSearchParams({ theme }));
  }
}

(() => {
  if (THEME === "") {
    let storedTheme = getTheme();
    setTheme(storedTheme);
  } else {
    setTheme(THEME, { dontSend: true });
  }
})();
