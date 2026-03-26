import "./nb-standings-grid.mjs";
import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

export class Standings extends NikElement {
  static properties = {
    brackets: {
      type: Object,
    },
    winners: { type: Object },
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

  winnersTemplate() {
    let winnerTitle = "Winner" + (this.numWinners > 1 ? "s" : "");
    let winners = this.winners
      .flatMap((w) => [
        html`<b>${w.name}</b> <small>(${w.user.username})</small>`,
        html`, `,
      ])
      .slice(0, -1);

    return html`<wa-card
      ><div class="wa-stack gap-(--wa-space-s) justify-center items-center">
        <wa-icon
          style="color:var(--color-amber-500);font-size:var(--wa-font-size-3xl);"
          name="trophy"
          library="hero"
          variant="outline"
        ></wa-icon>
        <p>${winnerTitle}</p>
        <p>${winners}</p>
      </div></wa-card
    >`;
  }

  titleTemplate() {
    return html`<div><h2>${this.year} Leaderboard</h2></div>`;
  }

  calculateStats() {
    if (CAN_EDIT_BRACKET && this.year === CURRENT_YEAR) {
      this.stats = {};
      return;
    }

    let stats = {};
    stats.perfectBrackets = this.brackets.filter(
      (b) => b.max_points === 320,
    ).length;
    stats.possiblePerfectBrackets = this.brackets.filter(
      (b) => b.points > 0,
    ).length;

    let winnerIdCounts = {};
    for (let bracket of this.brackets) {
      if (winnerIdCounts[bracket.winner_team.team.name]) {
        winnerIdCounts[bracket.winner_team.team.name][1] += 1;
      } else {
        winnerIdCounts[bracket.winner_team.team.name] = [
          bracket.winner_team.team.icon_path,
          1,
        ];
      }
    }

    winnerIdCounts = Object.entries(winnerIdCounts)
      .sort((a, b) => b[1][1] - a[1][1])
      .slice(0, 3);

    stats.mostPickedWinners = winnerIdCounts;

    this.stats = stats;
  }

  statsTemplate() {
    if (CAN_EDIT_BRACKET && this.year === CURRENT_YEAR) {
      return null;
    }

    return html`<wa-card
      ><div class="wa-stack">
        ${this.stats.possiblePerfectBrackets > 0
          ? html`<div class="flex justify-center items-center wa-gap-m">
              <span>Perfect brackets remaining</span>
              <h2>${this.stats.perfectBrackets}</h2>
            </div>`
          : null}
        <div class="wa-cluster justify-center">
          ${this.stats.mostPickedWinners.map(
            ([name, [icon_path, count]]) =>
              html`<wa-card
                ><div
                  class="flex flex-col justify-center items-center wa-gap-2xs"
                >
                  <div class="flex items-center wa-gap-xs">
                    <img
                      src=${STATIC_FILE_MAP[icon_path]}
                      class="standings-img"
                      alt=${name}
                    />
                    <h2>
                      ${((100 * count) / this.brackets.length).toFixed(2)}%
                    </h2>
                  </div>
                  <span>${name}</span>
                </div></wa-card
              >`,
          )}
        </div>
      </div>
    </wa-card>`;
  }

  messageTemplate() {
    this.calculateStats();
    //     if (CAN_EDIT_BRACKET && this.year === CURRENT_YEAR) {
    // return html`<nb-countdown></nb-countdown>`;
    //     } else
    if (this.numWinners > 0) {
      return this.winnersTemplate();
    }
    return html`<nb-countdown></nb-countdown>${this.statsTemplate()}`;

    // TODO: Do we really need below options?
    // else if (this.brackets.length && this.year === CURRENT_YEAR) {
    //   return "View the current standings below.";
    // }
    // return "View the final standings below.";
  }

  bracketsTemplate() {
    return html`<nb-standings-grid
      year=${this.year}
      .brackets=${this.brackets}
    ></nb-standings-grid>`;
  }

  render() {
    if (!this.year) {
      return null;
    }

    return html`<wa-card>
      <div class="wa-stack">
        ${this.titleTemplate()} ${this.messageTemplate()}
        ${this.bracketsTemplate()}
      </div>
    </wa-card>`;
  }
}

customElements.define("nb-standings", Standings);
