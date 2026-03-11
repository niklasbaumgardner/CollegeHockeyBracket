import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import "./nb-email-updates.mjs";

const BRACKET_CLOSE = new Date("2025-03-27T18:00:00.000Z");
const BRACKET_OPEN = new Date("2026-03-23T00:00:00.000Z");

// TODO: 2026 guess is
// const BRACKET_CLOSE = new Date("2025-03-26T18:00:00.000Z");

export class Countdown extends NikElement {
  static properties = { type: { type: String, reflect: true } };

  get timeToClose() {
    const ms = BRACKET_CLOSE - Date.now();
    let seconds = ms / 1000;
    let newDate = new Date(ms);

    let days = Math.floor(seconds / (3600 * 24));
    let hours = newDate.toISOString().substring(11, 13);
    let mins = newDate.toISOString().substring(14, 16);
    let secs = newDate.toISOString().substring(17, 19);
    return { days, hours, mins, secs };
  }

  get timeToOpen() {
    const ms = BRACKET_OPEN - Date.now();
    let seconds = ms / 1000;
    let newDate = new Date(ms);

    let days = Math.floor(seconds / (3600 * 24));
    let hours = newDate.toISOString().substring(11, 13);
    let mins = newDate.toISOString().substring(14, 16);
    let secs = newDate.toISOString().substring(17, 19);
    return { days, hours, mins, secs };
  }

  connectedCallback() {
    super.connectedCallback();

    if (!CAN_EDIT_BRACKET && BRACKET_OPEN - Date.now() > 0) {
      this.type = "timeToOpen";
    } else if (CAN_EDIT_BRACKET && BRACKET_CLOSE - Date.now() < 0) {
      this.type = "timeToClose";
    }

    if (this.maybeDestroy()) {
      return;
    }

    this.intervalID = setInterval(() => {
      this.maybeRequestUpdate();
    }, 1000);
  }

  maybeRequestUpdate() {
    if (this.maybeDestroy()) {
      return;
    }

    this.requestUpdate();
  }

  destroy() {
    clearInterval(this.intervalID);
    this.remove();
  }

  maybeDestroy() {
    const tto = BRACKET_OPEN - Date.now();
    if (!CAN_EDIT_BRACKET && tto > 0) {
      return false;
    }

    const ttc = BRACKET_CLOSE - Date.now();
    if (!CAN_EDIT_BRACKET || ttc < 0) {
      this.destroy();
      return true;
    }

    return false;
  }

  timeCardTemplate(value, unit) {
    return html`<wa-card class="default-bg default-border"
      ><div class="wa-stack items-center gap-(--wa-space-xs)">
        <span class="wa-heading-xl">${value}</span>
        <span class="uppercase">${unit + (value == 1 ? "" : "s")}</span>
      </div></wa-card
    >`;
  }

  countdownTemplate() {
    let { days, hours, mins, secs } = this.timeToClose;
    return html`<div class="wa-cluster">
      ${[
        [days, "day"],
        [hours, "hour"],
        [mins, "minute"],
        [secs, "second"],
      ].map((arr) => this.timeCardTemplate(...arr))}
    </div>`;
  }

  timeToCloseTemplate() {
    return html`<wa-card class="default-bg default-border"
      ><div class="wa-stack items-center">
        <h4>
          Brackets will close on
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
          ></wa-format-date>
        </h4>
        ${this.countdownTemplate()}
      </div></wa-card
    >`;
  }

  countupTemplate() {
    let { days, hours, mins, secs } = this.timeToOpen;
    return html`<div class="wa-cluster">
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

  timeToOpenTemplate() {
    const tto = BRACKET_OPEN - Date.now();
    if (tto < 0) {
      return html`<wa-card class="default-bg default-border"
        ><div class="wa-stack items-center">
          <h4>Brackets will be available shortly. Check back soon.</h4>
        </div></wa-card
      >`;
    }
    return html`<wa-card class="default-bg default-border"
      ><div class="wa-stack items-center">
        <h4>
          Brackets will be available on
          <wa-format-date
            date=${BRACKET_OPEN}
            month="long"
            day="numeric"
          ></wa-format-date>
        </h4>
        ${this.countupTemplate()}
      </div></wa-card
    >`;

    // html`<wa-button
    //   appearance="plain"
    //   variant="brand"
    //   @click=${this.handleSubcribeClick}
    //   >Subscribe to email updates</wa-button
    // >`;
  }

  render() {
    if (this.type === "timeToClose") {
      return this.timeToCloseTemplate();
    } else if (this.type === "timeToOpen") {
      return this.timeToOpenTemplate();
    }
  }
}

customElements.define("nb-countdown", Countdown);
