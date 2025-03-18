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

  maybeDestroy() {
    const ms = BRACKET_CLOSE - Date.now();
    if (!CAN_EDIT_BRACKET || ms < 0) {
      clearInterval(this.intervalID);
      this.remove();
      return true;
    }

    return false;
  }

  timeCardTemplate(value, unit) {
    return html`<sl-card
      class="width-fit-content"
      style="--sl-panel-background-color:var(--sl-color-danger-300);--padding:var(--sl-spacing-small);--border-radius:var(--sl-border-radius-large);"
      ><div class="d-flex flex-column align-items-center">
        <h5>${value}</h5>
        <span>${unit + (value == 1 ? "" : "s")}</span>
      </div></sl-card
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
    return html`<sl-card>
      <div class="d-flex flex-column align-items-center">
        <h6>
          Brackets will close on
          <sl-format-date
            date=${BRACKET_CLOSE}
            month="long"
            day="numeric"
          ></sl-format-date>
          at
          <sl-format-date
            date=${BRACKET_CLOSE}
            hour="numeric"
            minute="numeric"
          ></sl-format-date>
        </h6>
        ${this.countdownTemplate()}
      </div>
    </sl-card>`;
  }
}

customElements.define("nb-countdown", Countdown);
