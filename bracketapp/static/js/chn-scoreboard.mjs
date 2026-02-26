import { NikElement } from "./nik-element.mjs";
import { html } from "lit";
import { DeferredTask } from "./DeferredTask.mjs";

const CHN_BASE_URL =
  "https://www.collegehockeynews.com/external/widgets/ajaxprocess/makeJSONP.php?datafile=liveScoreboardData.json&callback=";

export class SHNScoreboard extends NikElement {
  static properties = { games: { type: Array } };

  connectedCallback() {
    super.connectedCallback();

    this.init();
  }

  async init() {
    const callback = "callback_" + Date.now();
    const script = document.createElement("script");
    script.src = CHN_BASE_URL + callback;
    document.body.append(script);

    this.games = await new Promise((r) => {
      window[callback] = (data) => {
        delete window[callback];

        r(data);

        script.remove();
      };
    });
    // this.games = [
    //   {
    //     sked: "2026-02-26 18:30:00",
    //     visID: "34",
    //     homeID: "31",
    //     vscore: null,
    //     hscore: null,
    //     neutral: "",
    //     confID: 10,
    //     tournID: 0,
    //     ots: null,
    //     tz: 0,
    //     note: "",
    //     forfeit: null,
    //     modtime: "2025-10-10 08:16:06",
    //     attendance: null,
    //     arenaID: 250,
    //     ref: null,
    //     aref: null,
    //     tv: "82",
    //     season: 20252026,
    //     gen_id: 41140,
    //     have_box: null,
    //     skedStr: "Thursday, February 26, 2026",
    //     skeddate: "2026-02-26",
    //     unixsked: 1772148600,
    //     arenaname: "Yost Ice Arena",
    //     location: "Ann Arbor, Mich.",
    //     rinkAtlasID: 835,
    //     tournname: null,
    //     whenis: null,
    //     otType: "3x3",
    //     conftype: "bt",
    //     SOwinTeamID: null,
    //     SOwscore: null,
    //     SOlscore: null,
    //     SOrounds: null,
    //     homename: "Michigan",
    //     visname: "Minnesota",
    //     hcode: "mic",
    //     vcode: "min",
    //     boxlinkCHN: "/box/final/20260226/min/mic/",
    //     boxfilename: "mminmic.json",
    //     boxfilepath: "20252026/02/26",
    //     timeStrWtz: "6:30 ET",
    //     tvStr: "BTen",
    //     streaming: {
    //       link_generic: "https://www.btnplus.com",
    //       source: "BTN+",
    //       premium: true,
    //     },
    //     gamestatus: "6:30 ET",
    //     start_time: "6:30 ET",
    //     v: {
    //       code: "min",
    //       score: "",
    //       shots: 0,
    //       shot_attempts: [],
    //       line: [],
    //       sline: [],
    //       gchange: [],
    //       goalie: [],
    //       roster: [],
    //       team_stats: [],
    //       confID: 10,
    //       record: {
    //         w: 10,
    //         l: 19,
    //         t: 2,
    //         lw: 6,
    //         ll: 13,
    //         lt: 1,
    //         hw: 7,
    //         hl: 10,
    //         ht: 1,
    //         aw: 3,
    //         al: 9,
    //         at: 1,
    //         nw: 0,
    //         nl: 0,
    //         nt: 0,
    //         ow: 1,
    //         ol: 2,
    //         low: 0,
    //         lol: 2,
    //         ot: 2,
    //         sow: 1,
    //         nd1rw: 0,
    //         nd1rl: 0,
    //         nd1ow: 0,
    //         nd1ol: 0,
    //         nd1ot: 0,
    //         o3w: 1,
    //         o3l: 2,
    //         rw: 9,
    //         rl: 17,
    //         rt: 0,
    //         pct: ".355",
    //         pwpct: ".369",
    //       },
    //       rad: "KTLK 1130/103.5",
    //       logo: "min.png",
    //       npi_rank: 39,
    //     },
    //     h: {
    //       code: "mic",
    //       score: "",
    //       shots: 0,
    //       shot_attempts: [],
    //       line: [],
    //       sline: [],
    //       gchange: [],
    //       goalie: [],
    //       roster: [],
    //       team_stats: [],
    //       confID: 10,
    //       record: {
    //         w: 25,
    //         l: 6,
    //         t: 1,
    //         lw: 16,
    //         ll: 5,
    //         lt: 1,
    //         hw: 12,
    //         hl: 2,
    //         ht: 1,
    //         aw: 13,
    //         al: 3,
    //         at: 0,
    //         nw: 0,
    //         nl: 1,
    //         nt: 0,
    //         ow: 5,
    //         ol: 0,
    //         low: 4,
    //         lol: 0,
    //         ot: 1,
    //         sow: 1,
    //         nd1rw: 0,
    //         nd1rl: 0,
    //         nd1ow: 0,
    //         nd1ol: 0,
    //         nd1ot: 0,
    //         o3w: 5,
    //         o3l: 0,
    //         rw: 20,
    //         rl: 6,
    //         rt: 0,
    //         pct: ".797",
    //         pwpct: ".727",
    //       },
    //       rad: "1050 AM WTKA",
    //       logo: "mic.png",
    //       npi_rank: 2,
    //     },
    //     status: "pregame",
    //     current_period: 0,
    //     goals: [],
    //     penalties: [],
    //     plays: [],
    //     source: "not-started",
    //     liveboxLink: "/box/livebox.php?vc=min&hc=mic&d=20260226",
    //     gameID: 111497,
    //   },
    //   {
    //     sked: "2026-02-26 19:00:00",
    //     visID: "21",
    //     homeID: "24",
    //     vscore: null,
    //     hscore: null,
    //     neutral: "",
    //     confID: 2,
    //     tournID: 0,
    //     ots: null,
    //     tz: 0,
    //     note: "",
    //     forfeit: null,
    //     modtime: "2025-09-12 10:34:58",
    //     attendance: null,
    //     arenaID: 209,
    //     ref: null,
    //     aref: null,
    //     tv: null,
    //     season: 20252026,
    //     gen_id: 42093,
    //     have_box: null,
    //     skedStr: "Thursday, February 26, 2026",
    //     skeddate: "2026-02-26",
    //     unixsked: 1772150400,
    //     arenaname: "Taffy Abel Arena",
    //     location: "Sault Ste. Marie, Mich.",
    //     rinkAtlasID: 944,
    //     tournname: null,
    //     whenis: null,
    //     otType: "3x3",
    //     conftype: "cc",
    //     SOwinTeamID: null,
    //     SOwscore: null,
    //     SOlscore: null,
    //     SOrounds: null,
    //     homename: "Lake Superior",
    //     visname: "Ferris State",
    //     hcode: "lss",
    //     vcode: "fsu",
    //     boxlinkCHN: "/box/final/20260226/fsu/lss/",
    //     boxfilename: "mfsulss.json",
    //     boxfilepath: "20252026/02/26",
    //     timeStrWtz: "7:00 ET",
    //     tvStr: "",
    //     streaming: {
    //       link: "https://www.midcosportsplus.com/playback/item/6389537728112",
    //       source: "Midco",
    //       icon: "icon-livestream-direct-32.png",
    //       premium: true,
    //     },
    //     gamestatus: "7:00 ET",
    //     start_time: "7:00 ET",
    //     v: {
    //       code: "fsu",
    //       score: "",
    //       shots: 0,
    //       shot_attempts: [],
    //       line: [],
    //       sline: [],
    //       gchange: [],
    //       goalie: [],
    //       roster: [],
    //       team_stats: [],
    //       confID: 2,
    //       record: {
    //         w: 6,
    //         l: 25,
    //         t: 1,
    //         lw: 5,
    //         ll: 18,
    //         lt: 1,
    //         hw: 3,
    //         hl: 11,
    //         ht: 1,
    //         aw: 3,
    //         al: 12,
    //         at: 0,
    //         nw: 0,
    //         nl: 2,
    //         nt: 0,
    //         ow: 1,
    //         ol: 2,
    //         low: 1,
    //         lol: 2,
    //         ot: 1,
    //         sow: 1,
    //         nd1rw: 0,
    //         nd1rl: 0,
    //         nd1ow: 0,
    //         nd1ol: 0,
    //         nd1ot: 0,
    //         o3w: 1,
    //         o3l: 2,
    //         rw: 5,
    //         rl: 23,
    //         rt: 0,
    //         pct: ".203",
    //         pwpct: ".217",
    //       },
    //       rad: "97.3 FM WDEE",
    //       logo: "fsu.png",
    //       npi_rank: 58,
    //     },
    //     h: {
    //       code: "lss",
    //       score: "",
    //       shots: 0,
    //       shot_attempts: [],
    //       line: [],
    //       sline: [],
    //       gchange: [],
    //       goalie: [],
    //       roster: [],
    //       team_stats: [],
    //       confID: 2,
    //       record: {
    //         w: 11,
    //         l: 19,
    //         t: 2,
    //         lw: 8,
    //         ll: 15,
    //         lt: 1,
    //         hw: 3,
    //         hl: 10,
    //         ht: 1,
    //         aw: 8,
    //         al: 7,
    //         at: 1,
    //         nw: 0,
    //         nl: 2,
    //         nt: 0,
    //         ow: 1,
    //         ol: 4,
    //         low: 1,
    //         lol: 4,
    //         ot: 2,
    //         sow: 1,
    //         nd1rw: 0,
    //         nd1rl: 0,
    //         nd1ow: 0,
    //         nd1ol: 0,
    //         nd1ot: 0,
    //         o3w: 1,
    //         o3l: 4,
    //         rw: 10,
    //         rl: 15,
    //         rt: 0,
    //         pct: ".375",
    //         pwpct: ".417",
    //       },
    //       rad: "WYSS 99.5 Yes FM",
    //       logo: "lss.png",
    //       npi_rank: 49,
    //     },
    //     status: "pregame",
    //     current_period: 0,
    //     goals: [],
    //     penalties: [],
    //     plays: [],
    //     source: "not-started",
    //     liveboxLink: "/box/livebox.php?vc=fsu&hc=lss&d=20260226",
    //     gameID: 111006,
    //   },
    // ];

    console.log(this.games);

    if (this.closest("wa-drawer")) {
      this.drawer = this.closest("wa-drawer");
      const button = document.getElementById("scoreboard-button");
      button.addEventListener("click", this);
      const badge = button.querySelector("wa-badge");
      badge.textContent = this.games.length;
    }

    if (this.games.length === 0) {
      button.remove();
      this.remove();
    } else {
    }
  }

