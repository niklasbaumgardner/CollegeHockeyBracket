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
      type: Object,
    },
    correctBottom: {
      type: Object,
    },
    winnerTop: {
      type: Object,
    },
    winnerBottom: {
      type: Object,
    },
    type: { type: String },
  };

  static get queries() {
    return {
      topInputEl: "#top > input",
      bottomInputEl: "#bottom > input",
    };
  }

  get correctWinnerName() {
    return this.correct.winner_team.team.name;
  }

  get defaultHomeName() {
    let team = this.default.home_team;
    return this.teamTemplate(team);
  }

  get defaultAwayName() {
    let team = this.default.away_team;
    return this.teamTemplate(team);
  }

  get correctTopName() {
    let team = this.correctTop;
    return this.teamTemplate(team);
  }

  get correctBottomName() {
    let team = this.correctBottom;
    return this.teamTemplate(team);
  }

  get winnerTopName() {
    let team = this.winnerTop;
    return this.teamTemplate(team);
  }

  get winnerBottomName() {
    let team = this.winnerBottom;
    return this.teamTemplate(team);
  }

  teamTemplate(team) {
    if (team) {
      return `${team.rank} ${team.team.name}`;
    }
    return "";
  }

  getImageElement(team) {
    if (!team) {
      return null;
    }

    return html`<img
      class="team-img"
      src="${team.team.icon_path}"
      alt="${team.team.name}"
    />`;
  }

  defaultMatchupTemplate() {
    return html`<div class="nb-team">
        ${this.getImageElement(this.default.home_team)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner !== this.default.home
            ? "loser-team"
            : ""}"
          >${this.defaultHomeName}</span
        ><span>${this.correct?.h_goals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.default.away_team)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner !== this.default.away
            ? "loser-team"
            : ""}"
          >${this.defaultAwayName}</span
        ><span>${this.correct?.a_goals}</span>
      </div>`;
  }

  getTopIcon() {
    if (this.correctTop) {
      return html`<sl-icon
        name="${this.correctTop?.id === this.winnerTop.id
          ? "check-circle-fill"
          : "x-circle-fill"}"
      ></sl-icon>`;
    }
    return null;
  }

  getBottomIcon() {
    if (this.correctBottom) {
      return html`<sl-icon
        name="${this.correctBottom?.id === this.winnerBottom.id
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
          this.correct.winner !== this.correctTop?.id
            ? "loser-team"
            : ""}"
          >${this.correctTopName}</span
        ><span>${this.correct?.h_goals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.correctBottom)}
        <span
          class="team-name ${this.correct.winner &&
          this.correct.winner !== this.correctBottom?.id
            ? "loser-team"
            : ""}"
          >${this.correctBottomName}</span
        ><span>${this.correct?.a_goals}</span>
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
