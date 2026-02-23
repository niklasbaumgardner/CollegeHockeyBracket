import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import { BracketUtils } from "./BracketUtils.mjs";

export class MatchupInfo extends NikElement {
  static properties = {
    topTeam: {
      type: Object,
    },
    topTeamStats: {
      type: Object,
    },
    bottomTeam: {
      type: Object,
    },
    bottomTeamStats: {
      type: Object,
    },
    game: { type: String },
  };

  requestUpdate(propertyName, oldValue) {
    if (propertyName === "topTeam") {
      this.topTeamStats = null;
      this.requestTopTeamStats();
    }
    if (propertyName === "bottomTeam") {
      this.bottomTeamStats = null;
      this.requestBottomTeamStats();
    }
    if (
      (propertyName === "topTeamStats" || propertyName === "bottomTeamStats") &&
      this.topTeamStats &&
      this.bottomTeamStats
    ) {
      this.requestHeadToHeadStats();
    }
    return super.requestUpdate(propertyName, oldValue);
  }

  async requestHeadToHeadStats() {
    if (
      !(
        this.topTeam?.team &&
        this.bottomTeam?.team &&
        this.topTeamStats &&
        this.bottomTeamStats
      )
    ) {
      return;
    }

    let [top, bottom] = await BracketUtils.getHeadToHeadGames(
      this.topTeam.team,
      this.bottomTeam.team,
    );

    this.topTeamStats.h2h = top;
    this.bottomTeamStats.h2h = bottom;

    this.requestUpdate();
  }

  statsTemplate(stats, rightSide = false) {
    let rightSideClass = rightSide ? "self-end text-right" : "";
    return html`<small class="${rightSideClass}">NPI: ${stats.rank}</small>
      <small class="${rightSideClass}"
        >${stats.conference.name}: ${stats.conference.rank}</small
      >
      ${stats.notableWins?.length
        ? html`<small
            class="${rightSideClass} text-(length:--wa-font-size-2xs)!"
            >Notable wins:
            ${stats.notableWins.map((g) => g.notable).join(", ")}</small
          >`
        : null}
      <wa-divider class="my-(--wa-space-xs)"></wa-divider>
      <div class="flex justify-between text-(length:--wa-font-size-2xs)!">
        <small>Home</small><span>${stats.records[0].join("-")}</span>
      </div>
      <div class="flex justify-between text-(length:--wa-font-size-2xs)!">
        <small>Away</small><span>${stats.records[1].join("-")}</span>
      </div>
      <div class="flex justify-between text-(length:--wa-font-size-2xs)!">
        <small>Neutral</small><span>${stats.records[2].join("-")}</span>
      </div>

      <wa-divider class="my-(--wa-space-xs)"></wa-divider>
      ${stats.h2h
        ? html`<div
            class="flex justify-between text-(length:--wa-font-size-2xs)!"
          >
            <small>H2H</small><span>${stats.h2h.join("-")}</span>
          </div>`
        : null}`;
  }

  async requestTopTeamStats() {
    if (!this.topTeam.team) {
      this.topTeamStats = null;
      return;
    }

    let standings = await BracketUtils.getStandingsForTeam(this.topTeam.team);
    let records = await BracketUtils.getHomeAwayNeutralRecord(
      this.topTeam.team,
    );
    // let notableWins = await BracketUtils.getNotableWins(this.topTeam.team);

    this.topTeamStats = { ...standings, records };
  }

  async requestBottomTeamStats() {
    if (!this.bottomTeam.team) {
      this.bottomTeamStats = null;
      return;
    }

    let standings = await BracketUtils.getStandingsForTeam(
      this.bottomTeam.team,
    );
    let records = await BracketUtils.getHomeAwayNeutralRecord(
      this.bottomTeam.team,
    );
    // let notableWins = await BracketUtils.getNotableWins(this.bottomTeam.team);

    this.bottomTeamStats = { ...standings, records };
  }

  topTeamStatsTemplate() {
    if (!this.topTeamStats) {
      return null;
    }

    return html`<div class="grow flex flex-col w-1/2 min-w-[7rem]">
      <div>${this.topTeam.team.name}</div>
      <div class="flex flex-col w-full">
        ${this.statsTemplate(this.topTeamStats)}
      </div>
    </div>`;
  }

  bottomTeamStatsTemplate() {
    if (!this.bottomTeamStats) {
      return null;
    }

    return html`<div class="grow flex flex-col items-end w-1/2 min-w-[7rem]">
      <div>${this.bottomTeam.team.name}</div>
      <div class="flex flex-col w-full">
        ${this.statsTemplate(this.bottomTeamStats, true)}
      </div>
    </div>`;
  }

  render() {
    if (
      !(
        this.topTeam?.team &&
        this.bottomTeam?.team &&
        this.topTeamStats &&
        this.bottomTeamStats
      )
    ) {
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
        <div class="wa-stack gap-(--wa-space-2xs)">
          <div class="flex justify-between">
            ${this.topTeamStatsTemplate()}
            <div><wa-divider orientation="vertical"></wa-divider></div>
            ${this.bottomTeamStatsTemplate()}
          </div>
          <div class="text-center text-[10px]">
            Data from
            <a href="https://www.collegehockeynews.com/" target="_blank"
              >collegehockeynews.com</a
            >
          </div>
        </div>
      </wa-popover>`;
  }
}

customElements.define("nb-matchup-info", MatchupInfo);
