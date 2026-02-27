import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

const CHN_BASE_URL =
  "https://www.collegehockeynews.com/external/widgets/ajaxprocess/makeJSONP.php?datafile=liveScoreboardData.json&callback=";

export class SHNScoreboard extends NikElement {
  static properties = { games: { type: Array } };

  static queries = {
    drawer: "wa-drawer",
    desktopEl: ".wa-desktop-only",
    mobileEl: ".wa-mobile-only",
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
    const file = "./static/json/dev/live.final.json";
    let response = await fetch(file);
    let json = await response.json();
    this.games = json;
  }

  async init() {
    const scoreboardOpen =
      (localStorage.getItem("scoreboardState") ?? "open") === "open";
    this.button = document.getElementById("scoreboard-button");

    await this.getJsonP();

    if (this.games.length === 0) {
      this.button.remove();
      this.remove();
      return;
    }

    await this.updateComplete;

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
    let badgeColor = "warning";
    if (g.gamestatus === "Final") {
      badgeColor = "neutral";
    } else if (g.gamestatus.includes("Per.")) {
      badgeColor = "danger";
    }

    return html`<div>
      ${this.teamTemplate(g.visname, g.v)} ${this.teamTemplate(g.homename, g.h)}
      <div>
        <wa-badge appearance="filled-outlined" variant=${badgeColor}
          >${g.gamestatus.includes("Per.") ? "LIVE - " : ""}
          ${g.gamestatus}</wa-badge
        >
      </div>
      <div class="wa-body-xs">${g.arenaname} - ${g.location}</div>
    </div>`;
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
          <td>${this.gameTemplate(g)}</td>
        </tr>`,
    );
  }

  template() {
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

  render() {
    return html`<aside>
      <div class="wa-desktop-only">${this.template()}</div>
      <div class="wa-mobile-only">
        <wa-drawer>${this.template()}</wa-drawer>
      </div>
    </aside>`;
  }
}

customElements.define("chn-scoreboard", SHNScoreboard);
