import { html, nothing } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./editCorrectMatchupEl.mjs";

class EditCorrectBracket extends NikElement {
  static properties = {
    bracket: {
      type: Object,
    },
    default: {
      type: Object,
    },
    type: { type: String },
  };

  static get queries() {
    return {
      formEl: "form",
    };
  }

  getNextMatchup(currentGameId) {
    let id = "null";
    switch (currentGameId) {
      case "game1top":
      case "game1bottom":
      case "game2top":
      case "game2bottom":
        id = "game9";
        break;
      case "game3top":
      case "game3bottom":
      case "game4top":
      case "game4bottom":
        id = "game10";
        break;
      case "game5top":
      case "game5bottom":
      case "game6top":
      case "game6bottom":
        id = "game11";
        break;
      case "game7top":
      case "game7bottom":
      case "game8top":
      case "game8bottom":
        id = "game12";
        break;
      case "game9top":
      case "game9bottom":
      case "game10top":
      case "game10bottom":
        id = "game13";
        break;
      case "game11top":
      case "game11bottom":
      case "game12top":
      case "game12bottom":
        id = "game14";
        break;
      case "game13top":
      case "game13bottom":
      case "game14top":
      case "game14bottom":
        id = "game15";
        break;
    }

    return this.querySelector(`#${id}`);
  }

  getImageElement(team) {
    if (!team) {
      return null;
    }

    let isWinnerCorrect =
      !this.correct?.winner || this.correct?.winner === team;
    return html`<img
      class="winner-img ${isWinnerCorrect ? "" : "greyscale"}"
      src="${team.icon_path}"
      alt="${team.name}"
    />`;
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
          <div class="row mb-2">
            <div class="col">
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
          </div>
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
    if (!this.bracket.name) {
      return html`${content}<sl-button @click=${this.resetForm}
          >Reset bracket</sl-button
        >`;
    }

    return html`${content}<sl-button href=${CANCEL_BRACKET_URL}
        >Cancel</sl-button
      >`;
  }

  setNext(el) {
    let { id, value } = el;
    let nextMatchup = this.getNextMatchup(id);
    if (!nextMatchup) {
      return;
    }

    let matchup = el.closest("nb-edit-correct-matchup");
    matchup.winner = el.value;

    let gameNum = id.match(/\d/g).join("");
    if (gameNum % 2 === 1) {
      if (nextMatchup.winner === nextMatchup.winnerTop) {
        nextMatchup.winner = "";
      }
      let oldTeam = nextMatchup.winnerTop;
      nextMatchup.winnerTop = value;
      nextMatchup.topInputEl.checked = false;
      this.maybeClearInputs(nextMatchup.id + "top", oldTeam);
    } else {
      if (nextMatchup.winner === nextMatchup.winnerBottom) {
        nextMatchup.winner = "";
      }
      let oldTeam = nextMatchup.winnerBottom;
      nextMatchup.winnerBottom = value;
      nextMatchup.bottomInputEl.checked = false;
      this.maybeClearInputs(nextMatchup.id + "bottom", oldTeam);
    }
  }

  maybeClearInputs(id, oldTeam) {
    let nextMatchup = this.getNextMatchup(id);
    if (!nextMatchup) {
      return;
    }

    let gameNum = id.match(/\d/g).join("");
    if (gameNum % 2 === 1) {
      if (oldTeam === nextMatchup.winnerTop) {
        nextMatchup.winnerTop = "";
        nextMatchup.topInputEl.checked = false;
      }
      this.maybeClearInputs(nextMatchup.id + "top", oldTeam);
    } else {
      if (oldTeam === nextMatchup.winnerBottom) {
        nextMatchup.winnerBottom = "";
        nextMatchup.bottomInputEl.checked = false;
      }
      this.maybeClearInputs(nextMatchup.id + "bottom", oldTeam);
    }
  }

  /**
   * Prevent and empty input from being selected
   * @param {Event} event Click event
   */
  handleClick(event) {
    let el = event.target;
    if (!(el instanceof HTMLInputElement)) {
      return;
    }

    if (!el.value) {
      event.preventDefault();
      return;
    }

    this.setNext(el);
  }

  resetForm() {
    this.formEl.reset();
  }

  render() {
    return html`<sl-card
      class="w-100"
      style="--sl-panel-background-color: var(--sl-color-neutral-0)"
      ><form action="${BRACKET_FORM_URL}" method="POST">
        <div class="row justify-content-center">
          <div class="col-auto">
            <sl-input
              label="Bracket name"
              placeholder="mybracket"
              value=${this.bracket.name}
            ></sl-input>
          </div>
        </div>
        <div class="row">
          <div class="bracket-grid-edit" @click=${this.handleClick}>
            <div class="round-one-left">
              <span class="round-details">Round 1</span>
              ${this.roundOneLeftTemplate()}
            </div>

            <div class="round-two-left">
              <span class="round-details">Round 2</span>
              ${this.roundTwoLeftTemplate()}
            </div>

            <div class="round-three-left">
              <span class="round-details">Round 3</span>
              ${this.roundThreeLeftTemplate()}
            </div>

            ${this.championTemplate()}

            <div class="round-three-right">
              <span class="round-details">Round 3</span>
              ${this.roundThreeRightTemplate()}
            </div>

            <div class="round-two-right">
              <span class="round-details">Round 2</span>
              ${this.roundTwoRightTemplate()}
            </div>

            <div class="round-one-right round-one">
              <span class="round-details">Round 1</span>
              ${this.roundOneRightTemplate()}
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center" style="gap:1rem;">
          ${this.buttonsTemplate()}
        </div>
      </form></sl-card
    >`;
  }
}

export default EditCorrectBracket;

customElements.define("nb-edit-correct-bracket", EditCorrectBracket);
