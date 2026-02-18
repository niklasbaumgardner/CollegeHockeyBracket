import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import "./nb-matchup-info.mjs";

export class EditMatchup extends NikElement {
  static properties = {
    winnerTop: {
      type: Object,
    },
    winnerBottom: {
      type: Object,
    },
    winner_id: { type: String },
    game: { type: String },
    teams: { type: Object },
  };

  static queries = {
    topInputEl: "#top > input",
    bottomInputEl: "#bottom > input",
  };

  get winnerTopName() {
    let team = this.winnerTop;
    return this.teamTemplate(team);
  }

  get winnerBottomName() {
    let team = this.winnerBottom;
    return this.teamTemplate(team);
  }

  teamTemplate(team) {
    if (team?.team) {
      return `${team.rank} ${team.team.name}`;
    }
    return "";
  }

  getImageElement(team) {
    if (!team?.team) {
      return null;
    }

    return html`<img
      class="team-img"
      src="${team.team.icon_path}"
      alt="${team.team.name}"
    />`;
  }

  topInput() {
    return html`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${this.winnerTop?.id}"
      required=""
      ?checked="${!!(
        this.winnerTop &&
        this.winner_id &&
        this.winner_id === this.winnerTop.id
      )}"
    />`;
  }

  bottomInput() {
    return html`<input
      type="radio"
      id="${this.game}bottom"
      name="${this.game}"
      value="${this.winnerBottom?.id}"
      required=""
      ?checked=${!!(
        this.winnerBottom &&
        this.winner_id &&
        this.winner_id === this.winnerBottom.id
      )}
    />`;
  }

  popoverTemplate() {
    if (this.winnerTop?.team && this.winnerBottom?.team) {
      return html`<wa-button
          id="${this.game}-info"
          class="info-button"
          appearance="plain"
          size="small"
          variant="brand"
          pill
          ><wa-icon library="ion" name="information-circle-outline"></wa-icon
        ></wa-button>
        <wa-popover placement="top" for="${this.game}-info">
          <div class="wa-cluster">
            <div class="flex flex-col">
              <span>${this.winnerTop.team.name}</span>
              <small>Rank: 1</small>
              <small>B1G rank: 1</small>
              <small>Record: 11-1</small>
              <span></span>
            </div>
            <div class="flex flex-col items-end">
              <span>${this.winnerBottom.team.name}</span>
              <small>Rank: 4</small>
              <small>B1G rank: 3</small>
              <small>Record: 8-4</small>
              <span></span>
            </div>
          </div>
        </wa-popover>`;
    }

    return null;
  }

  render() {
    return html`<div class="flex items-center relative">
      <wa-card class="matchup default-bg default-border">
        <label class="nb-team" id="top">
          ${this.topInput()} ${this.getImageElement(this.winnerTop)}
          <span>${this.winnerTopName}</span>
        </label>
        <label class="nb-team" id="bottom">
          ${this.bottomInput()} ${this.getImageElement(this.winnerBottom)}
          <span>${this.winnerBottomName}</span>
        </label>
      </wa-card>
      <nb-matchup-info
        .topTeam=${this.winnerTop}
        .bottomTeam=${this.winnerBottom}
        game=${this.game}
      ></nb-matchup-info>
    </div>`;
  }
}

customElements.define("nb-edit-matchup", EditMatchup);
