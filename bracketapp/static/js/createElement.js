"use strict";

function teamNameToSVGFileName(teamName) {
  if (!teamName) {
    return "";
  }

  let filename = teamName.substring(2);
  filename = filename.replaceAll(" ", "");
  filename = filename.replaceAll(".", "");
  return `/static/images/${filename}.svg`;
}

function createElement(options) {
  if (!options.type) {
    options.type = "div";
  }

  let ele = document.createElement(options.type);

  if (options.id) {
    ele.id = options.id;
  }

  if (options.classString) {
    ele.classList.add(...options.classString.split(" "));
  }

  if (options.href) {
    ele.href = options.href;
  }

  if (options.onclick) {
    ele.onclick = options.onclick;
  }

  if (options.content) {
    ele.textContent = options.content;
  }

  if (options.action) {
    ele.action = options.action;
  }

  if (options.name) {
    ele.name = options.name;
  }

  if (options.hidden) {
    ele.hidden = true;
  }

  if (options.value !== undefined) {
    ele.value = options.value;
  }

  if (options.autocomplete) {
    ele.autocomplete = options.autocomplete;
  }

  if (options.step) {
    ele.step = options.step;
  }

  if (options.innerHTML) {
    ele.innerHTML = options.innerHTML;
  }

  if (options.inputType) {
    ele.type = options.inputType;
  }

  if (options.method) {
    ele.method = options.method;
  }

  if (options.required) {
    ele.required = options.required;
  }

  if (options.for) {
    ele.for = options.for;
  }

  if (options.onpointerdown) {
    ele.onpointerdown = options.onpointerdown;
  }

  if (options.onpointerup) {
    ele.onpointerup = options.onpointerup;
  }

  if (options.onpointercancel) {
    ele.onpointercancel = options.onpointercancel;
  }

  if (options.src) {
    ele.src = options.src;
  }

  if (options.alt) {
    ele.alt = options.alt;
  }

  if (options.checked) {
    ele.checked = options.checked;
  }

  return ele;
}