  handleEvent(event) {
    if (event.type !== "click") {
      return;
    }

    this.drawer.open = !this.drawer.open;
  }

  gamesTemplate() {
    if (!this.games?.length) {
      return html`<tr>
        No games today
      </tr>`;
    }

    return this.games.map(
      (g) =>
        html`<tr>
          <td>
            <div class="wa-heading-m">
              ${g.visname} ${g.neutral === "" ? "at" : "vs"} ${g.homename}
              ${g.gamestatus}
            </div>
            <div>${g.arenaname} - ${g.location}</div>
            <div>
              Streaming on
              <a
                href=${g.streaming.link_generic ?? g.streaming.link}
                target="_blank"
                >${g.streaming.source}</a
              >
            </div>
          </td>
        </tr>`,
    );
  }

  render() {
    return html`<table>
        <thead>
          <th
            class="wa-cluster top-[calc(100% - 60px)] left-[calc(100% - 80px)]"
          >
            <a
              class="wa-heading-l"
              href="https://www.collegehockeynews.com/scoreboard"
              target="_blank"
              >Live Scoreboard from CHN</a
            ><a href="https://www.collegehockeynews.com" target="_blank"
              ><img
                src="https://www.collegehockeynews.com/images/logos/chn2006-notext-50x20-trans.png"
            /></a>
          </th>
        </thead>
        <tbody>
          ${this.gamesTemplate()}
        </tbody>
      </table>
      <div class="flex justify-center gap-(--wa-space-2xs)">
        More at CHN:
        <a href="https://www.collegehockeynews.com/stats/" target="_blank"
          >Stats</a
        >
        |
        <a href="https://www.collegehockeynews.com/news/" target="_blank"
          >News</a
        >
        |
        <a href="https://www.collegehockeynews.com/ratings/" target="_blank"
          >Pairwise</a
        >
      </div>`;
  }
}

customElements.define("chn-scoreboard", SHNScoreboard);
