import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import "./nb-matchup.mjs";
import "./nb-bracket-points-charts.mjs";
import "./nb-group-bracket-details.mjs";
import { ifDefined } from "lit/directives/if-defined.js";

class Bracket extends NikElement {
  static properties = {
    bracket: {
      type: Object,
    },
    correct: {
      type: Object,
    },
    default: {
      type: Object,
    },
    type: { type: String },
  };

  getImageElement(team, force = false) {
    if (!team) {
      return null;
    }

    let isWinnerCorrect =
      force || !this.correct.winner_id || this.correct.winner_id === team.id;
    return html`<img
      class="winner-img ${isWinnerCorrect ? "" : "greyscale"}"
      src="${team.team.icon_path}"
      alt="${team.team.name}"
    />`;
  }

  getBracketClass() {
    if (this.type === "edit") {
      return "bracket-grid-edit";
    } else if (this.type === "correct") {
      return "cbracket-grid";
    } else if (this.type === "correct-edit") {
      return "cbracket-grid-edit";
    }
    return "bracket-grid";
  }

  matchupTemplate(options) {
    if (options.type === "default") {
      return html`<nb-matchup
        type="default"
        .default=${options.default}
        .correct=${options.correct}
        .winnerTop=${ifDefined(options.winnerTop)}
      ></nb-matchup>`;
    }

    return html`<nb-matchup
      .winnerTop=${options.winnerTop}
      .winnerBottom=${options.winnerBottom}
      .correctTop=${options.correctTop}
      .correctBottom=${options.correctBottom}
      .correct=${options.correct}
    ></nb-matchup>`;
  }

  roundOneLeftTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game1,
        correct: this.correct.games.game1,
        winnerTop: this.bracket?.games.game1.winner_team,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game2,
        correct: this.correct.games.game2,
        winnerTop: this.bracket?.games.game2.winner_team,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game3,
        correct: this.correct.games.game3,
        winnerTop: this.bracket?.games.game3.winner_team,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game4,
        correct: this.correct.games.game4,
        winnerTop: this.bracket?.games.game4.winner_team,
      })}
    </div>`;
  }

  roundTwoLeftTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games.game1.winner_team,
        winnerBottom: this.bracket?.games.game2.winner_team,
        correctTop: this.correct.games.game1.winner_team,
        correctBottom: this.correct.games.game2.winner_team,
        correct: this.correct.games.game9,
      })}
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games.game3.winner_team,
        winnerBottom: this.bracket?.games.game4.winner_team,
        correctTop: this.correct.games.game3.winner_team,
        correctBottom: this.correct.games.game4.winner_team,
        correct: this.correct.games.game10,
      })}
    </div>`;
  }

  roundThreeLeftTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games.game9.winner_team,
        winnerBottom: this.bracket?.games.game10.winner_team,
        correctTop: this.correct.games.game9.winner_team,
        correctBottom: this.correct.games.game10.winner_team,
        correct: this.correct.games.game13,
      })}
    </div>`;
  }

  correctChampionTemplate() {
    if (!this.correct.winner_team) {
      return null;
    }

    return html`<div class="flex flex-col items-center gap-(--wa-space-2xs)">
      <div class="flex gap-(--wa-space-s) items-center">
        <h4>${this.correct.year} Champion</h4>
      </div>
      ${this.getImageElement(this.correct?.winner_team)}
    </div>`;
  }

  getChampionPickIcon() {
    if (!this.bracket?.winner_team) {
      return null;
    }

    if (this.correct.winner_team) {
      if (this.correct.winner_id === this.bracket?.winner_id) {
        return html`<wa-icon
          auto-width
          library="hero"
          name="check-circle"
          variant="solid"
        ></wa-icon>`;
      }
      return html`<wa-icon
        auto-width
        library="hero"
        name="x-circle"
        variant="solid"
      ></wa-icon>`;
    }
    return null;
  }

  pickedChampionTemplate() {
    if (!this.bracket?.winner_team) {
      return null;
    }

    return html`<div class="flex flex-col items-center gap-(--wa-space-2xs)">
      <span>Championship pick</span>
      <div class="flex gap-(--wa-space-s) items-center wa-heading-l">
        <span>${this.bracket.winner_team.team.name}</span
        >${this.getChampionPickIcon()}
      </div>
      ${this.getImageElement(this.bracket?.winner_team)}
    </div>`;
  }

  predictedScoreTemplate() {
    if (!this.bracket?.winner_goals || !this.bracket?.loser_goals) {
      return null;
    }

    return html`<div class="flex flex-col text-(length:--wa-font-size-s)">
      <div>Tiebreaker</div>
      <div class="flex justify-center text-(length:--wa-font-size-xs)">
        Final score: ${this.bracket?.winner_goals} -
        ${this.bracket?.loser_goals}
      </div>
    </div>`;
  }

  championTemplate() {
    return html`<div class="round-final">
      <wa-card class="final-card">
        <div class="wa-stack">
          ${this.type === "correct"
            ? this.correctChampionTemplate()
            : this.pickedChampionTemplate()}
          ${this.matchupTemplate({
            winnerTop: this.bracket?.games.game13.winner_team,
            winnerBottom: this.bracket?.games.game14.winner_team,
            correctTop: this.correct.games.game13.winner_team,
            correctBottom: this.correct.games.game14.winner_team,
            correct: this.correct.games.game15,
          })}
          ${this.predictedScoreTemplate()}
        </div>
      </wa-card>
    </div>`;
  }

  roundThreeRightTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games.game11.winner_team,
        winnerBottom: this.bracket?.games.game12.winner_team,
        correctTop: this.correct.games.game11.winner_team,
        correctBottom: this.correct.games.game12.winner_team,
        correct: this.correct.games.game14,
      })}
    </div>`;
  }

  roundTwoRightTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games.game5.winner_team,
        winnerBottom: this.bracket?.games.game6.winner_team,
        correctTop: this.correct.games.game5.winner_team,
        correctBottom: this.correct.games.game6.winner_team,
        correct: this.correct.games.game11,
      })}
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games.game7.winner_team,
        winnerBottom: this.bracket?.games.game8.winner_team,
        correctTop: this.correct.games.game7.winner_team,
        correctBottom: this.correct.games.game8.winner_team,
        correct: this.correct.games.game12,
      })}
    </div>`;
  }

  roundOneRightTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game5,
        correct: this.correct.games.game5,
        winnerTop: this.bracket?.games.game5.winner_team,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game6,
        correct: this.correct.games.game6,
        winnerTop: this.bracket?.games.game6.winner_team,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game7,
        correct: this.correct.games.game7,
        winnerTop: this.bracket?.games.game7.winner_team,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game8,
        correct: this.correct.games.game8,
        winnerTop: this.bracket?.games.game8.winner_team,
      })}
    </div>`;
  }

  chartTemplate() {
    return null;
    const points = {
      gained: this.bracket.points,
      lost: 320 - this.bracket.max_points,
      unplayed: this.bracket.max_points - this.bracket.points,
    };
    return html`<nb-bracket-points-chart
      class="mx-auto"
      .points=${points}
    ></nb-bracket-points-chart>`;
  }

  groupsTemplate() {
    if (!this.bracket.group_brackets.length) {
      return null;
    }

    return html`<nb-group-bracket-details
      .groupBrackets=${this.bracket.group_brackets}
    ></nb-group-bracket-details>`;
  }

  topCardStats() {
    if (this.type === "correct") {
      let loser_team;
      if (
        this.correct.winner_team.id === this.correct.games.game13.winner_team.id
      ) {
        loser_team = this.correct.games.game14.winner_team;
      } else {
        loser_team = this.correct.games.game13.winner_team;
      }
      return html`<div class="wa-stack items-center">
        <h2>${this.correct.name}</h2>
        <p>
          ${this.correct.winner_team.team.name} beat ${loser_team.team.name} to
          win the championship this year
        </p>
      </div> `;
    }

    return html`<div class="wa-stack">
      <div class="wa-cluster">
        ${this.getImageElement(this.bracket?.winner_team, true)}
        <div class="wa-stack">
          <h2>${this.bracket.name}</h2>
          <div class="flex justify-evenly">
            <div class="flex">
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.rank ?? "--"}
                </p>
                <p class="bracket-details-label">Rank</p></span
              >
            </div>
            <div class="flex">
              <wa-divider orientation="vertical"></wa-divider>
              <span
                ><p class="bracket-details-content">${this.bracket?.points}</p>
                <p class="bracket-details-label">Points</p></span
              >
            </div>
            <div class="flex">
              <wa-divider orientation="vertical"></wa-divider>
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.max_points}
                </p>
                <p class="bracket-details-label">Max points</p></span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="bracket-sub-details wa-stack">
        <div class="flex justify-evenly">
          <div class="flex">
            <span
              ><p class="bracket-details-content">
                ${this.bracket?.round_one_points ?? "--"} / 80
              </p>
              <p class="bracket-details-label">Round 1</p></span
            >
          </div>
          <div class="flex">
            <wa-divider orientation="vertical"></wa-divider>
            <span
              ><p class="bracket-details-content">
                ${this.bracket?.round_two_points ?? "--"} / 80
              </p>
              <p class="bracket-details-label">Round 2</p></span
            >
          </div>
          <div class="flex">
            <wa-divider orientation="vertical"></wa-divider>
            <span
              ><p class="bracket-details-content">
                ${this.bracket?.round_three_points ?? "--"} / 80
              </p>
              <p class="bracket-details-label">Frozen Four</p></span
            >
          </div>
          <div class="flex">
            <wa-divider orientation="vertical"></wa-divider>
            <span
              ><p class="bracket-details-content">
                ${this.bracket?.round_four_points ?? "--"} / 80
              </p>
              <p class="bracket-details-label">Championship</p></span
            >
          </div>
        </div>
      </div>
      ${this.groupsTemplate()}
    </div>`;
  }

  topCardTemplate() {
    return html`<div class="flex justify-center">
      <wa-card>${this.topCardStats()}</wa-card>
    </div>`;
  }

  render() {
    return html`<div class="w-full wa-stack">
      ${this.topCardTemplate()}

      <wa-scroller>
        <div class="${this.getBracketClass()}">
          <div class="round-one-left">
            <wa-card class="round-details">Round 1</wa-card>
            ${this.roundOneLeftTemplate()}
          </div>

          <div class="round-two-left">
            <wa-card class="round-details">Round 2</wa-card>
            ${this.roundTwoLeftTemplate()}
          </div>

          <div class="round-three-left">
            <wa-card class="round-details">Frozen Four</wa-card>
            ${this.roundThreeLeftTemplate()}
          </div>

          <div class="round-final-middle flex flex-col">
            <wa-card class="round-details">Championship</wa-card
            >${this.championTemplate()}
          </div>

          <div class="round-three-right">
            <wa-card class="round-details">Frozen Four</wa-card>
            ${this.roundThreeRightTemplate()}
          </div>

          <div class="round-two-right">
            <wa-card class="round-details">Round 2</wa-card>
            ${this.roundTwoRightTemplate()}
          </div>

          <div class="round-one-right">
            <wa-card class="round-details">Round 1</wa-card>
            ${this.roundOneRightTemplate()}
          </div>
        </div>
      </wa-scroller>
    </div>`;
  }
}

export default Bracket;

customElements.define("nb-bracket", Bracket);
