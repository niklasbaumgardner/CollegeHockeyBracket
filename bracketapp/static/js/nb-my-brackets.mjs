import { Standings } from "./nb-standings.mjs";
import { html } from "lit";
import "./nb-my-brackets-grid.mjs";
import "./nb-my-brackets-group-standings.mjs";
import "./nb-search-groups.mjs";

export class MyBrackets extends Standings {
  cache = {};

  static properties = {
    groups: { type: Object },
    shouldShowBrackets: { type: Boolean },
  };

  static queries = {
    tabGroup: "wa-tab-group",
    yearSelect: "#year-select",
    bracketGrid: "nb-my-brackets-grid",
    groupGrids: { all: "nb-my-brackets-group-standings" },
  };

  constructor() {
    super();

    this.url = new URL(window.location);

    this.initialTabPanel = this.url.hash.includes("group")
      ? "groups"
      : "my-brackets";
  }

  get canCreateBracket() {
    return (
      CAN_EDIT_BRACKET && this.year >= CURRENT_YEAR && this.brackets.length > 5
    );
  }

  get canEditThisYearsBrackets() {
    return CAN_EDIT_BRACKET && this.year >= CURRENT_YEAR;
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("wa-tab-show", this);

    window.addEventListener("hashchange", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "wa-tab-show": {
        this.handleTabShow(event);
        break;
      }
      case "hashchange": {
        this.handleHashChange(event);
        break;
      }
    }
  }

  handleTabShow(event) {
    let tabName = event.detail.name;
    if (tabName === "my-brackets") {
      this.shouldShowBrackets = true;
    }

    if (tabName === "groups") {
      window.location.hash = "groups";
    } else {
      window.location.hash = "";
    }
  }

  handleHashChange(event) {
    const hash = new URL(event.newURL).hash;
    if (hash === "#groups") {
      this.tabGroup.active = "groups";
    } else {
      this.tabGroup.active = "my-brackets";
    }
  }

  async requestContentForYear(year = null) {
    let response = await fetch(
      MY_BRACKETS_CONTENT_URL + (year ? `/${year}` : ""),
    );
    return response.json();
  }

  async requestContent() {
    let data = await this.requestContentForYear();

    let { brackets, groups, year, years } = data;

    this.brackets = brackets;
    this.groups = groups;
    this.year = year;
    this.years = years;

    this.cache[year] = data;
  }

  async handleYearChange() {
    let selectedYear = this.yearSelect.value;
    let data;
    if (this.cache[selectedYear]) {
      data = this.cache[selectedYear];
    } else {
      data = await this.requestContentForYear(selectedYear);
      this.cache[selectedYear] = data;
    }

    let { brackets, groups, year } = data;

    this.brackets = brackets;
    this.groups = groups;
    this.year = year;
    this.requestUpdate();

    this.bracketGrid?.updateData(this.brackets, this.groups, this.year);
    // if (this.groupGrids) {
    //   [...this.groupGrids].map(g=>g.updateData())
    // }
    console.log(this.shouldShowBrackets);
  }

  async updated() {
    if (
      !this.openedToGroups &&
      this.tabGroup &&
      this.initialTabPanel === "groups"
    ) {
      await this.tabGroup.updateComplete;
      this.tabGroup.active = "groups";
      this.openedToGroups = true;
      if (this.url.hash.includes("group_")) {
        const groupCard = document.querySelector(this.url.hash);
        groupCard.addABracket();
      }
    }
  }

  handleCreateGroupClick() {
    document.dispatchEvent(new CustomEvent("CreateNewGroup"));
  }

  yearsDropdown() {
    if (!this.years || this.years?.length < 2) {
      return this.year;
    }

    return html`<wa-select
      id="year-select"
      class="w-5"
      @input=${this.handleYearChange}
    >
      ${this.years.map(
        (y) =>
          html`<wa-option value=${y} ?selected=${this.year === y}
            >${y}</wa-option
          >`,
      )}
    </wa-select>`;
  }

