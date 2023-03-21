"use strict";

class Bracket {
  constructor() {
    this.created = false;
    this.matchups = {};

    // Round one left
    this.matchups["game1"] = new Matchup("game1", null, null);
    this.matchups["game2"] = new Matchup("game2", null, null);
    this.matchups["game3"] = new Matchup("game3", null, null);
    this.matchups["game4"] = new Matchup("game4", null, null);

    // Round one right
    this.matchups["game5"] = new Matchup("game5", null, null);
    this.matchups["game6"] = new Matchup("game6", null, null);
    this.matchups["game7"] = new Matchup("game7", null, null);
    this.matchups["game8"] = new Matchup("game8", null, null);

    // Round two left
    this.matchups["game9"] = new Matchup(
      "game9",
      this.matchups["game1"],
      this.matchups["game2"]
    );
    this.matchups["game10"] = new Matchup(
      "game10",
      this.matchups["game3"],
      this.matchups["game4"]
    );

    // Round two right
    this.matchups["game11"] = new Matchup(
      "game11",
      this.matchups["game5"],
      this.matchups["game6"]
    );
    this.matchups["game12"] = new Matchup(
      "game12",
      this.matchups["game7"],
      this.matchups["game8"]
    );

    // Round three left
    this.matchups["game13"] = new Matchup(
      "game13",
      this.matchups["game9"],
      this.matchups["game10"]
    );

    // Round three right
    this.matchups["game14"] = new Matchup(
      "game14",
      this.matchups["game11"],
      this.matchups["game12"]
    );

    // Round final
    this.matchups["game15"] = new FinalMatch(
      "game15",
      this.matchups["game13"],
      this.matchups["game14"]
    );
  }

  render() {
    if (this.created) {
      return;
    }

    let roundOneLeft = document.querySelector(".round-one-left");
    let roundOneRight = document.querySelector(".round-one-right");
    let roundTwoLeft = document.querySelector(".round-two-left");
    let roundTwoRight = document.querySelector(".round-two-right");
    let roundThreeLeft = document.querySelector(".round-three-left");
    let roundThreeRight = document.querySelector(".round-three-right");
    let roundFinal = document.querySelector(".round-final");

    // Round one left
    this.matchups["game1"].render(roundOneLeft);
    this.matchups["game2"].render(roundOneLeft);
    this.matchups["game3"].render(roundOneLeft);
    this.matchups["game4"].render(roundOneLeft);

    // Round one right
    this.matchups["game5"].render(roundOneRight);
    this.matchups["game6"].render(roundOneRight);
    this.matchups["game7"].render(roundOneRight);
    this.matchups["game8"].render(roundOneRight);

    // // Round two left
    this.matchups["game9"].render(roundTwoLeft);
    this.matchups["game10"].render(roundTwoLeft);

    // // Round two right
    this.matchups["game11"].render(roundTwoRight);
    this.matchups["game12"].render(roundTwoRight);

    // // Round three left
    this.matchups["game13"].render(roundThreeLeft);

    // // Round three right
    this.matchups["game14"].render(roundThreeRight);

    // // Round final
    this.matchups["game15"].render(roundFinal);

    this.created = true;
  }
}

class Matchup {
  constructor(game_num, top, bottom) {
    this.game_num = game_num;
    this.next = null;
    this.top = top;
    this.bottom = bottom;

    this.isDefaultGame = false;

    if (this.top && this.bottom) {
      this.top.next = this;
      this.bottom.next = this;
    }

    this.correct = {};
    this.default = {};

    if (CORRECT.games[this.game_num]) {
      for (let [k, v] of Object.entries(CORRECT.games[this.game_num])) {
        this.correct[k] = v;
      }
    }

    if (DEFAULT.games[this.game_num]) {
      this.isDefaultGame = true;
      for (let [k, v] of Object.entries(DEFAULT.games[this.game_num])) {
        this.default[k] = v;
      }
    }
  }

  render(anchor) {
    if (this.created) {
      return this.element;
    }

    this.element = createElement({
      type: "ul",
      classString: "matchup",
    });

    // create the correct matchup
    let homeTeam = this.isDefaultGame
      ? this.default.home
      : this.top.correct.winner;
    this.home = createElement({
      type: "li",
      classString: "team bg-body-nb",
    });

    if (homeTeam) {
      this.home.appendChild(
        createElement({
          type: "img",
          classString: "team-img",
          src: teamNameToSVGFileName(homeTeam),
          alt: homeTeam,
        })
      );
      this.home.appendChild(
        createElement({ type: "span", content: " " + homeTeam })
      );
    }

    this.element.appendChild(this.home);
    this.home.appendChild(
      createElement({
        type: "span",
        classString: "score",
        content: this.correct.h_goals !== null ? `${this.correct.h_goals}` : "",
      })
    );

    let awayTeam = this.isDefaultGame
      ? this.default.away
      : this.bottom.correct.winner;
    this.away = createElement({
      type: "li",
      classString: "team bg-body-nb",
    });

    if (awayTeam) {
      this.away.appendChild(
        createElement({
          type: "img",
          classString: "team-img",
          src: teamNameToSVGFileName(awayTeam),
          alt: awayTeam,
        })
      );
      this.away.appendChild(
        createElement({ type: "span", content: " " + awayTeam })
      );
    }

    this.element.appendChild(this.away);
    this.away.appendChild(
      createElement({
        type: "span",
        classString: "score",
        content: this.correct.a_goals !== null ? `${this.correct.a_goals}` : "",
      })
    );

    anchor.appendChild(this.element);
    this.created = true;
    return this.element;
  }
}

class FinalMatch extends Matchup {
  constructor(game_num, top, bottom) {
    super(game_num, top, bottom);

    for (let [k, v] of Object.entries(CORRECT)) {
      this[k] = v;
    }

    console.log(this);
  }

  render(anchor) {
    if (this.created) {
      return this.element;
    }

    this.finalRoundGrid = createElement({ classString: "final-round-grid" });

    this.topRow = createElement({ classString: "top" });
    this.finalRoundGrid.appendChild(this.topRow);

    this.innerTopRow = createElement({
      classString: "row justify-content-center",
    });
    this.topRow.appendChild(this.innerTopRow);

    this.championGrid = createElement({ classString: "champion-grid" });
    this.innerTopRow.appendChild(this.championGrid);

    this.championGrid.appendChild(
      createElement({
        classString: "round-details champion-top",
        content: "National Champion",
      })
    );
    if (this.winner) {
      this.championGrid.appendChild(
        createElement({
          type: "img",
          classString: "winner-img",
          src: teamNameToSVGFileName(this.winner),
          alt: this.winner,
        })
      );
    }

    this.bottomRow = createElement({ classString: "bottom" });
    this.finalRoundGrid.appendChild(this.bottomRow);

    this.shipGrid = createElement({ classString: "championship-grid" });
    this.bottomRow.appendChild(this.shipGrid);

    this.matchup = super.render(this.shipGrid);

    anchor.appendChild(this.finalRoundGrid);
    this.created = true;
  }
}
