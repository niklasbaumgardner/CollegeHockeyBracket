import { Standings } from "./nb-standings.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-my-brackets-grid.mjs";
import "./nb-my-brackets-group-standings.mjs";
import "./nb-search-groups.mjs";

export class MyBrackets extends Standings {
  static properties = {
    groups: { type: Object },
    shouldShowBrackets: { type: Boolean },
  };

  static queries = {
    tabGroup: "wa-tab-group",
  };

  constructor() {
    super();

    this.url = new URL(window.location);

    this.initialTabPanel = this.url.hash.includes("group")
      ? "groups"
      : "my-brackets";
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("wa-tab-show", this);

    window.addEventListener("hashchange", this);

    console.log("this is version 2");
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

  async requestContent() {
    let response = await fetch(MY_BRACKETS_CONTENT_URL);
    let data = await response.json();

    let { brackets, groups, year } = data;
    this.brackets = brackets;
    this.groups = groups;
    this.year = year;
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

  titleTemplate() {
    return html`<div>
      <h2>My Brackets ${this.year}</h2>
    </div>`;
  }

  messageTemplate() {
    return html`<small class="text-(--wa-color-text-quiet)"
        >You created ${this.brackets.length}/5 brackets</small
      >${CAN_EDIT_BRACKET ? html`<nb-countdown></nb-countdown>` : null}`;
  }

  newBracketButtonTemplate() {
    if (this.brackets.length < 5 && CAN_EDIT_BRACKET) {
      return html`<wa-button
        variant="brand"
        appearance="outlined"
        href=${NEW_BRACKET_LINK}
        >Create Bracket</wa-button
      >`;
    }

    return null;
  }

  bracketsTemplate() {
    if (this.initialTabPanel === "groups" && !this.shouldShowBrackets) {
      return;
    }

    return html`<div class="wa-stack">
      ${this.newBracketButtonTemplate()}
      <nb-my-brackets-grid
        headerName="My Brackets"
        .brackets=${this.brackets}
        .groups=${this.groups}
      ></nb-my-brackets-grid>
    </div>`;
  }

  newGroupButtonTemplate() {
    if (CAN_EDIT_BRACKET) {
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
    if (CAN_EDIT_BRACKET) {
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
          ></nb-my-brackets-group-standings>`,
      );
    }

    return null;
  }

  groupSearchAndButtonTemplate() {
    return html`<div class="wa-cluster">
      <div class="grow">${this.newGroupButtonTemplate()}</div>
      <div class="grow">${this.searchGroupsTemplate()}</div>
    </div>`;
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
      ${this.titleTemplate()}
      <div class="wa-stack">
        ${this.messageTemplate()}
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
