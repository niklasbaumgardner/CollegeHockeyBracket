import { html, nothing } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
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
      winner=${options.winner}
      .winnerTop=${options.winnerTop}
      .winnerBottom=${options.winnerBottom}
      homeGoals=${options.homeGoals}
      awayGoals=${options.awayGoals}
    ></nb-edit-correct-matchup>`;
  }

  roundOneLeftTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        game: "game1",
        type: "default-edit",
        default: this.default.games.game1,
        winnerTop: this.default.games.game1.home_team,
        winnerBottom: this.default.games.game1.away_team,
        winner: this.bracket?.games?.game1.winner,
        homeGoals: this.bracket?.games?.game1.h_goals,
        awayGoals: this.bracket?.games?.game1.a_goals,
      })}
      ${this.matchupTemplate({
        game: "game2",
        type: "default-edit",
        default: this.default.games.game2,
        winnerTop: this.default.games.game2.home_team,
        winnerBottom: this.default.games.game2.away_team,
        winner: this.bracket?.games?.game2.winner,
        homeGoals: this.bracket?.games?.game2.h_goals,
        awayGoals: this.bracket?.games?.game2.a_goals,
      })}
      ${this.matchupTemplate({
        game: "game3",
        type: "default-edit",
        default: this.default.games.game3,
        winnerTop: this.default.games.game3.home_team,
        winnerBottom: this.default.games.game3.away_team,
        winner: this.bracket?.games?.game3.winner,
        homeGoals: this.bracket?.games?.game3.h_goals,
        awayGoals: this.bracket?.games?.game3.a_goals,
      })}
      ${this.matchupTemplate({
        game: "game4",
        type: "default-edit",
        default: this.default.games.game4,
        winnerTop: this.default.games.game4.home_team,
        winnerBottom: this.default.games.game4.away_team,
        winner: this.bracket?.games?.game4.winner,
        homeGoals: this.bracket?.games?.game4.h_goals,
        awayGoals: this.bracket?.games?.game4.a_goals,
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
        winner: this.bracket?.games?.game9.winner,
        homeGoals: this.bracket?.games?.game9.h_goals,
        awayGoals: this.bracket?.games?.game9.a_goals,
      })}
      ${this.matchupTemplate({
        game: "game10",
        type: "edit",
        winnerTop: this.bracket?.games?.game3.winner_team,
        winnerBottom: this.bracket?.games?.game4.winner_team,
        winner: this.bracket?.games?.game10.winner,
        homeGoals: this.bracket?.games?.game10.h_goals,
        awayGoals: this.bracket?.games?.game10.a_goals,
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
        winner: this.bracket?.games?.game13.winner,
        homeGoals: this.bracket?.games?.game13.h_goals,
        awayGoals: this.bracket?.games?.game13.a_goals,
      })}
    </div>`;
  }

  championTemplate() {
    return html`<div class="round-final my-auto">
      <sl-card>
        <div class="championship-grid">
          <p class="round-details champion-top m-0">National Champion</p>
          ${this.matchupTemplate({
            game: "game15",
            type: "edit",
            winnerTop: this.bracket?.games?.game13.winner_team,
            winnerBottom: this.bracket?.games?.game14.winner_team,
            winner: this.bracket?.games?.game15.winner,
            homeGoals: this.bracket?.games?.game15.h_goals,
            awayGoals: this.bracket?.games?.game15.a_goals,
          })}
        </div>
      </sl-card>
    </div>`;
  }

  roundThreeRightTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        game: "game14",
        type: "edit",
        winnerTop: this.bracket?.games?.game11.winner_team,
        winnerBottom: this.bracket?.games?.game12.winner_team,
        winner: this.bracket?.games?.game14.winner,
        homeGoals: this.bracket?.games?.game14.h_goals,
        awayGoals: this.bracket?.games?.game14.a_goals,
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
        winner: this.bracket?.games?.game11.winner,
        homeGoals: this.bracket?.games?.game11.h_goals,
        awayGoals: this.bracket?.games?.game11.a_goals,
      })}
      ${this.matchupTemplate({
        game: "game12",
        type: "edit",
        winnerTop: this.bracket?.games?.game7.winner_team,
        winnerBottom: this.bracket?.games?.game8.winner_team,
        winner: this.bracket?.games?.game12.winner,
        homeGoals: this.bracket?.games?.game12.h_goals,
        awayGoals: this.bracket?.games?.game12.a_goals,
      })}
    </div>`;
  }

  roundOneRightTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        game: "game5",
        type: "default-edit",
        default: this.default.games.game5,
        winnerTop: this.default.games.game5.home_team,
        winnerBottom: this.default.games.game5.away_team,
        winner: this.bracket?.games?.game5.winner,
        homeGoals: this.bracket?.games?.game5.h_goals,
        awayGoals: this.bracket?.games?.game5.a_goals,
      })}
      ${this.matchupTemplate({
        game: "game6",
        type: "default-edit",
        default: this.default.games.game6,
        winnerTop: this.default.games.game6.home_team,
        winnerBottom: this.default.games.game6.away_team,
        winner: this.bracket?.games?.game6.winner,
        homeGoals: this.bracket?.games?.game6.h_goals,
        awayGoals: this.bracket?.games?.game6.a_goals,
      })}
      ${this.matchupTemplate({
        game: "game7",
        type: "default-edit",
        default: this.default.games.game7,
        winnerTop: this.default.games.game7.home_team,
        winnerBottom: this.default.games.game7.away_team,
        winner: this.bracket?.games?.game7.winner,
        homeGoals: this.bracket?.games?.game7.h_goals,
        awayGoals: this.bracket?.games?.game7.a_goals,
      })}
      ${this.matchupTemplate({
        game: "game8",
        type: "default-edit",
        default: this.default.games.game8,
        winnerTop: this.default.games.game8.home_team,
        winnerBottom: this.default.games.game8.away_team,
        winner: this.bracket?.games?.game8.winner,
        homeGoals: this.bracket?.games?.game8.h_goals,
        awayGoals: this.bracket?.games?.game8.a_goals,
      })}
    </div>`;
  }

  buttonsTemplate() {
    let content = html`<sl-button variant="primary" type="submit"
      >Save bracket</sl-button
    >`;

    return html`${content}<sl-button href=${CANCEL_BRACKET_URL}
        >Cancel</sl-button
      >`;
  }

  topCardTemplate() {
    return html` <div class="d-flex justify-content-center">
      <sl-card class="width-fit-content mb-4">
        <h2 class="mb-2">${this.bracket?.year} Correct Bracket</h2>
        <div class="d-flex justify-content-center mb-3">
          <sl-input
            name="name"
            maxlength="60"
            label="Bracket name"
            placeholder="My bracket name"
            value=${this.bracket?.name}
            class="w-100"
            required=""
          ></sl-input>
        </div>
        <div class="d-flex justify-content-center gap-3">
          ${this.buttonsTemplate()}
        </div>
      </sl-card>
    </div>`;
  }

  render() {
    return html`<div class="w-100">
      <form
        action="${BRACKET_FORM_URL}"
        method="POST"
        @input=${this.handleInput}
      >
        ${this.topCardTemplate()}
        <div class="bracket-grid-edit mb-3" @click=${this.handleClick}>
          <div class="round-one-left">
            <sl-card class="round-details">Round 1</sl-card>
            ${this.roundOneLeftTemplate()}
          </div>

          <div class="round-two-left">
            <sl-card class="round-details">Round 2</sl-card>
            ${this.roundTwoLeftTemplate()}
          </div>

          <div class="round-three-left">
            <sl-card class="round-details">Round 3</sl-card>
            ${this.roundThreeLeftTemplate()}
          </div>

          ${this.championTemplate()}

          <div class="round-three-right">
            <sl-card class="round-details">Round 3</sl-card>
            ${this.roundThreeRightTemplate()}
          </div>

          <div class="round-two-right">
            <sl-card class="round-details">Round 2</sl-card>
            ${this.roundTwoRightTemplate()}
          </div>

          <div class="round-one-right round-one">
            <sl-card class="round-details">Round 1</sl-card>
            ${this.roundOneRightTemplate()}
          </div>
        </div>
      </form>
    </div>`;
  }
}

export default EditCorrectBracket;

customElements.define("nb-edit-correct-bracket", EditCorrectBracket);
