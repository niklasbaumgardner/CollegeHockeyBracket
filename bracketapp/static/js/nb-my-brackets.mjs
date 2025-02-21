import { Standings } from "./nb-standings.mjs";
import { html } from "./imports.mjs";
import { MyBracketsGrid } from "./nb-my-brackets-grid.mjs";
import { GroupCard } from "./nb-group-card.mjs";

export class MyBrackets extends Standings {
  static properties = { groups: { type: Object } };

  handleCreateGroupClick() {
    document.dispatchEvent(new CustomEvent("CreateNewGroup"));
  }

  titleTemplate() {
    return html`<div>
      <h2 class="mb-0">My Brackets ${this.year}</h2>
    </div>`;
  }

  messageTemplate() {
    return html`<small class="color-neutral-700"
      >You created ${this.brackets.length}/5 brackets</small
    >`;
  }

  newBracketButtonTemplate() {
    if (this.brackets.length < 5 && CAN_EDIT_BRACKET) {
      return html`<sl-button variant="primary" href=${NEW_BRACKET_LINK} outline
        >Create Bracket</sl-button
      >`;
    }

    return null;
  }

  bracketsTemplate() {
    return html`<div class="d-flex flex-column gap-3">
      ${this.newBracketButtonTemplate()}
      <nb-my-brackets-grid
        .brackets=${this.brackets}
        .groups=${this.groups}
        theme=${this.theme}
      ></nb-my-brackets-grid>
    </div>`;
  }

  newGroupButtonTemplate() {
    if (CAN_EDIT_BRACKET) {
      return html`<sl-button
        variant="primary"
        @click=${this.handleCreateGroupClick}
        outline
        >Create Group</sl-button
      >`;
    }

    return null;
  }

  groupCardsTemplate() {
    if (this.groups.length) {
      return this.groups.map(
        (g) => html`<nb-group-card .group=${g}></nb-group-card>`
      );
    }
    if (CAN_EDIT_BRACKET) {
      return null;
    }

    return "Coming soon...";
  }

  groupsTemplate() {
    return html`<div class="d-flex flex-column gap-3">
      ${this.newGroupButtonTemplate()}${this.groupCardsTemplate()}
    </div>`;
  }

  render() {
    return html`<div class="d-flex justify-content-center">
      <sl-card>
        ${this.titleTemplate()}
        <div class="d-flex flex-column gap-3">
          ${this.messageTemplate()}
          <sl-tab-group>
            <sl-tab slot="nav" panel="my-brackets">My Brackets</sl-tab>
            <sl-tab slot="nav" panel="groups">Groups</sl-tab>

            <sl-tab-panel name="my-brackets"
              >${this.bracketsTemplate()}</sl-tab-panel
            >
            <sl-tab-panel name="groups">${this.groupsTemplate()}</sl-tab-panel>
          </sl-tab-group>
        </div>
      </sl-card>
    </div>`;
  }
}

customElements.define("nb-my-brackets", MyBrackets);
