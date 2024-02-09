import { html, nothing } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class EditCorrectMatchup extends NikElement {
  static properties = {
    winnerTop: {
      type: String,
    },
    winnerBottom: {
      type: String,
    },
    winner: { type: String },
    homeGoals: { type: Number },
    awayGoals: { type: Number },
    type: { type: String },
    game: { type: String },
  };

  static get queries() {
    return {
      topInputEl: "#top > input",
      bottomInputEl: "#bottom > input",
    };
  }

  topTeamInput(top) {
    return html`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${top}"
      ?checked="${!!(top && this.winner && this.winner === top)}"
    />`;
  }

  topScoreInput() {
    return html`<input
      type="number"
      name="${this.game}-h_goals"
      value="${this.homeGoals >= 0 ? this.homeGoals : nothing}"
    />`;
  }

  bottomTeamInput(bottom) {
    return html`<input
      type="radio"
      id="${this.game}bottom"
      name="${this.game}"
      value="${bottom}"
      ?checked=${!!(bottom && this.winner && this.winner === bottom)}
    />`;
  }

  bottomScoreInput() {
    return html`<input
      type="number"
      name="${this.game}-a_goals"
      value="${this.awayGoals >= 0 ? this.awayGoals : nothing}"
    />`;
  }

  render() {
    return html`<div class="matchup">
      <div class="nb-team nb-team-border-bottom">
        <label id="top">
          ${this.topTeamInput(this.winnerTop)}
          <span>${this.winnerTop}</span>
          ${this.topScoreInput()}
        </label>
      </div>
      <div class="nb-team nb-team-border-top">
        <label id="bottom">
          ${this.bottomTeamInput(this.winnerBottom)}
          <span>${this.winnerBottom}</span>
          ${this.bottomScoreInput()}
        </label>
      </div>
    </div>`;
  }
}

export default EditCorrectMatchup;

customElements.define("nb-edit-correct-matchup", EditCorrectMatchup);
