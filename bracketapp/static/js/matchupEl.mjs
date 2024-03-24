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
    teams: { type: Object },
  };

  static get queries() {
    return {
      topInputEl: "#top > input",
      bottomInputEl: "#bottom > input",
    };
  }

  get correctWinnerName() {
    return this.teams[this.correct.winner].name;
  }

  get defaultHomeName() {
    let team = this.teams[this.default.home];
    return `${team.rank} ${team.name}`;
  }

  get defaultAwayName() {
    let team = this.teams[this.default.away];
    return `${team.rank} ${team.name}`;
  }

  get correctTopName() {
    let team = this.teams[this.correctTop];
    return `${team.rank} ${team.name}`;
  }

  get correctBottomName() {
    let team = this.teams[this.correctBottom];
    return `${team.rank} ${team.name}`;
  }

  get winnerTopName() {
    let team = this.teams[this.winnerTop];
    return `${team.rank} ${team.name}`;
  }

  get winnerBottomName() {
    let team = this.teams[this.winnerBottom];
    return `${team.rank} ${team.name}`;
  }

  getImageUrl(teamId) {
    if (!teamId) {
      return "";
    }

    return this.teams[teamId].icon_path;
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
          this.correct.winner != this.default.home
            ? "loser-team"
            : ""}"
          >${this.defaultHomeName}</span
        ><span>${this.correct?.hGoals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.default.away)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner != this.default.away
            ? "loser-team"
            : ""}"
          >${this.defaultAwayName}</span
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
      <span class="team-name">${this.winnerTopName}</span>${this.getTopIcon()}
    </div>`;
  }

  getBottomWinner() {
    if (!this.winnerBottom) {
      return null;
    }
    return html`<div class="nb-team ${this.getBottomClass()}">
      <span class="team-name">${this.winnerBottomName}</span
      >${this.getBottomIcon()}
    </div>`;
  }

  matchupTemplate() {
    return html`${this.getTopWinner()}
      <div class="nb-team">
        ${this.getImageElement(this.correctTop)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner != this.correctTop
            ? "loser-team"
            : ""}"
          >${this.correctTopName}</span
        ><span>${this.correct?.hGoals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.correctBottom)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner != this.correctBottom
            ? "loser-team"
            : ""}"
          >${this.correctBottomName}</span
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
