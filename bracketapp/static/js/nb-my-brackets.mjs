import { Standings } from "./nb-standings.mjs";
import { MyBracketsGrid } from "./nb-my-brackets-grid.mjs";
import { html } from "./imports.mjs";

export class MyBrackets extends Standings {
  titleTemplate() {
    return html`<div>
      <h2 class="mb-0">My Brackets ${this.year}</h2>
    </div>`;
  }

  messageTemplate() {
    let message = html`<small class="font-size-x-small color-neutral-700"
      >You created ${this.brackets.length}/5 brackets</small
    >`;
    if (!CAN_EDIT_BRACKET) {
      return message;
    }

    // TODO
    return html`${message}<sl-button variant="primary" href=${NEW_BRACKET_LINK}
        >Create a bracket</sl-button
      >`;
  }

  bracketsTemplate() {
    return html`<nb-my-brackets-grid
      .brackets=${this.brackets}
      theme=${this.theme}
    ></nb-my-brackets-grid>`;
  }

  render() {
    return html`<div class="d-flex justify-content-center">
      <sl-card>
        ${this.titleTemplate()}${this.messageTemplate()}
        <sl-tab-group>
          <sl-tab slot="nav" panel="my-brackets">My Brackets</sl-tab>
          <sl-tab slot="nav" panel="groups">Groups</sl-tab>

          <sl-tab-panel name="my-brackets"
            >${this.bracketsTemplate()}</sl-tab-panel
          >
          <sl-tab-panel name="groups">Groups coming soon...</sl-tab-panel>
        </sl-tab-group>
      </sl-card>
    </div>`;
  }
}

customElements.define("nb-my-brackets", MyBrackets);
