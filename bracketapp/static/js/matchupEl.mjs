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
      type: Number,
    },
    correctBottom: {
      type: Number,
    },
    winnerTop: {
      type: Number,
    },
    winnerBottom: {
      type: Number,
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
    return this.teamTemplate(team);
  }

  get defaultAwayName() {
    let team = this.teams[this.default.away];
    return this.teamTemplate(team);
  }

  get correctTopName() {
    let team = this.teams[this.correctTop];
    return this.teamTemplate(team);
  }

  get correctBottomName() {
    let team = this.teams[this.correctBottom];
    return this.teamTemplate(team);
  }

  get winnerTopName() {
    let team = this.teams[this.winnerTop];
    return this.teamTemplate(team);
  }

  get winnerBottomName() {
    let team = this.teams[this.winnerBottom];
    return this.teamTemplate(team);
  }

  teamTemplate(team) {
    if (team) {
      return `${team.rank} ${team.name}`;
    }
    return "";
  }

  getImageElement(teamId) {
    if (!teamId) {
      return null;
    }

    let team = this.teams[teamId];

    return html`<img
      class="team-img"
      src="${team.icon_path}"
      alt="${team.name}"
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
          >${this.defaultHomeName}</span
        ><span>${this.correct?.hGoals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.default.away)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner !== this.default.away
            ? "loser-team"
            : ""}"
          >${this.defaultAwayName}</span
        ><span>${this.correct?.aGoals}</span>
      </div>`;
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
    return html`<div class="nb-team user-pick">
      <span class="team-name">${this.winnerTopName}</span>${this.getTopIcon()}
    </div>`;
  }

  getBottomWinner() {
    if (!this.winnerBottom) {
      return null;
    }
    return html`<div class="nb-team user-pick">
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
