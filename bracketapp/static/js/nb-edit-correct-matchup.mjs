import { html } from "./imports.mjs";
import { EditMatchup } from "./nb-edit-matchup.mjs";

class EditCorrectMatchup extends EditMatchup {
  static properties = {
    homeGoals: { type: Number, converter: EditCorrectMatchup.goalConverter },
    awayGoals: { type: Number, converter: EditCorrectMatchup.goalConverter },
  };

  static goalConverter(value, type) {
    if (!value.length) {
      return null;
    }

    return Number(value);
  }

  teamTemplate(team) {
    if (team?.team) {
      return team.team.name;
    }
    return "";
  }

  topScoreInput() {
    return html`<input
      type="number"
      name="${this.game}-h_goals"
      value="${this.homeGoals >= 0 ? this.homeGoals : null}"
    />`;
  }

  bottomScoreInput() {
    return html`<input
      type="number"
      name="${this.game}-a_goals"
      value="${this.awayGoals >= 0 ? this.awayGoals : null}"
    />`;
  }

  topInput() {
    return html`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${this.winnerTop?.id}"
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
        ${this.topInput()}<span>${this.winnerTopName}</span>
        ${this.topScoreInput()}
      </label>
      <label class="nb-team" id="bottom">
        ${this.bottomInput()}<span>${this.winnerBottomName}</span>
        ${this.bottomScoreInput()}
      </label>
    </sl-card>`;
  }
}

export default EditCorrectMatchup;

customElements.define("nb-edit-correct-matchup", EditCorrectMatchup);
