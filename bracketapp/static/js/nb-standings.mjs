import { StandingsGrid } from "./nb-standings-grid.mjs";
import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";

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
    let response = await fetch(LEADERBOARD_CONTENT_URL, {
      credentials: "include",
      mode: "no-cors",
    });
    let data = await response.json();
    let { standings, winners, year } = data;
    this.brackets = standings;
    this.winners = winners;
    this.year = year;
  }

  getWinningMessage() {
    let winnerTitle = "Winner" + (this.numWinners > 1 ? "s" : "");
    let winners = this.winners.map((w) => w.user.username).join(", ");

    // TODO: fix bg color
    return html`<wa-card
      class=""
      style="--wa-panel-background-color:var(--wa-color-neutral-10);"
      ><div class="wa-stack gap-(--wa-space-s) justify-center items-center">
        <wa-icon
          style="color:var(--color-amber-50);font-size:var(--wa-font-size-3xl);"
          name="trophy"
        ></wa-icon>
        <p>${winnerTitle}</p>
        <b>${winners}</b>
      </div></wa-card
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
      year=${this.year}
      .brackets=${this.brackets}
      theme=${this.theme}
    ></nb-standings-grid>`;
  }

  render() {
    if (!this.year) {
      return null;
    }

    return html`<div class="flex justify-center">
      <wa-card>
        <div class="wa-stack">
          ${this.titleTemplate()} ${this.messageTemplate()}
          ${this.bracketsTemplate()}
        </div>
      </wa-card>
    </div>`;
  }
}

customElements.define("nb-standings", Standings);
