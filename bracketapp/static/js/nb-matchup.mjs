import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

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

  static queries = {
    topInputEl: "#top > input",
    bottomInputEl: "#bottom > input",
  };

  get correctWinnerName() {
    return this.correct.winner_team.team.name;
  }

  get defaultTopTeamName() {
    let team = this.default.top_team;
    return this.teamTemplate(team);
  }

  get defaultBottomTeamName() {
    let team = this.default.bottom_team;
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
    return this.winnerTop.team.name;
  }

  get winnerBottomName() {
    return this.winnerBottom.team.name;
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

  topIconTemplate() {
    if (this.correctTop) {
      return html`<wa-icon
        library="hero"
        variant="solid"
        name="${this.correctTop?.id === this.winnerTop.id
          ? "check-circle"
          : "x-circle"}"
      ></wa-icon>`;
    }
    return null;
  }

  bottomIconTemplate() {
    if (this.correctBottom) {
      return html`<wa-icon
        library="hero"
        variant="solid"
        name="${this.correctBottom?.id === this.winnerBottom.id
          ? "check-circle"
          : "x-circle"}"
      ></wa-icon>`;
    }
    return null;
  }

  topGameTemplate() {
    return html`<div class="nb-team user-pick p-0">
      <span class="team-name ms-auto">Final</span>
    </div>`;
  }

  topPickTemplate() {
    if (!this.winnerTop) {
      return null;
    }
    return html`<div class="nb-team user-pick">
      ${this.topIconTemplate()}<span class="team-name"
        >${this.winnerTopName}</span
      >
    </div>`;
  }

  bottomPickTemplate() {
    if (!this.winnerBottom) {
      return null;
    }
    return html`<div class="nb-team user-pick">
      ${this.bottomIconTemplate()}<span class="team-name"
        >${this.winnerBottomName}</span
      >
    </div>`;
  }

  correctGameTemplate() {}

  defaultMatchupTemplate() {
    return html`<div class="nb-team">
        ${this.getImageElement(this.default.top_team)}
        <span
          class="team-name ${this.correct.winner_id &&
          this.correct.winner_id !== this.default.top_team_id
            ? "loser-team"
            : ""}"
          >${this.defaultTopTeamName}</span
        ><span class="ms-auto">${this.correct?.top_team_goals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.default.bottom_team)}
        <span
          class="team-name ${this.correct.winner_id &&
          this.correct.winner_id !== this.default.bottom_team_id
            ? "loser-team"
            : ""}"
          >${this.defaultBottomTeamName}</span
        ><span class="ms-auto">${this.correct?.bottom_team_goals}</span>
      </div>`;
  }

  matchupTemplate() {
    return html`${this.topPickTemplate()}
      <div class="nb-team">
        ${this.getImageElement(this.correctTop)}
        <span
          class="team-name ${this.correct.winner_id &&
          this.correct.winner_id !== this.correctTop?.id
            ? "loser-team"
            : ""}"
          >${this.correctTopName}</span
        ><span class="ms-auto">${this.correct?.top_team_goals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.correctBottom)}
        <span
          class="team-name ${this.correct.winner_id &&
          this.correct.winner_id !== this.correctBottom?.id
            ? "loser-team"
            : ""}"
          >${this.correctBottomName}</span
        ><span class="ms-auto">${this.correct?.bottom_team_goals}</span>
      </div>
      ${this.bottomPickTemplate()}`;
  }

  render() {
    let content;
    if (this.type === "default") {
      content = this.defaultMatchupTemplate();
    } else {
      content = this.matchupTemplate();
    }
    return html`<wa-card class="matchup default-bg default-border"
      >${content}</wa-card
    >`;
  }
}

export default Matchup;

customElements.define("nb-matchup", Matchup);
