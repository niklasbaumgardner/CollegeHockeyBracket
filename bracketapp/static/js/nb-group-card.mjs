import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { GroupStandingsGrid } from "./nb-group-standings-grid.mjs";

export class GroupCard extends NikElement {
  static properties = {
    group: { type: Object },
    shouldShowBracket: { type: Boolean },
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
          this.shouldShowBracket = true;
          document.removeEventListener("sl-tab-show", this);
        }
      }
    }
  }

  bracketsTemplate() {
    if (!this.shouldShowBracket) {
      return null;
    }

    return html`<nb-group-standings-grid
      class="w-100"
      .brackets=${this.group.brackets}
      theme=${THEME}
    ></nb-group-standings-grid>`;
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
          ${CAN_EDIT_BRACKET
            ? html`<div class="invite-others">
                Invite friends
                <sl-copy-button
                  value="${this.group.share_url}"
                  copy-label="Copy link to join"
                >
                  <sl-icon slot="copy-icon" name="share"></sl-icon>
                </sl-copy-button>
              </div>`
            : null}
        </div>
        ${this.bracketsTemplate()}
      </div>
    </sl-card>`;
  }
}

customElements.define("nb-group-card", GroupCard);
