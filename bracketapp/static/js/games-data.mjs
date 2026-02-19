import { getCHNName } from "./chn.mjs";

const GAMES_PROMISE = fetch(`/static/json/${CURRENT_YEAR}.games.json`).then(
  (r) => r.json(),
);

function getRecordFromGames(teamName, games) {
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

export async function getHeadToHeadGames(team1, team2) {
  const t1Name = getCHNName(team1.name);
  const t2Name = getCHNName(team2.name);
  const GAMES = await GAMES_PROMISE;

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
    getRecordFromGames(t1Name, headToHeadgames),
    getRecordFromGames(t2Name, headToHeadgames),
  ];
}

export async function getHomeAwayNeutralRecord(team) {
  const teamName = getCHNName(team.name);
  const GAMES = await GAMES_PROMISE;

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
    getRecordFromGames(teamName, homeGames),
    getRecordFromGames(teamName, awayGames),
    getRecordFromGames(teamName, neutralGames),
  ];
}
