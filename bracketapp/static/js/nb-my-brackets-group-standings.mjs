import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-group-standings-grid.mjs";
import "./nb-my-brackets.mjs";
import "./nb-add-a-bracket-to-group-modal.mjs";
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
      this.addBracketModal = document.createElement("nb-add-bracket-modal");
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
        appearance="filled-outlined"
        @click=${this.handleAddBracketClick}
        >Add A Bracket</wa-button
      >
      <div class="invite-others flex items-center">
        Invite friends
        <wa-copy-button
          value=${this.group.share_url}
          copy-label="Copy link to join"
        >
          <wa-icon slot="copy-icon" name="share"></wa-icon>
        </wa-copy-button>
      </div>
    </div>`;
  }

  render() {
    return html`<wa-card
      style="
          --wa-panel-background-color: var(--wa-color-neutral-100);
        "
    >
      <div class="flex flex-col items-center gap-3 nb-group-card">
        <div class="flex justify-content-between w-full flex-wrap">
          <a
            class="flex grow items-center no-underline"
            href="${this.group.url}"
          >
            <wa-icon class="trophy" name="trophy"></wa-icon>
            <div class="flex flex-col group-name">
              <span class="underline">${this.group.name}</span>
              <span class="group-size"
                >Group size: ${this.group.members.length}</span
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
  MyBracketsGroupStandings
);
