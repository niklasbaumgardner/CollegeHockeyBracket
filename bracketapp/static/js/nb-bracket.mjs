import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./nb-matchup.mjs";
import { BracketPointsChart } from "./nb-bracket-points-charts.mjs";

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
      force || !this.correct.winner || this.correct.winner === team.id;
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
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game2,
        correct: this.correct.games.game2,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game3,
        correct: this.correct.games.game3,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game4,
        correct: this.correct.games.game4,
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
    if (!this.correct.winner) {
      return null;
    }

    return html`<div class="d-flex flex-column align-items-center">
      ${this.getImageElement(this.correct.winner_team)}
      <p>Champion</p>
    </div>`;
  }

  getChampionPickIcon() {
    if (!this.bracket?.winner) {
      return null;
    }

    if (this.correct.winner) {
      if (this.correct.winner === this.bracket?.winner) {
        return html`<sl-icon name="check-circle-fill"></sl-icon>`;
      }
      return html`<sl-icon name="x-circle-fill"></sl-icon>`;
    }
    return null;
  }

  pickedChampionTemplate() {
    if (!this.bracket?.winner) {
      return null;
    }

    return html` <div class="d-flex flex-column align-items-center">
      ${this.getImageElement(this.bracket?.winner_team)}
      <p class="champion-pick">
        ${IS_ME ? "Your pick" : "Their pick"}${this.getChampionPickIcon()}
      </p>
    </div>`;
  }

  predictedScoreTemplate() {
    if (!this.bracket?.w_goals || !this.bracket?.l_goals) {
      return null;
    }

    return html`<div>
      <p class="fs-6">Predicted Score:</p>
      <p class="fs-6 display-inline-flex">
        <span class="p-2 border border-dark-subtle"
          >${this.bracket?.w_goals}</span
        ><span class="p-2"> - </span
        ><span class="p-2 border border-dark-subtle"
          >${this.bracket?.l_goals}</span
        >
      </p>
    </div>`;
  }

  championTemplate() {
    return html`<div class="round-final my-auto">
      <sl-card>
        <div class="champion-card">
          <span class="champion-top">${this.default.year} Championship</span>
          <div class="d-flex justify-content-center gap-4">
            ${this.pickedChampionTemplate()} ${this.correctChampionTemplate()}
          </div>
          <sl-divider class="w-100"></sl-divider>
          <div class="d-flex gap-4">
            <div>
              ${this.matchupTemplate({
                winnerTop: this.bracket?.games.game13.winner_team,
                winnerBottom: this.bracket?.games.game14.winner_team,
                correctTop: this.correct.games.game13.winner_team,
                correctBottom: this.correct.games.game14.winner_team,
                correct: this.correct.games.game15,
              })}
            </div>
            ${this.predictedScoreTemplate()}
          </div>
        </div>
      </sl-card>
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
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game6,
        correct: this.correct.games.game6,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game7,
        correct: this.correct.games.game7,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game8,
        correct: this.correct.games.game8,
      })}
    </div>`;
  }

  chartTemplate() {
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
      return html`<div class="d-flex justify-content-center">
          <h2>${this.correct.name}</h2>
        </div>
        <div class="d-flex justify-content-center gap-4 flex-wrap">
          ${this.correct.winner_team.team.name} beat ${loser_team.team.name} to
          win the championship this year
        </div>`;
    }

    return html`<div class="d-flex flex-wrap gap-4">
      <div>
        <div
          class="d-flex justify-content-center align-items-center gap-4 flex-wrap mb-3"
        >
          ${this.getImageElement(this.bracket?.winner_team, true)}
          <div class="d-flex flex-column">
            <h2>${this.bracket.name}</h2>
            <div class="d-flex justify-content-evenly">
              <div class="d-flex">
                <span
                  ><p class="bracket-details-content">
                    ${this.bracket?.rank ?? "--"}
                  </p>
                  <p class="bracket-details-label">Rank</p></span
                >
              </div>
              <div class="d-flex">
                <sl-divider vertical></sl-divider>
                <span
                  ><p class="bracket-details-content">
                    ${this.bracket?.points}
                  </p>
                  <p class="bracket-details-label">Points</p></span
                >
              </div>
              <div class="d-flex">
                <sl-divider vertical></sl-divider>
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

        <div
          class="bracket-sub-details d-flex flex-column align-content-center"
        >
          <div class="d-flex justify-content-evenly flex-wrap">
            <div class="d-flex">
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.r2 ?? "--"} / 80
                </p>
                <p class="bracket-details-label">Round 1</p></span
              >
            </div>
            <div class="d-flex">
              <sl-divider vertical></sl-divider>
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.r2 ?? "--"} / 80
                </p>
                <p class="bracket-details-label">Round 2</p></span
              >
            </div>
            <div class="d-flex">
              <sl-divider vertical></sl-divider>
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.r3 ?? "--"} / 80
                </p>
                <p class="bracket-details-label">Final Four</p></span
              >
            </div>
            <div class="d-flex">
              <sl-divider vertical></sl-divider>
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.r4 ?? "--"} / 80
                </p>
                <p class="bracket-details-label">Championship</p></span
              >
            </div>
          </div>
        </div>
      </div>
      ${this.chartTemplate()}
    </div>`;
  }

  topCardTemplate() {
    return html`<div class="d-flex justify-content-center">
      <sl-card class="width-fit-content mb-3">${this.topCardStats()}</sl-card>
    </div>`;
  }

  render() {
    // let roundPoints = html`<div class="d-flex flex-wrap bracket-sub-details">
    //   <div class="d-flex">
    //     <span
    //       ><p class="bracket-details-content">${this.bracket?.r1}</p>
    //       <p class="bracket-details-label">Round 1 points</p></span
    //     >
    //   </div>
    //   <div class="d-flex">
    //     <sl-divider vertical></sl-divider>
    //     <span
    //       ><p class="bracket-details-content">${this.bracket?.r2}</p>
    //       <p class="bracket-details-label">Round 2 points</p></span
    //     >
    //   </div>
    //   <div class="d-flex">
    //     <sl-divider vertical></sl-divider>
    //     <span
    //       ><p class="bracket-details-content">${this.bracket?.r3}</p>
    //       <p class="bracket-details-label">Round 3 points</p></span
    //     >
    //   </div>
    //   <div class="d-flex">
    //     <sl-divider vertical></sl-divider>
    //     <span
    //       ><p class="bracket-details-content">${this.bracket?.r4}</p>
    //       <p class="bracket-details-label">Round 4 points</p></span
    //     >
    //   </div>
    // </div>`;

    return html`<div class="w-100">
      ${this.topCardTemplate()}

      <div class="${this.getBracketClass()}">
        <div class="round-one-left">
          <sl-card class="round-details">Round 1</sl-card>
          ${this.roundOneLeftTemplate()}
        </div>

        <div class="round-two-left">
          <sl-card class="round-details">Round 2</sl-card>
          ${this.roundTwoLeftTemplate()}
        </div>

        <div class="round-three-left">
          <sl-card class="round-details">Round 3</sl-card>
          ${this.roundThreeLeftTemplate()}
        </div>

        ${this.championTemplate()}

        <div class="round-three-right">
          <sl-card class="round-details">Round 3</sl-card>
          ${this.roundThreeRightTemplate()}
        </div>

        <div class="round-two-right">
          <sl-card class="round-details">Round 2</sl-card>
          ${this.roundTwoRightTemplate()}
        </div>

        <div class="round-one-right">
          <sl-card class="round-details">Round 1</sl-card>
          ${this.roundOneRightTemplate()}
        </div>
      </div>
    </div>`;
  }
}

export default Bracket;

customElements.define("nb-bracket", Bracket);
