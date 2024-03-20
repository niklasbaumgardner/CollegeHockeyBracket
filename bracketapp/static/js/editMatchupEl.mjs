import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class EditMatchup extends NikElement {
  static properties = {
    winnerTop: {
      type: String,
    },
    winnerBottom: {
      type: String,
    },
    winner: { type: String },
    type: { type: String },
    game: { type: String },
  };

  static get queries() {
    return {
      topInputEl: "#top > input",
      bottomInputEl: "#bottom > input",
    };
  }

  getImageUrl(teamName) {
    let filename = teamName.substring(2);
    filename = filename.replaceAll(" ", "");
    filename = filename.replaceAll(".", "");
    return `/static/images/${filename}.svg`;
  }

  getImageElement(team) {
    if (!team) {
      return null;
    }

    return html`<img
      class="team-img"
      src="${this.getImageUrl(team)}"
      alt="${team}"
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
      style="--padding: var(--sl-spacing-2x-small);--border-color: transparent;"
    >
      <div class="nb-team">
        <label id="top">
          ${this.topInput(this.winnerTop)}
          ${this.getImageElement(this.winnerTop)}
          <span>${this.winnerTop}</span>
        </label>
      </div>
      <div class="nb-team">
        <label id="bottom">
          ${this.bottomInput(this.winnerBottom)}
          ${this.getImageElement(this.winnerBottom)}
          <span>${this.winnerBottom}</span>
        </label>
      </div>
    </sl-card>`;
  }
}

export default EditMatchup;

customElements.define("nb-edit-matchup", EditMatchup);
