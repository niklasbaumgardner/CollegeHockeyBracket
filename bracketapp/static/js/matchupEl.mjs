import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class Matchup extends NikElement {
  static properties = {
    correct: {
      type: Object,
    },
    default: {
      type: Object,
    },
    correctTop: {
      type: String,
    },
    correctBottom: {
      type: String,
    },
    winnerTop: {
      type: String,
    },
    winnerBottom: {
      type: String,
    },
    winner: { type: String },
    type: { type: String },
    game: { type: String },
  };

  static get queries() {
    return {
      topInputEl: "#top > input",
      bottomInputEl: "#bottom > input",
    };
  }

  getImageUrl(teamName) {
    let filename = teamName.substring(2);
    filename = filename.replaceAll(" ", "");
    filename = filename.replaceAll(".", "");
    return `/static/images/${filename}.svg`;
  }

  getImageElement(team) {
    if (!team) {
      return null;
    }

    return html`<img
      class="team-img"
      src="${this.getImageUrl(team)}"
      alt="${team}"
    />`;
  }

  defaultMatchupTemplate() {
    return html`<div class="nb-team">
        ${this.getImageElement(this.default.home)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner !== this.default.home
            ? "loser-team"
            : ""}"
          >${this.default.home}</span
        ><span>${this.correct?.hGoals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.default.away)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner !== this.default.away
            ? "loser-team"
            : ""}"
          >${this.default.away}</span
        ><span>${this.correct?.aGoals}</span>
      </div>`;
  }

  getTopClass() {
    if (this.correctTop) {
      return this.correctTop === this.winnerTop ? "correct" : "incorrect";
    }
    return "";
  }

  getTopIcon() {
    if (this.correctTop) {
      return html`<sl-icon
        name="${this.correctTop === this.winnerTop
          ? "check-circle-fill"
          : "x-circle-fill"}"
      ></sl-icon>`;
    }
    return null;
  }

  getBottomClass() {
    if (this.correctBottom) {
      return this.correctBottom === this.winnerBottom ? "correct" : "incorrect";
    }
    return "";
  }

  getBottomIcon() {
    if (this.correctBottom) {
      return html`<sl-icon
        name="${this.correctBottom === this.winnerBottom
          ? "check-circle-fill"
          : "x-circle-fill"}"
      ></sl-icon>`;
    }
    return null;
  }

  getTopWinner() {
    if (!this.winnerTop) {
      return null;
    }
    return html`<div class="nb-team ${this.getTopClass()}">
      <span class="team-name">${this.winnerTop}</span>${this.getTopIcon()}
    </div>`;
  }

  getBottomWinner() {
    if (!this.winnerBottom) {
      return null;
    }
    return html`<div class="nb-team ${this.getBottomClass()}">
      <span class="team-name">${this.winnerBottom}</span>${this.getBottomIcon()}
    </div>`;
  }

  matchupTemplate() {
    return html`${this.getTopWinner()}
      <div class="nb-team">
        ${this.getImageElement(this.correctTop)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner !== this.correctTop
            ? "loser-team"
            : ""}"
          >${this.correctTop}</span
        ><span>${this.correct?.hGoals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.correctBottom)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner !== this.correctBottom
            ? "loser-team"
            : ""}"
          >${this.correctBottom}</span
        ><span>${this.correct?.aGoals}</span>
      </div>
      ${this.getBottomWinner()}`;
  }

  render() {
    let content;
    if (this.type === "default") {
      content = this.defaultMatchupTemplate();
    } else {
      content = this.matchupTemplate();
    }
    return html`<sl-card
      class="matchup"
      style="--padding: var(--sl-spacing-2x-small);"
      >${content}</sl-card
    >`;
  }
}

export default Matchup;

customElements.define("nb-matchup", Matchup);
