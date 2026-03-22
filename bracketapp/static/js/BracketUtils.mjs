import { getCHNName } from "./chn.mjs";

const GAMES_CACHE_KEY = `${CURRENT_YEAR}.games`;
const GAMES_FILENAME = `/static/json/${CURRENT_YEAR}.games.json`;

const NPI_CACHE_KEY = `${CURRENT_YEAR}.npi`;
const NPI_FILENAME = `/static/json/${CURRENT_YEAR}.npi.json`;

const KRACH_CACHE_KEY = `${CURRENT_YEAR}.krach`;
const KRACH_FILENAME = `/static/json/${CURRENT_YEAR}.krach.json`;

const CONFERENCE_CACHE_KEY = `${CURRENT_YEAR}.conference`;
const CONFERENCE_FILENAME = `/static/json/${CURRENT_YEAR}.conference.json`;

class BracketUtilsClass {
  constructor() {
    this.cache = new Map();
    this.gamesRequestPromise = null;
    this.gamesJsonPromise = null;
    this.npiRequestPromise = null;
    this.npiJsonPromise = null;
    this.krachRequestPromise = null;
    this.krachJsonPromise = null;
    this.confStandingsRequestPromise = null;
    this.confStandingsJsonPromise = null;
  }

  async getGames() {
    if (this.cache.has(GAMES_CACHE_KEY)) {
      this.cache.get(GAMES_CACHE_KEY);
    }

    if (!this.gamesRequestPromise) {
      const url = STATIC_FILE_MAP[GAMES_FILENAME];
      this.gamesRequestPromise = fetch(url);
    }

    const response = await this.gamesRequestPromise;

    if (!this.gamesJsonPromise) {
      this.gamesJsonPromise = response.json();
    }

    const data = await this.gamesJsonPromise;
    this.cache.set(GAMES_CACHE_KEY, data);
    return data;
  }

  async getKrach() {
    if (this.cache.has(KRACH_CACHE_KEY)) {
      this.cache.get(KRACH_CACHE_KEY);
    }

    if (!this.krachRequestPromise) {
      const krachUrl = STATIC_FILE_MAP[KRACH_FILENAME];
      this.krachRequestPromise = fetch(krachUrl);
    }

    const krachResponse = await this.krachRequestPromise;

    if (!this.krachJsonPromise) {
      this.krachJsonPromise = krachResponse.json();
    }

    const data = await this.krachJsonPromise;

    this.cache.set(KRACH_CACHE_KEY, data);
    return data;
  }

  async getNPI() {
    if (this.cache.has(NPI_CACHE_KEY)) {
      this.cache.get(NPI_CACHE_KEY);
    }

    if (!this.npiRequestPromise) {
      const npiUrl = STATIC_FILE_MAP[NPI_FILENAME];
      this.npiRequestPromise = fetch(npiUrl);
    }

    const npiResponse = await this.npiRequestPromise;

    if (!this.npiJsonPromise) {
      this.npiJsonPromise = npiResponse.json();
    }

    const data = await this.npiJsonPromise;

    this.cache.set(NPI_CACHE_KEY, data);
    return data;
  }

  async getConference() {
    if (this.cache.has(CONFERENCE_CACHE_KEY)) {
      this.cache.get(CONFERENCE_CACHE_KEY);
    }

    if (!this.confStandingsRequestPromise) {
      const confStandingsUrl = STATIC_FILE_MAP[CONFERENCE_FILENAME];
      this.confStandingsRequestPromise = fetch(confStandingsUrl);
    }

    const conferenceResponse = await this.confStandingsRequestPromise;

    if (!this.confStandingsJsonPromise) {
      this.confStandingsJsonPromise = conferenceResponse.json();
    }

    const data = await this.confStandingsJsonPromise;

    this.cache.set(CONFERENCE_CACHE_KEY, data);
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

    const [krach, conf, npi] = await Promise.all([
      this.getKrach(),
      this.getConference(),
      this.getNPI(),
    ]);

    const krachStats = krach[chnName];
    const confStats = conf[chnName];
    const npiStats = npi[chnName];
    if (!krachStats || !confStats || !npiStats) {
      console.log("NO STATS FOR", team, chnName);
      return null;
    }

    return { ...krachStats, ...confStats, ...npiStats };
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
    const data = await this.getNPI();

    const stats = data[chnName];
    return stats.npi.rank;
  }
}
const BracketUtils = new BracketUtilsClass();
export { BracketUtils };
