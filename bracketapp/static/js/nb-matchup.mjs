import { html } from "lit";
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

    let iconUrl = STATIC_FILE_MAP[team.team.icon_path];

    return html`<img
      class="team-img"
      src="${iconUrl}"
      alt="${team.team.name}"
    />`;
  }

  topIconTemplate() {
    if (this.correctTop) {
      return html`<wa-icon
        auto-width
        library="hero"
        variant="16-solid"
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
        auto-width
        library="hero"
        variant="16-solid"
        name="${this.correctBottom?.id === this.winnerBottom.id
          ? "check-circle"
          : "x-circle"}"
      ></wa-icon>`;
    }
    return null;
  }

  topPickTemplate() {
    if (!this.winnerTop) {
      return null;
    }
    return html`<div class="flex justify-between">
      <div class="nb-team user-pick">
        ${this.topIconTemplate()}<span class="team-name"
          >${this.winnerTopName}</span
        >
      </div>
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

  combinedPickTemplate() {
    if (this.type === "default") {
      let loserTeam =
        this.winnerTop.team.id === this.default.top_team.team.id
          ? this.default.bottom_team.team
          : this.default.top_team.team;
      return html`<div class="nb-team user-pick text-[10px]">
        Pick:
        <span class="team-name">${this.winnerTop.team.short_name}</span> over
        <span class="team-name">${loserTeam.short_name}</span>
      </div>`;
    }

    return html`<div class="nb-team user-pick text-[10px]">
      Pick:
      <span class="team-name">${this.winnerTop.team.short_name}</span> over
      <span class="team-name">${this.winnerBottom.team.short_name}</span>
    </div>`;
  }

  gameInfoTemplate() {
    const gameStart = new Date(Date.parse(this.correct.start_time + "-04:00")); // Force ET
    const now = new Date();

    let content = null;
    if (now < gameStart) {
      const timeFormatter = new Intl.DateTimeFormat(undefined, {
        timeStyle: "long",
        timeZone: "America/New_York",
      });
      let startTime = timeFormatter.format(gameStart).replace(":00", "");
      if (startTime === "12:00 AM EDT") {
        startTime = "TBA";
      }
      const dateFormatter = new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
      });
      content = dateFormatter.format(gameStart) + " " + startTime;
    } else if (this.correct.winner_id) {
      content = "Final";
      if (this.correct.overtime) {
        let numOvertimes = "";
        if (this.correct.number_overtimes > 1) {
          numOvertimes = this.correct.number_overtimes;
        }
        content += ` ${numOvertimes}OT`;
      }
    } else {
      content = "Live";
    }

    return html`<div class="text-[10px] text-right user-pick">${content}</div>`;
  }

  getTopLoserTeamClass() {
    const compareTeamId =
      this.type === "default" ? this.default.top_team_id : this.correctTop?.id;
    return this.correct.winner_id && this.correct.winner_id !== compareTeamId
      ? "loser-team"
      : "";
  }

  getBottomLoserTeamClass() {
    const compareTeamId =
      this.type === "default"
        ? this.default.bottom_team_id
        : this.correctBottom?.id;
    return this.correct.winner_id && this.correct.winner_id !== compareTeamId
      ? "loser-team"
      : "";
  }

  defaultMatchupTemplate() {
    return html`${this.gameInfoTemplate()}
      <div class="nb-team ${this.getTopLoserTeamClass()}">
        ${this.getImageElement(this.default.top_team)}
        <span class="team-name">${this.defaultTopTeamName}</span
        ><span class="ms-auto">${this.correct?.top_team_goals}</span>
      </div>
      <div class="nb-team ${this.getBottomLoserTeamClass()}">
        ${this.getImageElement(this.default.bottom_team)}
        <span class="team-name">${this.defaultBottomTeamName}</span
        ><span class="ms-auto">${this.correct?.bottom_team_goals}</span>
      </div>`;
  }

  matchupTemplate() {
    return html`${this.gameInfoTemplate()}${this.topPickTemplate()}
      <div class="nb-team ${this.getTopLoserTeamClass()}">
        ${this.getImageElement(this.correctTop)}
        <span class="team-name">${this.correctTopName}</span
        ><span class="ms-auto">${this.correct?.top_team_goals}</span>
      </div>
      <div class="nb-team ${this.getBottomLoserTeamClass()}">
        ${this.getImageElement(this.correctBottom)}
        <span class="team-name">${this.correctBottomName}</span
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
      ><div class="flex flex-col">${content}</div></wa-card
    >`;
  }
}

export default Matchup;

customElements.define("nb-matchup", Matchup);
