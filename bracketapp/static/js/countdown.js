"use strict";

const BRACKET_CLOSE = new Date("2023-03-23T22:00:00+04:00");
const NOW = Date.now();
const timeElement = document.getElementById("timeLeft");
const daysEle = document.getElementById("days");
const hoursEle = document.getElementById("hours");
const minsEle = document.getElementById("mins");
const secsEle = document.getElementById("secs");

function formatTime(ms) {
  let seconds = ms / 1000;
  let newDate = new Date(ms);

  let days = Math.floor(seconds / (3600 * 24));
  let hours = newDate.toISOString().substring(11, 13);
  let mins = newDate.toISOString().substring(14, 16);
  let secs = newDate.toISOString().substring(17, 19);
  return { days, hours, mins, secs };
}

function setTimeCountDown() {
  let now = Date.now();
  let timeLeft = BRACKET_CLOSE - now;

  let time = formatTime(timeLeft);

  daysEle.textContent = time.days;
  hoursEle.textContent = time.hours;
  minsEle.textContent = time.mins;
  secsEle.textContent = time.secs;
}

function startCountDown() {
  setInterval(() => {
    setTimeCountDown();
  }, 1000);
}

function shouldHideCountDown() {
  if (BRACKET_CLOSE - NOW > 0) {
    document.getElementById("countdown").hidden = false;
    setTimeCountDown();
    startCountDown();
  } else {
    document.getElementById("countdown").hidden = true;
  }
}
