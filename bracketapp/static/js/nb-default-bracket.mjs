import { html, nothing } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-edit-matchup.mjs";

export class DefaultBracket extends NikElement {
  static properties = {
    default: {
      type: Object,
    },
    teams: {
      type: Array,
    },
  };

  teamOptions(gameNumber, attribute) {
    let options = this.teams.map(
      (team) =>
        html`<option
          value=${team.id}
          ?selected=${this.default.games?.[`game${gameNumber}`][attribute].team
            .id === team.id}
        >
          ${team.name}
        </option>`
    );

    options.unshift(
      html`<option value="">-- Please choose and option --</option>`
    );

    return options;
  }

  gameTemplate(gameNumber) {
    return html`<wa-card
      ><label slot="header">Game ${gameNumber}</label>
      <div class="wa-stack">
        <label>Game ${gameNumber} top team</label>
        <div class="wa-split">
          <input
            value=${gameNumber % 2 === 1 ? 1 : 2}
            name="game${gameNumber}-top-team-rank"
          />
          <select name="game${gameNumber}-top-team-id" class="grow">
            ${this.teamOptions(gameNumber, "top_team")}
          </select>
        </div>
        <wa-divider></wa-divider>
        <label>Game ${gameNumber} bottom team</label>
        <div class="wa-split">
          <input
            value=${gameNumber % 2 === 1 ? 4 : 3}
            name="game${gameNumber}-bottom-team-rank"
          />
          <select name="game${gameNumber}-bottom-team-id" class="grow">
            ${this.teamOptions(gameNumber, "bottom_team")}
          </select>
        </div>
      </div></wa-card
    >`;
  }

  gamesTemplate(gameNumbers) {
    return gameNumbers.map((number) => this.gameTemplate(number));
  }

  render() {
    return html`<div class="w-100">
      <form action=${this.default.update_url} method="POST">
        <h2>${this.default.year} default bracket</h2>
        <div class="wa-split">
          <div class="wa-stack">${this.gamesTemplate([1, 2, 3, 4])}</div>
          <div class="wa-stack">${this.gamesTemplate([5, 6, 7, 8])}</div>
        </div>
      </form>
    </div>`;
  }
}

customElements.define("nb-default-bracket", DefaultBracket);
