import { html, nothing } from "lit";
import "./nb-edit-correct-matchup.mjs";
import { EditBracket } from "./nb-edit-bracket.mjs";

export class EditCorrectBracket extends EditBracket {
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

  topCardTemplate() {
    return html` <div class="flex justify-center">
      <wa-card>
        <div class="wa-stack">
          <h2>${this.bracket?.name}</h2>
          <div class="wa-cluster">${this.buttonsTemplate()}</div>
        </div>
      </wa-card>
    </div>`;
  }
}

customElements.define("nb-edit-correct-bracket", EditCorrectBracket);
