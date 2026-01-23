import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-group-standings-grid.mjs";
import "./nb-my-brackets.mjs";
import "./nb-group-add-bracket.mjs";
import "./nb-my-group-brackets-grid.mjs";

export class MyBracketsGroupStandings extends NikElement {
  static properties = {
    group: { type: Object },
    myBrackets: { type: Object },
    shouldShowBrackets: { type: Boolean },
  };

  static queries = {
    card: "wa-card",
  };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("wa-tab-show", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "wa-tab-show": {
        if (event.detail.name === "groups") {
          this.shouldShowBrackets = true;
          document.removeEventListener("wa-tab-show", this);
        }
      }
    }
  }

  addABracket() {
    this.handleAddBracketClick();
  }

  handleAddBracketClick() {
    if (!this.addBracketModal) {
      this.addBracketModal = document.createElement("nb-group-add-bracket");
      this.addBracketModal.group = this.group;
      this.addBracketModal.myBrackets = this.myBrackets;
      document.body.appendChild(this.addBracketModal);
    }

    this.addBracketModal.show();
  }

  bracketsTemplate() {
    if (!this.shouldShowBrackets) {
      return null;
    }

    return html`<nb-my-group-brackets-grid
      class="w-full"
      headerName="My Brackets"
      .group=${this.group}
      .brackets=${this.group.brackets}
    ></nb-my-group-brackets-grid>`;
  }

  buttonsTemplate() {
    if (!CAN_EDIT_BRACKET) {
      return null;
    }

    return html`<div class="wa-cluster">
      <wa-button
        size="small"
        variant="brand"
        appearance="outlined"
        @click=${this.handleAddBracketClick}
        >Add A Bracket</wa-button
      >
      <div class="invite-others flex items-center">
        Invite friends
        <wa-copy-button
          value=${this.group.share_url}
          copy-label="Copy link to join"
        >
          <wa-icon
            slot="copy-icon"
            name="share"
            library="hero"
            variant="outline"
          ></wa-icon>
        </wa-copy-button>
      </div>
    </div>`;
  }

  render() {
    return html`<wa-card class="default-bg">
      <div class="wa-stack items-center nb-group-card">
        <div class="wa-split">
          <a
            class="flex grow items-center no-underline"
            href="${this.group.url}"
          >
            <wa-icon
              class="trophy"
              name="trophy"
              library="hero"
              variant="outline"
            ></wa-icon>
            <div class="flex flex-col group-name">
              <span class="underline">${this.group.name}</span>
              <span class="group-size"
                >Group size: ${this.group.member_count}</span
              >
            </div>
          </a>
          ${this.buttonsTemplate()}
        </div>
        ${this.bracketsTemplate()}
      </div>
    </wa-card>`;
  }
}

customElements.define(
  "nb-my-brackets-group-standings",
  MyBracketsGroupStandings,
);
