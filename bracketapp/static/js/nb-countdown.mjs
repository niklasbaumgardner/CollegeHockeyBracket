import { html } from "lit";
import "./nb-email-updates.mjs";
import { NikElement } from "./nik-element.mjs";

const BRACKET_OPEN = new Date("2026-03-22T20:00:00.000Z");
const BRACKET_CLOSE = new Date("2026-03-26T17:30:00.000Z");

// Times for testing
// const BRACKET_CLOSE = Date.now() + 5000;
// const BRACKET_OPEN = Date.now() + 5000;

export class Countdown extends NikElement {
  static properties = {
    type: { type: String, reflect: true },
    size: { type: String },
  };

  extractFromMs(ms) {
    let seconds = ms / 1000;
    let newDate = new Date(ms);

    let days = Math.floor(seconds / (3600 * 24));
    let hours = newDate.toISOString().substring(11, 13);
    let mins = newDate.toISOString().substring(14, 16);
    let secs = newDate.toISOString().substring(17, 19);

    return { days, hours, mins, secs };
  }

  get timeToClose() {
    const ms = BRACKET_CLOSE - Date.now();
    return this.extractFromMs(ms);
  }

  get timeToOpen() {
    const ms = BRACKET_OPEN - Date.now();
    return this.extractFromMs(ms);
  }

  connectedCallback() {
    super.connectedCallback();

    const ttc = BRACKET_CLOSE - Date.now();
    if (!CAN_EDIT_BRACKET && ttc < 0) {
      this.remove();
    }
  }

  startInterval() {
    if (this.intervalID) {
      return;
    }

    this.intervalID = setInterval(() => {
      this.intervalHandler();
    }, 1000);
  }

  intervalHandler() {
    const tto = BRACKET_OPEN - Date.now();
    if (!CAN_EDIT_BRACKET && tto < 0) {
      setTimeout(() => location.reload(), 10000);
      this.stopInterval();
    }

    this.requestUpdate();
  }

  stopInterval() {
    clearInterval(this.intervalID);
  }

  messageTemplate() {
    const tto = BRACKET_OPEN - Date.now();
    const ttc = BRACKET_CLOSE - Date.now();
    const oneHourMs = 3600000;

    if (!CAN_EDIT_BRACKET && tto > 0) {
      this.type = "timeToOpen";
      this.startInterval();
      return html`${CURRENT_YEAR} brackets will be available on
        <wa-format-date
          date=${BRACKET_OPEN}
          month="long"
          day="numeric"
        ></wa-format-date>`;
    } else if (!CAN_EDIT_BRACKET && tto < 0 && tto > -oneHourMs) {
      this.type = "timeToOpen";
      this.stopInterval();
      return "Brackets will be available shortly. Check back soon.";
    } else if (CAN_EDIT_BRACKET && ttc > 0) {
      this.type = "timeToClose";
      this.startInterval();
      return html`Brackets will close on
        <wa-format-date
          date=${BRACKET_CLOSE}
          month="long"
          day="numeric"
        ></wa-format-date>
        at
        <wa-format-date
          date=${BRACKET_CLOSE}
          hour="numeric"
          minute="numeric"
        ></wa-format-date>`;
    } else if (CAN_EDIT_BRACKET && ttc < 0) {
      this.type = "timeToClose";
      setTimeout(() => location.reload(), 10000);
      this.stopInterval();
      return "Let the madness begin!";
    }
    // I think that's it?
  }

  timeCardTemplate(value, unit) {
    return html`<wa-card class="default-bg default-border time-card"
      ><div class="wa-stack items-center">
        <span class="time-value">${value}</span>
        <span class="uppercase">${unit + (value == 1 ? "" : "s")}</span>
      </div></wa-card
    >`;
  }

  timerTemplate() {
    let { days, hours, mins, secs } =
      this.type === "timeToOpen" ? this.timeToOpen : this.timeToClose;

    if (days < 0) {
      return null;
    }

    return html`<div
      class="wa-cluster ${this.size === "small" ? "gap-(--wa-space-xs)" : ""}"
    >
      ${[
        [days, "day"],
        [hours, "hour"],
        [mins, "minute"],
        [secs, "second"],
      ].map((arr) => this.timeCardTemplate(...arr))}
    </div>`;
  }

  handleSubcribeClick() {
    if (!this.emailUpdatesEl) {
      let el = document.createElement("nb-email-updates");
      document.body.append(el);
      this.emailUpdatesEl = el;
    }

    this.emailUpdatesEl.show();
  }

  subscribeButtonTemplate() {
    // html`<wa-button
    //   appearance="plain"
    //   variant="brand"
    //   @click=${this.handleSubcribeClick}
    //   >Subscribe to email updates</wa-button
    // >`;
  }

  render() {
    if (this.size === "small") {
      return html`<div class="wa-cluster">
        <div>${this.messageTemplate()}</div>
        ${this.timerTemplate()}
      </div>`;
    }
    return html`<wa-card class="default-bg default-border"
      ><div class="wa-stack items-center">
        <h4>${this.messageTemplate()}</h4>
        ${this.timerTemplate()}
      </div></wa-card
    >`;
  }
}

customElements.define("nb-countdown", Countdown);
