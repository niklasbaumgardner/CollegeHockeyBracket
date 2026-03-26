import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

const CHN_BASE_URL =
  "https://www.collegehockeynews.com/external/widgets/ajaxprocess/makeJSONP.php?datafile=liveScoreboardData.json&callback=";
const BLACK_LISTED_PAGES = new Set([
  "login",
  "signup",
  "profile",
  "preferences",
  "password_request",
  "password_reset",
]);
const SHOW_SIDEBAR_PAGES = new Set(["leaderboard", "group", "bracket"]);
// The rest of pages will show the button
export class SHNScoreboard extends NikElement {
  static properties = { games: { type: Array } };

  static queries = {
    drawer: "wa-drawer",
    desktopEl: "#desktop",
    mobileEl: "#mobile",
    closeButton: "#close-scoreboard",
  };

  connectedCallback() {
    super.connectedCallback();

    this.init();
  }

  get isOpen() {
    return this.checkVisibility();
  }

  get isMobile() {
    return this.mobileEl.checkVisibility();
  }

  get isDesktop() {
    return this.desktopEl.checkVisibility();
  }

  async getJsonP() {
    const callback = "callback_" + Math.floor(Date.now() / (1000 * 60));
    const previousCallBack = localStorage.getItem("previousCallBack");
    if (previousCallBack === callback) {
      this.games = JSON.parse(localStorage.getItem(previousCallBack));
    } else {
      const script = document.createElement("script");
      script.src = CHN_BASE_URL + callback;
      document.head.append(script);

      this.games = await new Promise((r) => {
        window[callback] = (data) => {
          localStorage.removeItem(previousCallBack);
          localStorage.setItem("previousCallBack", callback);
          localStorage.setItem(callback, JSON.stringify(data));

          r(data);
          script.remove();
        };
      });
    }
  }

  /**
   * This is for testing only
   */
  async getJson() {
    const file = "/static/json/dev/live.3-5.json";
    let response = await fetch(file);
    let json = await response.json();
    this.games = json;
  }

  parseGameStartTimes() {
    for (let game of this.games) {
      let startTime = game.start_time ?? game.timeStrWtz;
      if (!startTime || startTime.endsWith("ET")) {
        continue;
      }

      let timeDiff = 0;
      if (startTime.endsWith("CT")) {
        timeDiff = 1;
      } else if (startTime.endsWith("MT")) {
        timeDiff = 2;
      } else if (startTime.endsWith("PT")) {
        timeDiff = 3;
      } else if (startTime.endsWith("AT")) {
        timeDiff = 4;
      }

      if (timeDiff === 0) {
        continue;
      }

      let ctTime = startTime.replace(" CT", "").trim().split(":");
      let etTime = Number(ctTime[0]) + timeDiff;
      game.gamestatus = `${etTime}:${ctTime[1]} ET`;
    }
  }

  sortGames() {
    this.games.sort((a, b) => {
      let ret = 0;
      if (a.gamestatus.includes("Final") && b.gamestatus.includes("Final")) {
        ret = 0;
      } else if (a.gamestatus === b.gamestatus) {
        ret = 0;
      } else if (a.gamestatus.includes("Final")) {
        ret = 1;
      } else if (b.gamestatus.includes("Final")) {
        ret = -1;
      } else {
        let isATime = !isNaN(a.gamestatus[0]);
        let isBTime = !isNaN(b.gamestatus[0]);
        if (isATime && !isBTime) {
          ret = 1;
        } else if (!isATime && isBTime) {
          ret = -1;
        } else {
          ret = a.gamestatus.localeCompare(b.gamestatus);
        }
      }

      // console.log(a.gamestatus, b.gamestatus, ret);
      return ret;
    });
  }

  shouldShowOnPage() {
    let currentUrl = new URL(location.href);
    let path = currentUrl.pathname.split("/").at(1);
    if (!CURRENT_USER?.id || BLACK_LISTED_PAGES.has(path)) {
      return -1;
    } else if (SHOW_SIDEBAR_PAGES.has(path)) {
      return 1;
    }

    return 0;
  }

