"use strict";

async function sendUsernameRequest(username) {
  let response = await fetch(
    USERNAME_UNIQUE_URL +
      "?" +
      new URLSearchParams({
        username,
      })
  );
  response = await response.json();
  return response;
}

async function sendEmailRequest(email) {
  let response = await fetch(
    EMAIL_UNIQUE_URL +
      "?" +
      new URLSearchParams({
        email,
      })
  );
  response = await response.json();
  return response;
}

class UniqueInputHandler {
  constructor() {
    this.usernameInput = document.getElementById("username");
    this.usernameInput.addEventListener("input", this);

    this.emailInput = document.getElementById("email");
    this.emailInput.addEventListener("input", this);
  }

  handleEvent(event) {
    if (event.target === this.usernameInput) {
      this.usernameDebouncer((event) => {
        this.usernameInputHandler(event);
      }, 300)(event);
    } else if (event.target === this.emailInput) {
      this.emailDebouncer((event) => {
        this.emailInputHandler(event);
      }, 300)(event);
    }
  }

  async usernameInputHandler(event) {
    let orginalValue = event.target.getAttribute("original-value");
    let newValue = event.target.value;

    if (orginalValue === newValue) {
      // don't need to send request
      this.usernameInput.setAttribute("help-text", "");
    } else {
      let result = await sendUsernameRequest(newValue);
      console.log("username is unique", result.isUnique);

      if (result.isUnique) {
        this.usernameInput.setAttribute("help-text", "");
        this.usernameValid = true;
      } else {
        this.usernameInput.setAttribute(
          "help-text",
          "Username taken. Please choose a different username."
        );
        this.usernameValid = false;
      }
    }
    this.toggleSubmitButton();
  }

  async emailInputHandler(event) {
    let orginalValue = event.target.getAttribute("original-value");
    let newValue = event.target.value;

    if (orginalValue === newValue) {
      // don't need to send request
      this.emailInput.setAttribute("help-text", "");
    } else {
      let result = await sendEmailRequest(event.target.value);
      console.log("email is unique", result.isUnique);

      if (result.isUnique) {
        this.emailInput.setAttribute("help-text", "");
        this.emailValid = true;
      } else {
        this.emailInput.setAttribute("help-text", EMAUL_UNIQUE_HELP_TEXT);
        this.emailValid = false;
      }
    }
    this.toggleSubmitButton();
  }

  usernameDebouncer(callback, wait) {
    return (...args) => {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  emailDebouncer(callback, wait) {
    return (...args) => {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  toggleSubmitButton() {
    let button = document.querySelector('sl-button[type="submit"]');
    button.disabled = !(this.emailValid && this.usernameValid);
  }
}

new UniqueInputHandler();
