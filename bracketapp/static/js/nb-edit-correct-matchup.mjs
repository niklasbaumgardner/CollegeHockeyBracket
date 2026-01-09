import { html } from "./imports.mjs";
import { EditMatchup } from "./nb-edit-matchup.mjs";

class EditCorrectMatchup extends EditMatchup {
  static properties = {
    topTeamGoals: { type: Number, converter: EditCorrectMatchup.goalConverter },
    bottomTeamGoals: {
      type: Number,
      converter: EditCorrectMatchup.goalConverter,
    },
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
      value="${this.topTeamGoals >= 0 ? this.topTeamGoals : null}"
    />`;
  }

  bottomScoreInput() {
    return html`<input
      type="number"
      name="${this.game}-a_goals"
      value="${this.bottomTeamGoals >= 0 ? this.bottomTeamGoals : null}"
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
      ?checked=${!!(
        this.winnerBottom &&
        this.winner_id &&
        this.winner_id === this.winnerBottom.id
      )}
    />`;
  }

  render() {
    return html`<wa-card
      class="matchup"
      style="--padding: var(--wa-spacing-2x-small);"
    >
      <label class="nb-team" id="top">
        ${this.topInput()}<span>${this.winnerTopName}</span>
        ${this.topScoreInput()}
      </label>
      <label class="nb-team" id="bottom">
        ${this.bottomInput()}<span>${this.winnerBottomName}</span>
        ${this.bottomScoreInput()}
      </label>
    </wa-card>`;
  }
}

export default EditCorrectMatchup;

customElements.define("nb-edit-correct-matchup", EditCorrectMatchup);
