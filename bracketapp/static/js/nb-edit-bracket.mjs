import { html, nothing } from "lit";
import { NikElement } from "./nik-element.mjs";
import "./nb-edit-matchup.mjs";

export class EditBracket extends NikElement {
  matchupTagName = "nb-edit-matchup";

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
    winnerGoals: "#winner_goals",
    loserGoals: "#loser_goals",
  };

  get teams() {
    if (this._teams) {
      return this._teams;
    }

    let obj = {};
    for (let game of Object.values(this.default.games)) {
      let h = game.top_team;
      let a = game.bottom_team;
      obj[h.id] = h;
      obj[a.id] = a;
    }

    return (this._teams = obj);
  }

  get matchupsSorted() {
    return [...this.nbEditMatchupEls].sort((a, b) =>
      Number(a.id.replace("game", "") - Number(b.id.replace("game", ""))),
    );
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

  matchupTemplate(options) {
    return html`<nb-edit-matchup
      id=${options.game}
      game=${options.game}
      type="${options.type}"
      winner_id=${options.winner_id}
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
        winnerTop: this.default.games.game1.top_team,
        winnerBottom: this.default.games.game1.bottom_team,
        winner_id: this.bracket.games.game1?.winner_id,
      })}
      ${this.matchupTemplate({
        game: "game2",
        type: "default-edit",
        default: this.default.games.game2,
        winnerTop: this.default.games.game2.top_team,
        winnerBottom: this.default.games.game2.bottom_team,
        winner_id: this.bracket.games.game2?.winner_id,
      })}
      ${this.matchupTemplate({
        game: "game3",
        type: "default-edit",
        default: this.default.games.game3,
        winnerTop: this.default.games.game3.top_team,
        winnerBottom: this.default.games.game3.bottom_team,
        winner_id: this.bracket.games.game3?.winner_id,
      })}
      ${this.matchupTemplate({
        game: "game4",
        type: "default-edit",
        default: this.default.games.game4,
        winnerTop: this.default.games.game4.top_team,
        winnerBottom: this.default.games.game4.bottom_team,
        winner_id: this.bracket.games.game4?.winner_id,
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
        winner_id: this.bracket.games.game9?.winner_id,
      })}
      ${this.matchupTemplate({
        game: "game10",
        type: "edit",
        winnerTop: this.bracket.games.game3?.winner_team,
        winnerBottom: this.bracket.games.game4?.winner_team,
        winner_id: this.bracket.games.game10?.winner_id,
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
        winner_id: this.bracket.games.game13?.winner_id,
      })}
    </div>`;
  }

  predictedScoreTemplate() {
    return html`<div class="wa-stack">
      <p class="text-center">Final Game Score</p>
      <div class="flex justify-center items-center gap-(--wa-space-m)">
        <wa-input
          class="goals"
          id="winner_goals"
          name="winner_goals"
          type="number"
          min="0"
          max="99"
          step="1"
          required=""
          value=${this.bracket.winner_goals}
        ></wa-input>
        <span>-</span>
        <wa-input
          class="goals"
          id="loser_goals"
          name="loser_goals"
          type="number"
          min="0"
          max="99"
          step="1"
          required=""
          value=${this.bracket.loser_goals}
        ></wa-input>
      </div>
    </div>`;
  }

  championTemplate() {
    return html`<div class="round-final my-auto">
      <wa-card>
        <div class="wa-stack">
          <p class="text-center">National Champion</p>
          ${this.matchupTemplate({
            game: "game15",
            type: "edit",
            winnerTop: this.bracket.games.game13?.winner_team,
            winnerBottom: this.bracket.games.game14?.winner_team,
            winner_id: this.bracket.games.game15?.winner_id,
          })}
          ${this.predictedScoreTemplate()}
        </div>
      </wa-card>
    </div>`;
  }

  roundThreeRightTemplate() {
    return html`<div class="round-three">
      ${this.matchupTemplate({
        game: "game14",
        type: "edit",
        winnerTop: this.bracket.games.game11?.winner_team,
        winnerBottom: this.bracket.games.game12?.winner_team,
        winner_id: this.bracket.games.game14?.winner_id,
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
        winner_id: this.bracket.games.game11?.winner_id,
      })}
      ${this.matchupTemplate({
        game: "game12",
        type: "edit",
        winnerTop: this.bracket.games.game7?.winner_team,
        winnerBottom: this.bracket.games.game8?.winner_team,
        winner_id: this.bracket.games.game12?.winner_id,
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
        winner_id: this.bracket.games.game5?.winner_id,
      })}
      ${this.matchupTemplate({
        game: "game6",
        type: "default-edit",
        default: this.default.games.game6,
        winnerTop: this.default.games.game6.top_team,
        winnerBottom: this.default.games.game6.bottom_team,
        winner_id: this.bracket.games.game6?.winner_id,
      })}
      ${this.matchupTemplate({
        game: "game7",
        type: "default-edit",
        default: this.default.games.game7,
        winnerTop: this.default.games.game7.top_team,
        winnerBottom: this.default.games.game7.bottom_team,
        winner_id: this.bracket.games.game7?.winner_id,
      })}
      ${this.matchupTemplate({
        game: "game8",
        type: "default-edit",
        default: this.default.games.game8,
        winnerTop: this.default.games.game8.top_team,
        winnerBottom: this.default.games.game8.bottom_team,
        winner_id: this.bracket.games.game8?.winner_id,
      })}
    </div>`;
  }

  buttonsTemplate() {
    let content = html`<wa-button
      class="grow"
      id="save-button"
      variant="brand"
      type="submit"
      >Save bracket</wa-button
    >`;
    // TODO: Fix this. Reset bracket button
    // if (!this.bracket.name) {
    //   return html`${content}<wa-button @click=${this.resetForm}
    //       >Reset bracket</wa-button
    //     >`;
    // }

    return html`<wa-button
        class="grow"
        appearance="outlined"
        href=${CANCEL_BRACKET_URL}
        >Cancel</wa-button
      >${content}`;
  }

  setNext(el) {
    let { id, value } = el;
    let nextMatchup = this.getNextMatchup(id);
    if (!nextMatchup) {
      return;
    }

    let matchup = el.closest(this.matchupTagName);
    matchup.winner_id = el.value;

    let team = this.teams[value];

    let gameNum = id.match(/\d/g).join("");
    if (gameNum % 2 === 1) {
      if (nextMatchup.winner_id === nextMatchup.winnerTop?.id) {
        nextMatchup.winner_id = "";
      }
      let oldTeam = nextMatchup.winnerTop;
      nextMatchup.winnerTop = team;
      nextMatchup.topInputEl.checked = false;
      this.maybeClearInputs(nextMatchup.id + "top", oldTeam);
    } else {
      if (nextMatchup.winner_id === nextMatchup.winnerBottom?.id) {
        nextMatchup.winner_id = "";
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

  async handleInput() {
    await this.updateComplete;
    this.maybeToggleSaveButton();
  }

  handleSubmit() {
    this.saveButtonEl.disabled = true;
    this.saveButtonEl.loading = true;
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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async randomSeed() {
    for (let matchup of this.matchupsSorted) {
      let index = Math.round(Math.random());
      if (index === 0) {
        matchup.topInputEl.click();
      } else {
        matchup.bottomInputEl.click();
      }
      await new Promise((r) => setTimeout(r, 10));
    }

    this.winnerGoals.value = this.getRandomInt(1, 10);
    this.loserGoals.value = this.getRandomInt(0, this.winnerGoals.value);

    await this.winnerGoals.updateComplete;
    await this.loserGoals.updateComplete;

    this.winnerGoals.checkValidity();
    this.loserGoals.checkValidity();
  }

  topCardTemplate() {
    return html` <div class="flex justify-center">
      <wa-card>
        <div class="wa-stack">
          <h2>${this.bracket?.year} Bracket Challenge</h2>
          <div class="wa-stack gap-(--wa-space-3xs)">
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

          <wa-input
            name="name"
            maxlength="60"
            label="Bracket name"
            placeholder="My bracket name"
            value=${this.bracket.name}
            class="w-full"
            required=""
          ></wa-input>

          <div class="wa-cluster">${this.buttonsTemplate()}</div>
        </div>
      </wa-card>
    </div>`;
  }

  render() {
    return html`<div class="w-full">
      <form
        action=${this.bracket.form_url + location.search}
        method="POST"
        @input=${this.handleInput}
        @submit=${this.handleSubmit}
        @wa-invalid=${(e) => console.log(e)}
      >
        <input name="old_name" value=${this.bracket.name} hidden />
        <div class="wa-stack">
          ${this.topCardTemplate()}
          <div class="bracket-grid-edit" @click=${this.handleClick}>
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
        </div>
      </form>
    </div>`;
  }
}

customElements.define("nb-edit-bracket", EditBracket);
