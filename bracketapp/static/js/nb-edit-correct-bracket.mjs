import { html, nothing } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-edit-correct-matchup.mjs";
import { EditBracket } from "./nb-edit-bracket.mjs";

class EditCorrectBracket extends EditBracket {
  matchupTagName = "nb-edit-correct-matchup";

  maybeToggleSaveButton() {
    // do nothing
  }

  matchupTemplate(options) {
    return html`<nb-edit-correct-matchup
      id=${options.game}
      .teams=${this.default.teams}
      game=${options.game}
      type="${options.type}"
      winner_id=${options.winner_id}
      .winnerTop=${options.winnerTop}
      .winnerBottom=${options.winnerBottom}
      topTeamGoals=${options.topTeamGoals}
      bottomTeamGoals=${options.bottomTeamGoals}
    ></nb-edit-correct-matchup>`;
  }

  roundOneLeftTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        game: "game1",
        type: "default-edit",
        default: this.default.games.game1,
        winnerTop: this.default.games.game1.top_team,
        winnerBottom: this.default.games.game1.bottom_team,
        winner_id: this.bracket?.games?.game1.winner_id,
        topTeamGoals: this.bracket?.games?.game1.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game1.bottom_team_goals,
      })}
      ${this.matchupTemplate({
        game: "game2",
        type: "default-edit",
        default: this.default.games.game2,
        winnerTop: this.default.games.game2.top_team,
        winnerBottom: this.default.games.game2.bottom_team,
        winner_id: this.bracket?.games?.game2.winner_id,
        topTeamGoals: this.bracket?.games?.game2.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game2.bottom_team_goals,
      })}
      ${this.matchupTemplate({
        game: "game3",
        type: "default-edit",
        default: this.default.games.game3,
        winnerTop: this.default.games.game3.top_team,
        winnerBottom: this.default.games.game3.bottom_team,
        winner_id: this.bracket?.games?.game3.winner_id,
        topTeamGoals: this.bracket?.games?.game3.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game3.bottom_team_goals,
      })}
      ${this.matchupTemplate({
        game: "game4",
        type: "default-edit",
        default: this.default.games.game4,
        winnerTop: this.default.games.game4.top_team,
        winnerBottom: this.default.games.game4.bottom_team,
        winner_id: this.bracket?.games?.game4.winner_id,
        topTeamGoals: this.bracket?.games?.game4.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game4.bottom_team_goals,
      })}
    </div>`;
  }

  roundTwoLeftTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        game: "game9",
        type: "edit",
        winnerTop: this.bracket?.games?.game1.winner_team,
        winnerBottom: this.bracket?.games?.game2.winner_team,
        winner_id: this.bracket?.games?.game9.winner_id,
        topTeamGoals: this.bracket?.games?.game9.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game9.bottom_team_goals,
      })}
      ${this.matchupTemplate({
        game: "game10",
        type: "edit",
        winnerTop: this.bracket?.games?.game3.winner_team,
        winnerBottom: this.bracket?.games?.game4.winner_team,
        winner_id: this.bracket?.games?.game10.winner_id,
        topTeamGoals: this.bracket?.games?.game10.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game10.bottom_team_goals,
      })}
    </div>`;
  }

  roundThreeLeftTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        game: "game13",
        type: "edit",
        winnerTop: this.bracket?.games?.game9.winner_team,
        winnerBottom: this.bracket?.games?.game10.winner_team,
        winner_id: this.bracket?.games?.game13.winner_id,
        topTeamGoals: this.bracket?.games?.game13.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game13.bottom_team_goals,
      })}
    </div>`;
  }

  championTemplate() {
    return html`<div class="round-final my-auto">
      <wa-card>
        <div class="championship-grid">
          <p class="round-details champion-top m-0">National Champion</p>
          ${this.matchupTemplate({
            game: "game15",
            type: "edit",
            winnerTop: this.bracket?.games?.game13.winner_team,
            winnerBottom: this.bracket?.games?.game14.winner_team,
            winner_id: this.bracket?.games?.game15.winner_id,
            topTeamGoals: this.bracket?.games?.game15.top_team_goals,
            bottomTeamGoals: this.bracket?.games?.game15.bottom_team_goals,
          })}
        </div>
      </wa-card>
    </div>`;
  }

  roundThreeRightTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        game: "game14",
        type: "edit",
        winnerTop: this.bracket?.games?.game11.winner_team,
        winnerBottom: this.bracket?.games?.game12.winner_team,
        winner_id: this.bracket?.games?.game14.winner_id,
        topTeamGoals: this.bracket?.games?.game14.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game14.bottom_team_goals,
      })}
    </div>`;
  }

  roundTwoRightTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        game: "game11",
        type: "edit",
        winnerTop: this.bracket?.games?.game5.winner_team,
        winnerBottom: this.bracket?.games?.game6.winner_team,
        winner_id: this.bracket?.games?.game11.winner_id,
        topTeamGoals: this.bracket?.games?.game11.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game11.bottom_team_goals,
      })}
      ${this.matchupTemplate({
        game: "game12",
        type: "edit",
        winnerTop: this.bracket?.games?.game7.winner_team,
        winnerBottom: this.bracket?.games?.game8.winner_team,
        winner_id: this.bracket?.games?.game12.winner_id,
        topTeamGoals: this.bracket?.games?.game12.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game12.bottom_team_goals,
      })}
    </div>`;
  }

  roundOneRightTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        game: "game5",
        type: "default-edit",
        default: this.default.games.game5,
        winnerTop: this.default.games.game5.top_team,
        winnerBottom: this.default.games.game5.bottom_team,
        winner_id: this.bracket?.games?.game5.winner_id,
        topTeamGoals: this.bracket?.games?.game5.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game5.bottom_team_goals,
      })}
      ${this.matchupTemplate({
        game: "game6",
        type: "default-edit",
        default: this.default.games.game6,
        winnerTop: this.default.games.game6.top_team,
        winnerBottom: this.default.games.game6.bottom_team,
        winner_id: this.bracket?.games?.game6.winner_id,
        topTeamGoals: this.bracket?.games?.game6.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game6.bottom_team_goals,
      })}
      ${this.matchupTemplate({
        game: "game7",
        type: "default-edit",
        default: this.default.games.game7,
        winnerTop: this.default.games.game7.top_team,
        winnerBottom: this.default.games.game7.bottom_team,
        winner_id: this.bracket?.games?.game7.winner_id,
        topTeamGoals: this.bracket?.games?.game7.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game7.bottom_team_goals,
      })}
      ${this.matchupTemplate({
        game: "game8",
        type: "default-edit",
        default: this.default.games.game8,
        winnerTop: this.default.games.game8.top_team,
        winnerBottom: this.default.games.game8.bottom_team,
        winner_id: this.bracket?.games?.game8.winner_id,
        topTeamGoals: this.bracket?.games?.game8.top_team_goals,
        bottomTeamGoals: this.bracket?.games?.game8.bottom_team_goals,
      })}
    </div>`;
  }

  buttonsTemplate() {
    let content = html`<wa-button variant="brand" type="submit"
      >Save bracket</wa-button
    >`;

    return html`${content}<wa-button href=${CANCEL_BRACKET_URL}
        >Cancel</wa-button
      >`;
  }

  topCardTemplate() {
    return html` <div class="d-flex justify-content-center">
      <wa-card class="width-fit-content mb-4">
        <h2 class="mb-2">${this.bracket?.year} Correct Bracket</h2>
        <div class="d-flex justify-content-center mb-3">
          <wa-input
            name="name"
            maxlength="60"
            label="Bracket name"
            placeholder="My bracket name"
            value=${this.bracket?.name}
            class="w-100"
            required=""
          ></wa-input>
        </div>
        <div class="d-flex justify-content-center gap-3">
          ${this.buttonsTemplate()}
        </div>
      </wa-card>
    </div>`;
  }

  render() {
    return html`<div class="w-100">
      <form
        action="${this.bracket.form_url}"
        method="POST"
        @input=${this.handleInput}
      >
        ${this.topCardTemplate()}
        <div class="bracket-grid-edit mb-3" @click=${this.handleClick}>
          <div class="round-one-left">
            <wa-card class="round-details">Round 1</wa-card>
            ${this.roundOneLeftTemplate()}
          </div>

          <div class="round-two-left">
            <wa-card class="round-details">Round 2</wa-card>
            ${this.roundTwoLeftTemplate()}
          </div>

          <div class="round-three-left">
            <wa-card class="round-details">Round 3</wa-card>
            ${this.roundThreeLeftTemplate()}
          </div>

          ${this.championTemplate()}

          <div class="round-three-right">
            <wa-card class="round-details">Round 3</wa-card>
            ${this.roundThreeRightTemplate()}
          </div>

          <div class="round-two-right">
            <wa-card class="round-details">Round 2</wa-card>
            ${this.roundTwoRightTemplate()}
          </div>

          <div class="round-one-right round-one">
            <wa-card class="round-details">Round 1</wa-card>
            ${this.roundOneRightTemplate()}
          </div>
        </div>
      </form>
    </div>`;
  }
}

export default EditCorrectBracket;

customElements.define("nb-edit-correct-bracket", EditCorrectBracket);
