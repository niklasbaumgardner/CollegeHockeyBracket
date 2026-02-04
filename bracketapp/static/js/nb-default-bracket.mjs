import { html, nothing } from "lit";
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
          ?selected=${this.default.games[`game${gameNumber}`][attribute]?.team
            .id === team.id}
        >
          ${team.name}
        </option>`,
    );

    options.unshift(
      html`<option value="">-- Please choose and option --</option>`,
    );

    return options;
  }

  gameTemplate(gameNumber) {
    return html`<wa-card
      ><div slot="header" class="wa-split">
        <label>Game ${gameNumber}</label
        ><label
          >Id:
          <input
            name="game${gameNumber}-id"
            type="text"
            value=${this.default.games?.[`game${gameNumber}`].id}
        /></label>
      </div>
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
        <input
          type="text"
          value=${this.default.games?.[`game${gameNumber}`].top_team_id}
          name="game${gameNumber}-top-bracket-team-id"
        />
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
        <input
          type="text"
          value=${this.default.games?.[`game${gameNumber}`].bottom_team_id}
          name="game${gameNumber}-bottom-bracket-team-id"
        /></div
    ></wa-card>`;
  }

  gamesTemplate(gameNumbers) {
    return gameNumbers.map((number) => this.gameTemplate(number));
  }

  render() {
    return html`<form action=${this.default.update_url} method="POST">
      <div class="wa-stack">
        <h2>${this.default.year} default bracket</h2>
        <div class="wa-split">
          <div class="wa-stack">${this.gamesTemplate([1, 2, 3, 4])}</div>
          <div class="wa-stack">${this.gamesTemplate([5, 6, 7, 8])}</div>
        </div>
        <wa-button class="w-full" variant="brand" type="submit"
          >Update bracket</wa-button
        >
      </div>
    </form>`;
  }
}

customElements.define("nb-default-bracket", DefaultBracket);
