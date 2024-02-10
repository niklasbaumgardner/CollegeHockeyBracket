import { html, nothing } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./editMatchupEl.mjs";

class EditBracket extends NikElement {
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

  getImageUrl(teamName) {
    if (!teamName) {
      return "";
    }
    let filename = teamName.substring(2);
    filename = filename.replaceAll(" ", "");
    filename = filename.replaceAll(".", "");
    return `/static/images/${filename}.svg`;
  }

  getImageElement(team) {
    if (!team) {
      return null;
    }
    let isWinnerCorrect = this.correct?.winner && this.correct?.winner === team;
    return html`<img
      class="winner-img ${isWinnerCorrect ? "" : "greyscale"}"
      src="${this.getImageUrl(team)}"
      alt="${team}"
    />`;
  }

  matchupTemplate(options) {
    return html`<nb-edit-matchup
      id=${options.game}
      game=${options.game}
      type="${options.type}"
      winner=${options.winner}
      winnerTop=${options.winnerTop}
      winnerBottom=${options.winnerBottom}
    ></nb-edit-matchup>`;
  }

  roundOneLeftTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        game: "game1",
        type: "default-edit",
        default: this.default.games.game1,
        winnerTop: this.default.games.game1.home,
        winnerBottom: this.default.games.game1.away,
        winner: this.bracket?.games?.game1.winner,
      })}
      ${this.matchupTemplate({
        game: "game2",
        type: "default-edit",
        default: this.default.games.game2,
        winnerTop: this.default.games.game2.home,
        winnerBottom: this.default.games.game2.away,
        winner: this.bracket?.games?.game2.winner,
      })}
      ${this.matchupTemplate({
        game: "game3",
        type: "default-edit",
        default: this.default.games.game3,
        winnerTop: this.default.games.game3.home,
        winnerBottom: this.default.games.game3.away,
        winner: this.bracket?.games?.game3.winner,
      })}
      ${this.matchupTemplate({
        game: "game4",
        type: "default-edit",
        default: this.default.games.game4,
        winnerTop: this.default.games.game4.home,
        winnerBottom: this.default.games.game4.away,
        winner: this.bracket?.games?.game4.winner,
      })}
    </div>`;
  }

  roundTwoLeftTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        game: "game9",
        type: "edit",
        winnerTop: this.bracket?.games?.game1.winner,
        winnerBottom: this.bracket?.games?.game2.winner,
        winner: this.bracket?.games?.game9.winner,
      })}
      ${this.matchupTemplate({
        game: "game10",
        type: "edit",
        winnerTop: this.bracket?.games?.game3.winner,
        winnerBottom: this.bracket?.games?.game4.winner,
        winner: this.bracket?.games?.game10.winner,
      })}
    </div>`;
  }

  roundThreeLeftTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        game: "game13",
        type: "edit",
        winnerTop: this.bracket?.games?.game9.winner,
        winnerBottom: this.bracket?.games?.game10.winner,
        winner: this.bracket?.games?.game13.winner,
      })}
    </div>`;
  }

  predictedScoreTemplate() {
    return html`<div class="row">
      <div class="championship-grid">
        <p class="m-0 fs-6">Final Game Score</p>
        <div class="d-flex justify-content-center align-items-center">
          <sl-input
            class="goals"
            name="w_goals"
            type="number"
            min="0"
            max="99"
            step="1"
            required=""
            value="${this.bracket.wGoals}"
          ></sl-input>
          <span class="px-2">-</span>
          <sl-input
            class="goals"
            name="l_goals"
            type="number"
            min="0"
            max="99"
            step="1"
            required=""
            value="${this.bracket.lGoals}"
          ></sl-input>
        </div>
      </div>
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
                winnerTop: this.bracket?.games?.game13.winner,
                winnerBottom: this.bracket?.games?.game14.winner,
                winner: this.bracket?.games?.game15.winner,
              })}
            </div>
          </div>
          ${this.predictedScoreTemplate()}
        </div>
      </sl-card>
    </div>`;
  }

  roundThreeRightTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        game: "game14",
        type: "edit",
        winnerTop: this.bracket?.games?.game11.winner,
        winnerBottom: this.bracket?.games?.game12.winner,
        winner: this.bracket?.games?.game14.winner,
      })}
    </div>`;
  }

  roundTwoRightTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        game: "game11",
        type: "edit",
        winnerTop: this.bracket?.games?.game5.winner,
        winnerBottom: this.bracket?.games?.game6.winner,
        winner: this.bracket?.games?.game11.winner,
      })}
      ${this.matchupTemplate({
        game: "game12",
        type: "edit",
        winnerTop: this.bracket?.games?.game7.winner,
        winnerBottom: this.bracket?.games?.game8.winner,
        winner: this.bracket?.games?.game12.winner,
      })}
    </div>`;
  }

  roundOneRightTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        game: "game5",
        type: "default-edit",
        default: this.default.games.game5,
        winnerTop: this.default.games.game5.home,
        winnerBottom: this.default.games.game5.away,
        winner: this.bracket?.games?.game5.winner,
      })}
      ${this.matchupTemplate({
        game: "game6",
        type: "default-edit",
        default: this.default.games.game6,
        winnerTop: this.default.games.game6.home,
        winnerBottom: this.default.games.game6.away,
        winner: this.bracket?.games?.game6.winner,
      })}
      ${this.matchupTemplate({
        game: "game7",
        type: "default-edit",
        default: this.default.games.game7,
        winnerTop: this.default.games.game7.home,
        winnerBottom: this.default.games.game7.away,
        winner: this.bracket?.games?.game7.winner,
      })}
      ${this.matchupTemplate({
        game: "game8",
        type: "default-edit",
        default: this.default.games.game8,
        winnerTop: this.default.games.game8.home,
        winnerBottom: this.default.games.game8.away,
        winner: this.bracket?.games?.game8.winner,
      })}
    </div>`;
  }

  buttonsTemplate() {
    let content = html`<sl-button variant="primary" type="submit"
      >Save bracket</sl-button
    >`;
    // TODO: Fix this
    // if (!this.bracket.name) {
    //   return html`${content}<sl-button @click=${this.resetForm}
    //       >Reset bracket</sl-button
    //     >`;
    // }

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

    let matchup = el.closest("nb-edit-matchup");
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
              name="name"
              label="Bracket name"
              placeholder="mybracket"
              value=${this.bracket.name}
              required=""
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

export default EditBracket;

customElements.define("nb-edit-bracket", EditBracket);
