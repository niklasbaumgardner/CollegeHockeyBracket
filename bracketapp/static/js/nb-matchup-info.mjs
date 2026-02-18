import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import { getStandingsForTeam } from "./standings-data.mjs";

// const STANDINGS = STANDINGS_YEARS[CURRENT_YEAR];
// const CONFERENCE_STANDINGS = CONFERENCE_STANDINGS_YEARS[CURRENT_YEAR];

export class MatchupInfo extends NikElement {
  static properties = {
    topTeam: {
      type: Object,
    },
    bottomTeam: {
      type: Object,
    },
    game: { type: String },
  };

  // TODO: I'd like to make this better
  buildRecord(object) {
    return `${object.wins}-${object.losses}-${object.ties} (${object.otw}-${object.otl})`;
  }

  statsTemplate(stats) {
    return html`<small>NPI Rank: ${stats.rank}</small>
      <small>${stats.conference.name} rank: ${stats.conference.rank}</small>
      <small>Record: ${this.buildRecord(stats.overall)}</small>
      <span></span>`;
  }

  topTeamStatsTemplate() {
    if (!this.topTeam.team) {
      return null;
    }

    let stats = getStandingsForTeam(this.topTeam.team);
    if (!stats) {
      return null;
    }

    return html`<div class="flex flex-col">
      <div>${this.topTeam.team.name}</div>
      <div class="flex flex-col">${this.statsTemplate(stats)}</div>
    </div>`;
  }

  bottomTeamStatsTemplate() {
    if (!this.bottomTeam.team) {
      return null;
    }

    let stats = getStandingsForTeam(this.bottomTeam.team);
    if (!stats) {
      return null;
    }

    return html`<div class="flex flex-col items-end">
      <div>${this.bottomTeam.team.name}</div>
      <div class="flex flex-col items-end">${this.statsTemplate(stats)}</div>
    </div>`;
  }

  render() {
    if (!(this.topTeam?.team && this.bottomTeam?.team)) {
      return null;
    }

    return html`<wa-button
        id="${this.game}-info"
        class="info-button"
        appearance="plain"
        size="small"
        variant="brand"
        pill
        ><wa-icon
          auto-width
          library="hero"
          name="information-circle"
          variant="outline"
        ></wa-icon
      ></wa-button>
      <wa-popover placement="top" for="${this.game}-info">
        <div class="wa-cluster">
          ${this.topTeamStatsTemplate()} ${this.bottomTeamStatsTemplate()}
        </div>
      </wa-popover>`;
  }
}

customElements.define("nb-matchup-info", MatchupInfo);
