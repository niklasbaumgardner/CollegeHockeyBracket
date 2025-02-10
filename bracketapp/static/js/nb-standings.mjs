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
    year: { type: String },
  };

  get numWinners() {
    return this.winners.length;
  }

  getMessage() {
    if (this.numWinners === 1) {
      let winner = this.winners[0];
      return `Congrats to ${winner.user.username} for winning this years bracket challenge!`;
    }
    return "Hello world";
  }

  render() {
    return html`<div class="d-flex justify-content-center">
      <sl-card class="mb-5 width-fit-content">
        <div slot="header">
          <h2>${this.year} Standings</h2>
        </div>
        <div class="mb-3">${this.getMessage()}</div>

        <nb-standings-grid
          .brackets=${this.brackets}
          theme=${this.theme}
        ></nb-standings-grid>
      </sl-card>
    </div>`;
  }
}

customElements.define("nb-standings", Standings);
