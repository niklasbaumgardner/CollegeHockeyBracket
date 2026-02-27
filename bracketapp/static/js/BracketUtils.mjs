import { getCHNName } from "./chn.mjs";

class BracketUtilsClass {
  constructor() {
    this.cache = new Map();
    this.gamesRequestPromise = null;
    this.gamesJsonPromise = null;
    this.standingsRequestPromise = null;
    this.standingsJsonPromise = null;
    this.confStandingsRequestPromise = null;
    this.confStandingsJsonPromise = null;
  }

  async getGames() {
    if (this.cache.has(`${CURRENT_YEAR}.games`)) {
      this.cache.get(`${CURRENT_YEAR}.games`);
    }

    if (!this.gamesRequestPromise) {
      let url = STATIC_FILE_MAP[`/static/json/${CURRENT_YEAR}.games.json`];
      this.gamesRequestPromise = fetch(url);
    }

    let response = await this.gamesRequestPromise;

    if (!this.gamesJsonPromise) {
      this.gamesJsonPromise = response.json();
    }

    let data = await this.gamesJsonPromise;
    this.cache.set(`${CURRENT_YEAR}.games`, data);
    return data;
  }

  async getStandings() {
    if (this.cache.has(`${CURRENT_YEAR}.standings`)) {
      this.cache.get(`${CURRENT_YEAR}.standings`);
    }

    if (!this.standingsRequestPromise) {
      let standingsUrl =
        STATIC_FILE_MAP[`/static/json/${CURRENT_YEAR}.standings.json`];
      this.standingsRequestPromise = fetch(standingsUrl);
    }

    if (!this.confStandingsRequestPromise) {
      let confStandingsUrl =
        STATIC_FILE_MAP[`/static/json/${CURRENT_YEAR}.conference.json`];
      this.confStandingsRequestPromise = fetch(confStandingsUrl);
    }

    const [standingsResponse, conferenceResponse] = await Promise.all([
      this.standingsRequestPromise,
      this.confStandingsRequestPromise,
    ]);

    if (!this.standingsJsonPromise) {
      this.standingsJsonPromise = standingsResponse.json();
    }

    if (!this.confStandingsJsonPromise) {
      this.confStandingsJsonPromise = conferenceResponse.json();
    }

    const data = await Promise.all([
      this.standingsJsonPromise,
      this.confStandingsJsonPromise,
    ]);
    this.cache.set(`${CURRENT_YEAR}.standings`, data);
    return data;
  }

  getRecordFromGames(teamName, games) {
    let winLossTie = [0, 0, 0];
    for (let game of games) {
      if (game.tie) {
        winLossTie[2] += 1;
      } else if (game.winner === teamName) {
        winLossTie[0] += 1;
      } else {
        winLossTie[1] += 1;
      }
    }

    return winLossTie;
  }

  async getHeadToHeadGames(team1, team2) {
    const t1Name = getCHNName(team1.name);
    const t2Name = getCHNName(team2.name);
    const GAMES = await this.getGames();

    let headToHeadgames = [];
    for (let game of GAMES) {
      if (
        (game.home === t1Name && game.away === t2Name) ||
        (game.home === t2Name && game.away === t1Name)
      ) {
        headToHeadgames.push(game);
      }
    }

    return [
      this.getRecordFromGames(t1Name, headToHeadgames),
      this.getRecordFromGames(t2Name, headToHeadgames),
    ];
  }

  async getHomeAwayNeutralRecord(team) {
    const teamName = getCHNName(team.name);
    const GAMES = await this.getGames();

    let homeGames = [];
    let awayGames = [];
    let neutralGames = [];
    for (let game of GAMES) {
      if (game.home === teamName) {
        if (game.neutralSite) {
          neutralGames.push(game);
        } else {
          homeGames.push(game);
        }
      } else if (game.away === teamName) {
        if (game.neutralSite) {
          neutralGames.push(game);
        } else {
          awayGames.push(game);
        }
      }
    }

    return [
      this.getRecordFromGames(teamName, homeGames),
      this.getRecordFromGames(teamName, awayGames),
      this.getRecordFromGames(teamName, neutralGames),
    ];
  }

  async getStandingsForTeam(team) {
    const chnName = getCHNName(team.name);

    const [STANDINGS, CONFERENCE_STANDINGS] = await this.getStandings();

    let stats = STANDINGS[chnName];
    let conferenceStats = CONFERENCE_STANDINGS[chnName];
    if (!stats || !conferenceStats) {
      console.log("NO STATS FOR", team, chnName);
      return null;
    }

    return { ...stats, ...conferenceStats };
  }

  async getNotableWins(team) {
    const chnName = getCHNName(team.name);
    let games = await this.getGames();

    let notableWins = [];
    for (let game of games) {
      if (
        (game.home === chnName || game.away === chnName) &&
        game.winner === chnName &&
        !!game.notable
      ) {
        notableWins.push(game);
      }
    }

    return notableWins;
  }

  async getNPIRank(team) {
    const chnName = getCHNName(team.name);
    let [standings, _] = await this.getStandings();

    let stats = standings[chnName];
    return stats.rank;
  }
}
const BracketUtils = new BracketUtilsClass();
export { BracketUtils };