  async init() {
    this.button = document.getElementById("scoreboard-button");
    const shouldShow = this.shouldShowOnPage();
    if (shouldShow === -1) {
      this.button.remove();
      this.remove();
      return;
    }

    const scoreboardOpen =
      (localStorage.getItem("scoreboardState") ?? "open") === "open" &&
      shouldShow === 1;

    await this.getJsonP();
    // await this.getJson();
    // console.log(this.games);

    if (this.games.length === 0) {
      this.button.remove();
      this.remove();
      return;
    } else {
      this.style.removeProperty("width");
    }

    this.parseGameStartTimes();
    this.sortGames();
    this.requestUpdate();

    this.button.addEventListener("click", this);
    this.closeButton.addEventListener("click", this);

    if (this.isMobile) {
      this.button.hidden = false;
    }

    if (this.isDesktop && !scoreboardOpen) {
      this.hide();
    }
  }

  handleEvent(event) {
    if (event.type !== "click") {
      return;
    }

    if (event.target === this.button) {
      if (this.isMobile) {
        this.drawer.open = !this.drawer.open;
      } else {
        this.show();
      }
    } else if (event.target === this.closeButton) {
      this.hide();
    }
  }

  show() {
    this.desktopEl.hidden = false;
    this.button.hidden = true;
    localStorage.setItem("scoreboardState", "open");
  }

  hide() {
    this.desktopEl.hidden = true;
    this.button.hidden = false;
    localStorage.setItem("scoreboardState", "closed");
  }

  teamTemplate(name, team) {
    return html`<div class="flex justify-between wa-heading-m">
      <div class="flex">
        <div class="wa-body-s min-w-[4ch]">${team.npi_rank ? `(${team.npi_rank})` : ""}</div>
        ${name}
      </div>
      <div">${team.score}</div>
    </div>`;
  }

  gameTemplate(g) {
    let badgeColor = "danger";
    if (g.gamestatus.startsWith("Final")) {
      badgeColor = "neutral";
    } else if (!isNaN(g.gamestatus[0])) {
      badgeColor = "warning";
    }

    return html`<div class="flex flex-col gap-(--wa-space-2xs)">
      <div class="flex justify-between">
        <div class="wa-heading-m">
          ${g.tournname ? html`${g.tournname}` : null}
        </div>
        <wa-badge appearance="filled-outlined" variant=${badgeColor}
          >${g.gamestatus.includes("Per.") ? "LIVE - " : ""}
          ${g.gamestatus}</wa-badge
        >
      </div>
      <div>
        ${this.teamTemplate(g.visname, g.v)}
        ${this.teamTemplate(g.homename, g.h)}
      </div>
      <div class="wa-caption-xs">${g.arenaname} - ${g.location}</div>
    </div>`;
  }

  gamesTemplate() {
    if (!this.games?.length) {
      return html`<div>No games today</div>`;
    }

    return this.games.flatMap((g) => [
      html`<div>${this.gameTemplate(g)}</div>`,
      html`<wa-divider class="m-0"></wa-divider>`,
    ]);
  }

  template() {
    return html`<div class="wa-stack p-(--wa-space-m)">
      <div>
        <div class="wa-desktop-only">
          <div
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
            <wa-button
              class="wa-desktop-only"
              appearance="plain"
              variant="neutral"
              id="close-scoreboard"
            >
              <wa-icon
                auto-width
                class="pointer-events-none"
                label="Close"
                name="system/close-large-line"
                library="remix"
              ></wa-icon>
            </wa-button>
          </div>
        </div>
      </div>

      ${this.gamesTemplate()}

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
          >NPI</a
        >
      </div>
    </div>`;
  }

  render() {
    return html`<aside>
      <div id="desktop" class="wa-desktop-only">${this.template()}</div>
      <div id="mobile" class="wa-mobile-only">
        <wa-drawer
          ><div class="wa-mobile-only" slot="label">
            <div
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
              <wa-button
                class="wa-desktop-only"
                appearance="plain"
                variant="neutral"
                id="close-scoreboard"
              >
                <wa-icon
                  auto-width
                  class="pointer-events-none"
                  label="Close"
                  name="system/close-large-line"
                  library="remix"
                ></wa-icon>
              </wa-button>
            </div>
          </div>
          ${this.template()}</wa-drawer
        >
      </div>
    </aside>`;
  }
}

customElements.define("chn-scoreboard", SHNScoreboard);