  titleTemplate() {
    return html`<div>
      <h2 class="wa-cluster m-0">My Brackets ${this.yearsDropdown()}</h2>
      ${this.subtitleTemplate()}
    </div>`;
  }

  subtitleTemplate() {
    if (this.year >= CURRENT_YEAR) {
      return html`<small class="text-(--wa-color-text-quiet)"
        >You created ${this.brackets.length}/5 brackets</small
      >`;
    }

    return null;
  }

  previewYearMessage() {
    return html`<wa-callout variant="brand"
      >You are viewing brackets from a previous year.</wa-callout
    >`;
  }

  messageTemplate() {
    return html`${this.canEditThisYearsBrackets
      ? html`<nb-countdown></nb-countdown>`
      : this.previewYearMessage()}`;
  }

  newBracketButtonTemplate() {
    // if (this.brackets.length < 5 && CAN_EDIT_BRACKET) {
    if (this.canCreateBracket) {
      return html`<wa-button
        variant="brand"
        appearance="outlined"
        href=${CREATE_BRACKET_LINK}
        >Create Bracket</wa-button
      >`;
    }

    return null;
  }

  bracketsTemplate() {
    if (this.initialTabPanel === "groups" && !this.shouldShowBrackets) {
      return;
    }
    if (!this.bracketsTemplateCache) {
      this.bracketsTemplateCache = {};
    }
    this.bracketsTemplateCache[this.year] = html`<div class="wa-stack">
      ${this.newBracketButtonTemplate()}
      <nb-my-brackets-grid
        headerName="My Brackets"
        .brackets=${this.brackets}
        .groups=${this.groups}
        year=${this.year}
      ></nb-my-brackets-grid>
    </div>`;

    return this.bracketsTemplateCache[this.year];
  }

  newGroupButtonTemplate() {
    if (this.canEditThisYearsBrackets) {
      return html`<wa-button
        class="w-full"
        variant="brand"
        appearance="outlined"
        @click=${this.handleCreateGroupClick}
        >Create Group</wa-button
      >`;
    }

    return null;
  }

  searchGroupsTemplate() {
    if (this.canEditThisYearsBrackets) {
      return html`<nb-search-groups></nb-search-groups>`;
    }

    return null;
  }

  groupCardsTemplate() {
    if (this.groups.length) {
      return this.groups.map(
        (g) =>
          html`<nb-my-brackets-group-standings
            id="group_${g.id}"
            .group=${g}
            .myBrackets=${this.brackets}
            year=${this.year}
          ></nb-my-brackets-group-standings>`,
      );
    }

    if (this.canEditThisYearsBrackets) {
      return html`No groups yet`;
    }

    return html`No groups for this year`;
  }

  groupSearchAndButtonTemplate() {
    if (this.canEditThisYearsBrackets) {
      return html`<div class="wa-cluster">
        <div class="grow">${this.newGroupButtonTemplate()}</div>
        <div class="grow">${this.searchGroupsTemplate()}</div>
      </div>`;
    }

    return null;
  }

  groupsTemplate() {
    return html`<div class="wa-stack">
      ${this.groupSearchAndButtonTemplate()}${this.groupCardsTemplate()}
    </div>`;
  }

  render() {
    if (!this.year) {
      return null;
    }

    return html`<wa-card>
      <div class="wa-stack">
        ${this.titleTemplate()} ${this.messageTemplate()}
        <wa-tab-group @wa-tab-show=${this.handleTabShow}>
          <wa-tab slot="nav" panel="my-brackets">My Brackets</wa-tab>
          <wa-tab slot="nav" panel="groups">Groups</wa-tab>

          <wa-tab-panel name="my-brackets"
            >${this.bracketsTemplate()}</wa-tab-panel
          >
          <wa-tab-panel name="groups">${this.groupsTemplate()}</wa-tab-panel>
        </wa-tab-group>
      </div>
    </wa-card>`;
  }
}

customElements.define("nb-my-brackets", MyBrackets);
