import { Standings } from "./nb-standings.mjs";
import { MyBracketsGrid } from "./nb-my-brackets-grid.mjs";
import { html } from "./imports.mjs";

export class MyBrackets extends Standings {
  titleTemplate() {
    return html`<div>
      <h2 class="mb-0">My Brackets ${this.year}</h2>
      <small class="font-size-x-small color-neutral-700"
        >You created 4/5 brackets</small
      >
    </div>`;
  }

  messageTemplate() {
    if (!CAN_EDIT_BRACKET) {
      return null;
    }

    // TODO
    return html`<a href=${NEW_BRACKET_LINK}>Create a bracket</a>`;
  }

  bracketsTemplate() {
    return html`<nb-my-brackets-grid
      .brackets=${this.brackets}
      theme=${this.theme}
    ></nb-my-brackets-grid>`;
  }
}

customElements.define("nb-my-brackets", MyBrackets);
