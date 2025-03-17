import { html, nothing } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./nb-edit-matchup.mjs";

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

  static queries = {
    formEl: "form",
    nbEditMatchupEls: { all: "nb-edit-matchup" },
    saveButtonEl: "#save-button",
  };

  get teams() {
    if (this._teams) {
      return this._teams;
    }

    let obj = {};
    for (let game of Object.values(this.default.games)) {
      let h = game.home_team;
      let a = game.away_team;
      obj[h.id] = h;
      obj[a.id] = a;
    }

    return (this._teams = obj);
  }

  async getUpdateComplete() {
    await super.getUpdateComplete();

    for (let ele of this.nbEditMatchupEls) {
      await ele.updateComplete;
    }
  }

  async firstUpdated() {
    super.firstUpdated();

    await this.updateComplete;
    this.initialFormData = new FormData(this.formEl);

    this.maybeToggleSaveButton();
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
      .winnerTop=${options.winnerTop}
      .winnerBottom=${options.winnerBottom}
    ></nb-edit-matchup>`;
  }

  roundOneLeftTemplate() {
    return html`<div class="round-one">
      ${this.matchupTemplate({
        game: "game1",
        type: "default-edit",
        default: this.default.games.game1,
        winnerTop: this.default.games.game1.home_team,
        winnerBottom: this.default.games.game1.away_team,
        winner: this.bracket.games.game1?.winner,
      })}
      ${this.matchupTemplate({
        game: "game2",
        type: "default-edit",
        default: this.default.games.game2,
        winnerTop: this.default.games.game2.home_team,
        winnerBottom: this.default.games.game2.away_team,
        winner: this.bracket.games.game2?.winner,
      })}
      ${this.matchupTemplate({
        game: "game3",
        type: "default-edit",
        default: this.default.games.game3,
        winnerTop: this.default.games.game3.home_team,
        winnerBottom: this.default.games.game3.away_team,
        winner: this.bracket.games.game3?.winner,
      })}
      ${this.matchupTemplate({
        game: "game4",
        type: "default-edit",
        default: this.default.games.game4,
        winnerTop: this.default.games.game4.home_team,
        winnerBottom: this.default.games.game4.away_team,
        winner: this.bracket.games.game4?.winner,
      })}
    </div>`;
  }

  roundTwoLeftTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        game: "game9",
        type: "edit",
        winnerTop: this.bracket.games.game1?.winner_team,
        winnerBottom: this.bracket.games.game2?.winner_team,
        winner: this.bracket.games.game9?.winner,
      })}
      ${this.matchupTemplate({
        game: "game10",
        type: "edit",
        winnerTop: this.bracket.games.game3?.winner_team,
        winnerBottom: this.bracket.games.game4?.winner_team,
        winner: this.bracket.games.game10?.winner,
      })}
    </div>`;
  }

  roundThreeLeftTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        game: "game13",
        type: "edit",
        winnerTop: this.bracket.games.game9?.winner_team,
        winnerBottom: this.bracket.games.game10?.winner_team,
        winner: this.bracket.games.game13?.winner,
      })}
    </div>`;
  }

  predictedScoreTemplate() {
    return html`<div class="championship-grid">
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
          value="${this.bracket.w_goals}"
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
          value="${this.bracket.l_goals}"
        ></sl-input>
      </div>
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
            winnerTop: this.bracket.games.game13?.winner_team,
            winnerBottom: this.bracket.games.game14?.winner_team,
            winner: this.bracket.games.game15?.winner,
          })}
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
        winnerTop: this.bracket.games.game11?.winner_team,
        winnerBottom: this.bracket.games.game12?.winner_team,
        winner: this.bracket.games.game14?.winner,
      })}
    </div>`;
  }

  roundTwoRightTemplate() {
    return html`<div class="round-two">
      ${this.matchupTemplate({
        game: "game11",
        type: "edit",
        winnerTop: this.bracket.games.game5?.winner_team,
        winnerBottom: this.bracket.games.game6?.winner_team,
        winner: this.bracket.games.game11?.winner,
      })}
      ${this.matchupTemplate({
        game: "game12",
        type: "edit",
        winnerTop: this.bracket.games.game7?.winner_team,
        winnerBottom: this.bracket.games.game8?.winner_team,
        winner: this.bracket.games.game12?.winner,
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
        winner: this.bracket.games.game5?.winner,
      })}
      ${this.matchupTemplate({
        game: "game6",
        type: "default-edit",
        default: this.default.games.game6,
        winnerTop: this.default.games.game6.home_team,
        winnerBottom: this.default.games.game6.away_team,
        winner: this.bracket.games.game6?.winner,
      })}
      ${this.matchupTemplate({
        game: "game7",
        type: "default-edit",
        default: this.default.games.game7,
        winnerTop: this.default.games.game7.home_team,
        winnerBottom: this.default.games.game7.away_team,
        winner: this.bracket.games.game7?.winner,
      })}
      ${this.matchupTemplate({
        game: "game8",
        type: "default-edit",
        default: this.default.games.game8,
        winnerTop: this.default.games.game8.home_team,
        winnerBottom: this.default.games.game8.away_team,
        winner: this.bracket.games.game8?.winner,
      })}
    </div>`;
  }

  buttonsTemplate() {
    let content = html`<sl-button
      id="save-button"
      variant="primary"
      type="submit"
      >Save bracket</sl-button
    >`;
    // TODO: Fix this
    // if (!this.bracket.name) {
    //   return html`${content}<sl-button @click=${this.resetForm}
    //       >Reset bracket</sl-button
    //     >`;
    // }

    return html`<sl-button href=${CANCEL_BRACKET_URL}>Cancel</sl-button
      >${content}`;
  }

  setNext(el) {
    let { id, value } = el;
    let nextMatchup = this.getNextMatchup(id);
    if (!nextMatchup) {
      return;
    }

    let matchup = el.closest("nb-edit-matchup");
    matchup.winner = el.value;

    let team = this.teams[value];

    let gameNum = id.match(/\d/g).join("");
    if (gameNum % 2 === 1) {
      if (nextMatchup.winner === nextMatchup.winnerTop?.id) {
        nextMatchup.winner = "";
      }
      let oldTeam = nextMatchup.winnerTop;
      nextMatchup.winnerTop = team;
      nextMatchup.topInputEl.checked = false;
      this.maybeClearInputs(nextMatchup.id + "top", oldTeam);
    } else {
      if (nextMatchup.winner === nextMatchup.winnerBottom?.id) {
        nextMatchup.winner = "";
      }
      let oldTeam = nextMatchup.winnerBottom;
      nextMatchup.winnerBottom = team;
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
      if (oldTeam?.id === nextMatchup.winnerTop?.id) {
        nextMatchup.winnerTop = {};
        nextMatchup.topInputEl.checked = false;
      }
      this.maybeClearInputs(nextMatchup.id + "top", oldTeam);
    } else {
      if (oldTeam?.id === nextMatchup.winnerBottom?.id) {
        nextMatchup.winnerBottom = {};
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

  handleInput() {
    this.maybeToggleSaveButton();
  }

  maybeToggleSaveButton() {
    let currentFormData = new FormData(this.formEl);
    let currentEntriesArr = [...currentFormData.entries()];
    if (currentEntriesArr.length < 18) {
      this.saveButtonEl.disabled = false;
      return;
    }

    this.saveButtonEl.disabled =
      JSON.stringify([...this.initialFormData.entries()]) ===
      JSON.stringify(currentEntriesArr);
  }

  resetForm() {
    this.formEl.reset();
  }

  topCardTemplate() {
    return html` <div class="d-flex justify-content-center">
      <sl-card class="width-fit-content mb-4">
        <h2 class="mb-2">${this.bracket?.year} Bracket Challenge</h2>
        <div class="d-flex mb-4">
          <div>
            <p>
              To view current conference standings
              <a
                href="https://www.collegehockeynews.com/reports/standings.php"
                target="_blank"
                >click here</a
              >.
            </p>
            <p>
              To view current team stats
              <a href="https://www.collegehockeynews.com/stats/" target="_blank"
                >click here</a
              >.
            </p>
            <p>
              To view previous years brackets
              <a href="${ARCHIVE_URL}" target="_blank">click here</a>.
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-center mb-3">
          <sl-input
            name="name"
            maxlength="60"
            label="Bracket name"
            placeholder="My bracket name"
            value=${this.bracket.name}
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

export default EditBracket;

customElements.define("nb-edit-bracket", EditBracket);
