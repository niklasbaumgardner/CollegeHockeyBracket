import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

const BRACKET_CLOSE = new Date("2025-03-27T18:00:00.000Z");

export class Countdown extends NikElement {
  static properties = { bracketsOpen: Boolean };

  get countdown() {
    const ms = BRACKET_CLOSE - Date.now();
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
    const ms = BRACKET_CLOSE - Date.now();
    if (!CAN_EDIT_BRACKET || ms < 0) {
      this.destroy();
      return true;
    }

    return false;
  }

  timeCardTemplate(value, unit) {
    return html`<wa-card
      class="width-fit-content"
      style="--wa-panel-background-color:var(--wa-color-danger-300); --border-color:var(--wa-color-danger-300); --padding:var(--wa-spacing-x-small); --border-radius:var(--wa-border-radius-large);"
      ><div class="d-flex flex-column align-items-center">
        <h5>${value}</h5>
        <span>${unit + (value == 1 ? "" : "s")}</span>
      </div></wa-card
    >`;
  }

  countdownTemplate() {
    let { days, hours, mins, secs } = this.countdown;
    return html`<div class="d-flex gap-2">
      ${[
        [days, "day"],
        [hours, "hour"],
        [mins, "minute"],
        [secs, "second"],
      ].map((arr) => this.timeCardTemplate(...arr))}
    </div>`;
  }

  render() {
    // TODO: fix me
    return html`<wa-card
      style="--wa-panel-background-color:var(--wa-color-danger-50);"
      ><div class="d-flex flex-column align-items-center">
        <h6>
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
        </h6>
        ${this.countdownTemplate()}
      </div></wa-card
    >`;
  }
}

customElements.define("nb-countdown", Countdown);
