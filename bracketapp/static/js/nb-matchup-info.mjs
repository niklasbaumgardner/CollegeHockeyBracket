import { html } from "lit";
import { NikElement } from "./nik-element.mjs";

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
          <div class="flex flex-col">
            <span>${this.topTeam.team.name}</span>
            <small>Rank: 1</small>
            <small>B1G rank: 1</small>
            <small>Record: 11-1</small>
            <span></span>
          </div>
          <div class="flex flex-col items-end">
            <span>${this.bottomTeam.team.name}</span>
            <small>Rank: 4</small>
            <small>B1G rank: 3</small>
            <small>Record: 8-4</small>
            <span></span>
          </div>
        </div>
      </wa-popover>`;
  }

  // render() {
  //   return html`<wa-card class="matchup default-bg default-border">
  //     <div class="flex items-center relative">
  //       <div>
  //         <label class="nb-team" id="top">
  //           ${this.topInput()} ${this.getImageElement(this.winnerTop)}
  //           <span>${this.winnerTopName}</span>
  //         </label>
  //         <label class="nb-team" id="bottom">
  //           ${this.bottomInput()} ${this.getImageElement(this.winnerBottom)}
  //           <span>${this.winnerBottomName}</span>
  //         </label>
  //       </div>
  //       ${this.popoverTemplate()}
  //     </div>
  //   </wa-card>`;
  // }
}

customElements.define("nb-matchup-info", MatchupInfo);
