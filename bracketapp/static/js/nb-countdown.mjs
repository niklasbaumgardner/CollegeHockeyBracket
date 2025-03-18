import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

const BRACKET_CLOSE = new Date("2025-03-27T18:00:00.000Z");

export class Countdown extends NikElement {
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

    setInterval(() => {
      this.requestUpdate();
    }, 1000);
  }

  countdownTemplate() {
    let { days, hours, mins, secs } = this.countdown;
    return html`<div>
      <sl-card style="--sl-panel-background-color:var(--sl-color-danger-300)"
        >${days} DAYS</sl-card
      ><sl-card>${hours} HOURS</sl-card><sl-card>${mins} MINUTES</sl-card
      ><sl-card>${secs} SECONDS</sl-card>
    </div>`;
  }

  render() {
    return html`<sl-alert variant="primary" open>
      <div>
        Brackets will close on
        <sl-format-date
          date=${BRACKET_CLOSE}
          month="long"
          day="numeric"
        ></sl-format-date>
        at 2:00PM
      </div>
      ${this.countdownTemplate()}</sl-alert
    >`;
  }
}

customElements.define("nb-countdown", Countdown);
