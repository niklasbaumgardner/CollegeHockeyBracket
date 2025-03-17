import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class EditMatchup extends NikElement {
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

  topInput() {
    return html`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${this.winnerTop?.id}"
      required=""
      ?checked="${!!(
        this.winnerTop &&
        this.winner &&
        this.winner === this.winnerTop.id
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
        this.winner &&
        this.winner === this.winnerBottom.id
      )}
    />`;
  }

  render() {
    return html`<sl-card
      class="matchup"
      style="--padding: var(--sl-spacing-2x-small);"
    >
      <label class="nb-team" id="top">
        ${this.topInput()} ${this.getImageElement(this.winnerTop)}
        <span>${this.winnerTopName}</span>
      </label>
      <label class="nb-team" id="bottom">
        ${this.bottomInput()} ${this.getImageElement(this.winnerBottom)}
        <span>${this.winnerBottomName}</span>
      </label>
    </sl-card>`;
  }
}

customElements.define("nb-edit-matchup", EditMatchup);
