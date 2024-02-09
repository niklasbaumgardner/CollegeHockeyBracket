import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./matchupEl.mjs";

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

  getImageUrl(teamName) {
    if (!teamName) {
      return "";
    }
    let filename = teamName.substring(2);
    filename = filename.replaceAll(" ", "");
    filename = filename.replaceAll(".", "");
    return `/static/images/${filename}.svg`;
  }

  getImageElement(team) {
    if (!team) {
      return null;
    }
    let isWinnerCorrect = this.correct?.winner && this.correct?.winner === team;
    return html`<img
      class="winner-img ${isWinnerCorrect ? "" : "greyscale"}"
      src="${this.getImageUrl(team)}"
      alt="${team}"
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
    } else if (options.type === "edit") {
      return html``;
    }

    return html`<nb-matchup
      winnerTop=${options.winnerTop}
      winnerBottom=${options.winnerBottom}
      correctTop=${options.correctTop}
      correctBottom=${options.correctBottom}
      .correct=${options.correct}
    ></nb-matchup>`;
  }

  roundOneLeftTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game1,
        correct: this.correct?.games.game1,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game2,
        correct: this.correct?.games.game2,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game3,
        correct: this.correct?.games.game3,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game4,
        correct: this.correct?.games.game4,
      })}
    </div>`;
  }

  roundTwoLeftTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games?.game1.winner,
        winnerBottom: this.bracket?.games?.game2.winner,
        correctTop: this.correct?.games?.game1.winner,
        correctBottom: this.correct?.games?.game2.winner,
        correct: this.correct?.games.game9,
      })}
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games?.game3.winner,
        winnerBottom: this.bracket?.games?.game4.winner,
        correctTop: this.correct?.games?.game3.winner,
        correctBottom: this.correct?.games?.game4.winner,
        correct: this.correct?.games.game10,
      })}
    </div>`;
  }

  roundThreeLeftTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games?.game9.winner,
        winnerBottom: this.bracket?.games?.game10.winner,
        correctTop: this.correct?.games?.game9.winner,
        correctBottom: this.correct?.games?.game10.winner,
        correct: this.correct?.games.game13,
      })}
    </div>`;
  }

  correctChampionTemplate() {
    if (!this.correct?.winner) {
      return null;
    }

    return html`<div class="col text-center">
      <div class="row justify-content-center">
        ${this.getImageElement(this.correct?.winner)}
        <span class="fs-5">Champion</span>
      </div>
    </div>`;
  }

  pickedChampionTemplate() {
    if (!this.bracket?.winner) {
      return null;
    }

    return html`<div class="col text-center">
      <div class="row justify-content-center">
        ${this.getImageElement(this.bracket?.winner)}
        <span class="fs-5">${IS_ME ? "Your pick" : "Their pick"}</span>
      </div>
    </div>`;
  }

  predictedScoreTemplate() {
    if (!this.bracket?.wGoals || !this.bracket?.lGoals) {
      return null;
    }

    return html`<div class="col">
      <p class="fs-6">Predicted Score:</p>
      <p class="fs-6 display-inline-flex">
        <span class="p-2 border border-dark-subtle"
          >${this.bracket?.wGoals}</span
        ><span class="p-2"> - </span
        ><span class="p-2 border border-dark-subtle"
          >${this.bracket?.lGoals}</span
        >
      </p>
    </div>`;
  }

  championTemplate() {
    return html`<div class="round-final my-auto">
      <sl-card style="--sl-panel-background-color: var(--sl-color-neutral-100)">
        <div class="champion-card">
          <span class="round-details champion-top">National Champion</span>
          <div class="row justify-content-center">
            ${this.pickedChampionTemplate()} ${this.correctChampionTemplate()}
          </div>
          <sl-divider class="w-100"></sl-divider>
          <div class="row">
            <div class="col">
              ${this.matchupTemplate({
                winnerTop: this.bracket?.games?.game13.winner,
                winnerBottom: this.bracket?.games?.game14.winner,
                correctTop: this.correct?.games?.game13.winner,
                correctBottom: this.correct?.games?.game14.winner,
                correct: this.correct?.games.game15,
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
        winnerTop: this.bracket?.games?.game11.winner,
        winnerBottom: this.bracket?.games?.game12.winner,
        correctTop: this.correct?.games?.game11.winner,
        correctBottom: this.correct?.games?.game12.winner,
        correct: this.correct?.games.game14,
      })}
    </div>`;
  }

  roundTwoRightTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games?.game5.winner,
        winnerBottom: this.bracket?.games?.game6.winner,
        correctTop: this.correct?.games?.game5.winner,
        correctBottom: this.correct?.games?.game6.winner,
        correct: this.correct?.games.game11,
      })}
      ${this.matchupTemplate({
        winnerTop: this.bracket?.games?.game7.winner,
        winnerBottom: this.bracket?.games?.game8.winner,
        correctTop: this.correct?.games?.game7.winner,
        correctBottom: this.correct?.games?.game8.winner,
        correct: this.correct?.games.game12,
      })}
    </div>`;
  }

  roundOneRightTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game5,
        correct: this.correct?.games.game5,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game6,
        correct: this.correct?.games.game6,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game7,
        correct: this.correct?.games.game7,
      })}
      ${this.matchupTemplate({
        type: "default",
        default: this.default.games.game8,
        correct: this.correct?.games.game8,
      })}
    </div>`;
  }

  render() {
    return html`<sl-card
      class="w-100"
      style="--sl-panel-background-color: var(--sl-color-neutral-0)"
      ><div class="row justify-content-center">
        <div class="col-auto">
          <p class="fs-3">${this.bracket?.name}</p>
        </div>
      </div>
      <div class="row">
        <div class="${this.getBracketClass()}">
          <div class="round-one-left">
            <span class="round-details">Round 1</span>
            ${this.roundOneLeftTemplate()}
          </div>

          <div class="round-two-left">
            <span class="round-details">Round 2</span>
            ${this.roundTwoLeftTemplate()}
          </div>

          <div class="round-three-left">
            <span class="round-details">Round 3</span>
            ${this.roundThreeLeftTemplate()}
          </div>

          ${this.championTemplate()}

          <div class="round-three-right">
            <span class="round-details">Round 3</span>
            ${this.roundThreeRightTemplate()}
          </div>

          <div class="round-two-right">
            <span class="round-details">Round 2</span>
            ${this.roundTwoRightTemplate()}
          </div>

          <div class="round-one-right round-one">
            <span class="round-details">Round 1</span>
            ${this.roundOneRightTemplate()}
          </div>
        </div>
      </div></sl-card
    >`;
  }
}

export default Bracket;

customElements.define("nb-bracket", Bracket);
