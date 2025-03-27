import { StandingsGrid } from "./nb-standings-grid.mjs";
import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class Standings extends NikElement {
  static properties = {
    brackets: {
      type: Object,
    },
    winners: { type: Object },
    theme: {
      type: String,
    },
    year: { type: Number },
  };

  get numWinners() {
    return this.winners.length;
  }

  connectedCallback() {
    super.connectedCallback();

    this.requestContent();
  }

  async requestContent() {
    let response = await fetch(LEADERBOARD_CONTENT_URL);
    let data = await response.json();
    let { standings, winners, year } = data;
    this.brackets = standings;
    this.winners = winners;
    this.year = year;
  }

  getWinningMessage() {
    let winnerTitle = "Winner" + (this.numWinners > 1 ? "s" : "");
    let winners = this.winners.map((w) => w.user.username).join(", ");

    return html`<sl-card
      style="--sl-panel-background-color:var(--sl-color-neutral-100);"
      ><div
        class="d-flex flex-column gap-1 justify-content-center align-items-center"
      >
        <sl-icon
          style="color:var(--sl-color-amber-500);font-size:var(--sl-font-size-3x-large);"
          name="trophy"
        ></sl-icon>
        <p>${winnerTitle}</p>
        <b>${winners}</b>
      </div></sl-card
    >`;
  }

  titleTemplate() {
    return html`<div><h2>${this.year} Leaderboard</h2></div>`;
  }

  messageTemplate() {
    if (CAN_EDIT_BRACKET && this.year === CURRENT_YEAR) {
      return html`<nb-countdown></nb-countdown>`;
    } else if (this.numWinners > 0) {
      return this.getWinningMessage();
    } else if (this.brackets.length && this.year === CURRENT_YEAR) {
      return "View the current standings below.";
    }
    return "View the final standings below.";
  }

  bracketsTemplate() {
    return html`<nb-standings-grid
      .brackets=${this.brackets}
      theme=${this.theme}
    ></nb-standings-grid>`;
  }

  render() {
    if (!this.year) {
      return null;
    }

    return html`<div class="d-flex justify-content-center">
      <sl-card>
        ${this.titleTemplate()}
        <div class="d-flex flex-column gap-4">
          ${this.messageTemplate()}${this.bracketsTemplate()}
        </div>
      </sl-card>
    </div>`;
  }
}

customElements.define("nb-standings", Standings);
