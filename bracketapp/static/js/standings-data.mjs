import { getCHNName } from "./chn.mjs";

const STANDINGS_PROMISE = fetch(
  `/static/json/${CURRENT_YEAR}.standings.json`,
).then((r) => r.json());
const CONFERENCE_STANDINGS_PROMISE = fetch(
  `/static/json/${CURRENT_YEAR}.conference.json`,
).then((r) => r.json());

export async function getStandingsForTeam(team) {
  const chnName = getCHNName(team.name);

  const [STANDINGS, CONFERENCE_STANDINGS] = await Promise.all([
    STANDINGS_PROMISE,
    CONFERENCE_STANDINGS_PROMISE,
  ]);

  let stats = STANDINGS[chnName];
  let conferenceStats = CONFERENCE_STANDINGS[chnName];
  if (!stats || !conferenceStats) {
    console.log("NO STATS FOR", team, chnName);
    return null;
  }

  return { ...stats, ...conferenceStats };
}
