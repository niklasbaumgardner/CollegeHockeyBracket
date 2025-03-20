import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { GroupStandingsGrid } from "./nb-group-standings-grid.mjs";
import { MyBrackets } from "./nb-my-brackets.mjs";
import { AddBracketModal } from "./nb-add-a-bracket-to-group-modal.mjs";
import "./nb-my-group-bracket-grid.mjs";

export class MyBracketsGroupStandings extends NikElement {
  static properties = {
    group: { type: Object },
    myBrackets: { type: Object },
    shouldShowBrackets: { type: Boolean },
  };

  static queries = {
    card: "sl-card",
  };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("sl-tab-show", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "sl-tab-show": {
        if (event.detail.name === "groups") {
          this.shouldShowBrackets = true;
          document.removeEventListener("sl-tab-show", this);
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
      class="w-100"
      headerName="My Brackets"
      .group=${this.group}
      .brackets=${this.group.brackets}
      theme=${THEME}
    ></nb-my-group-brackets-grid>`;
  }

  buttonsTemplate() {
    if (!CAN_EDIT_BRACKET) {
      return null;
    }

    return html`<div class="d-flex align-items-center gap-2">
      <sl-button size="small" @click=${this.handleAddBracketClick}
        >Add A Bracket</sl-button
      >
      <div class="invite-others d-flex align-items-center">
        Invite friends
        <sl-copy-button
          value="${this.group.share_url}"
          copy-label="Copy link to join"
        >
          <sl-icon slot="copy-icon" name="share"></sl-icon>
        </sl-copy-button>
      </div>
    </div>`;
  }

  render() {
    return html`<sl-card
      style="
          --sl-panel-background-color: var(--sl-color-neutral-100);
        "
    >
      <div class="d-flex flex-column align-items-center gap-3 nb-group-card">
        <div class="d-flex justify-content-between w-100">
          <a
            class="d-flex flex-grow-1 align-items-center text-decoration-none gap-3"
            href="${this.group.url}"
          >
            <sl-icon class="trophy" name="trophy"></sl-icon>
            <div class="d-flex flex-column group-name">
              <span class="text-decoration-underline">${this.group.name}</span>
              <span class="rank">Group size: ${this.group.members.length}</span>
            </div>
          </a>
          ${this.buttonsTemplate()}
        </div>
        ${this.bracketsTemplate()}
      </div>
    </sl-card>`;
  }
}

customElements.define(
  "nb-my-brackets-group-standings",
  MyBracketsGroupStandings
);
