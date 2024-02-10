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
        <span class="team-name">${this.default.home}</span
        ><span>${this.correct?.hGoals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.default.away)}<span class="team-name"
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

  getBottomClass() {
    if (this.correctBottom) {
      return this.correctBottom === this.winnerBottom ? "correct" : "incorrect";
    }
    return "";
  }

  getTopWinner() {
    if (!this.winnerTop) {
      return null;
    }
    return html`<div class="nb-team ${this.getTopClass()}">
      <span class="team-name">${this.winnerTop}</span>
    </div>`;
  }

  getBottomWinner() {
    if (!this.winnerBottom) {
      return null;
    }
    return html`<div class="nb-team ${this.getBottomClass()}">
      <span class="team-name">${this.winnerBottom}</span>
    </div>`;
  }

  matchupTemplate() {
    return html`${this.getTopWinner()}
      <div class="nb-team">
        ${this.getImageElement(this.correctTop)}<span class="team-name"
          >${this.correctTop}</span
        ><span>${this.correct?.hGoals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.correctBottom)}<span class="team-name"
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
    return html`<div class="matchup">${content}</div>`;
  }
}

export default Matchup;

customElements.define("nb-matchup", Matchup);
