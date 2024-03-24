import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class EditMatchup extends NikElement {
  static properties = {
    winnerTop: {
      type: Number,
    },
    winnerBottom: {
      type: Number,
    },
    winner: { type: Number },
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

  topInput(top) {
    return html`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${top}"
      required=""
      ?checked="${!!(top && this.winner && this.winner === top)}"
    />`;
  }

  bottomInput(bottom) {
    return html`<input
      type="radio"
      id="${this.game}bottom"
      name="${this.game}"
      value="${bottom}"
      required=""
      ?checked=${!!(bottom && this.winner && this.winner === bottom)}
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
