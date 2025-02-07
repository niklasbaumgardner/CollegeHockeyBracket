import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class EditMatchup extends NikElement {
  static properties = {
    winnerTop: {
      type: Object,
    },
    winnerBottom: {
      type: Object,
    },
    winner: { type: Number },
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

  topInput(topTeam) {
    return html`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${topTeam?.id}"
      required=""
      ?checked="${!!(topTeam && this.winner && this.winner === topTeam.id)}"
    />`;
  }

  bottomInput(bottomTeam) {
    return html`<input
      type="radio"
      id="${this.game}bottom"
      name="${this.game}"
      value="${bottomTeam?.id}"
      required=""
      ?checked=${!!(bottomTeam && this.winner && this.winner === bottomTeam.id)}
    />`;
  }

  render() {
    return html`<sl-card
      class="matchup"
      style="--padding: var(--sl-spacing-2x-small);"
    >
      <div class="nb-team">
        <label id="top">
          ${this.topInput(this.winnerTop)}
          ${this.getImageElement(this.winnerTop)}
          <span>${this.winnerTopName}</span>
        </label>
      </div>
      <div class="nb-team">
        <label id="bottom">
          ${this.bottomInput(this.winnerBottom)}
          ${this.getImageElement(this.winnerBottom)}
          <span>${this.winnerBottomName}</span>
        </label>
      </div>
    </sl-card>`;
  }
}

export default EditMatchup;

customElements.define("nb-edit-matchup", EditMatchup);
