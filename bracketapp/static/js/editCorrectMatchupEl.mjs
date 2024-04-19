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

  get winnerTopName() {
    let team = this.teams[this.winnerTop];
    return team?.name ?? "";
  }

  get winnerBottomName() {
    let team = this.teams[this.winnerBottom];
    return team?.name ?? "";
  }

  topTeamInput() {
    return html`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${this.winnerTop}"
      ?checked="${!!(
        this.winnerTop &&
        this.winner &&
        this.winner === this.winnerTop
      )}"
    />`;
  }

  topScoreInput() {
    return html`<input
      type="number"
      name="${this.game}-h_goals"
      value="${this.homeGoals >= 0 ? this.homeGoals : nothing}"
    />`;
  }

  bottomTeamInput() {
    return html`<input
      type="radio"
      id="${this.game}bottom"
      name="${this.game}"
      value="${this.winnerBottom}"
      ?checked=${!!(
        this.winnerBottom &&
        this.winner &&
        this.winner === this.winnerBottom
      )}
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
      <div class="nb-team">
        <label id="top">
          ${this.topTeamInput()}
          <span>${this.winnerTopName}</span>
          ${this.topScoreInput()}
        </label>
      </div>
      <div class="nb-team">
        <label id="bottom">
          ${this.bottomTeamInput()}
          <span>${this.winnerBottomName}</span>
          ${this.bottomScoreInput()}
        </label>
      </div>
    </div>`;
  }
}

export default EditCorrectMatchup;

customElements.define("nb-edit-correct-matchup", EditCorrectMatchup);
