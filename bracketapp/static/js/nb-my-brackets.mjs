import { Standings } from "./nb-standings.mjs";
import { MyBracketsGrid } from "./nb-my-brackets-grid.mjs";
import { html } from "./imports.mjs";

export class MyBrackets extends Standings {
  titleTemplate() {
    return html`<div slot="header"><h2>My Brackets ${this.year}</h2></div>`;
  }

  messageTemplate() {
    return html`<p>You have created 4/5 brackets.</p>
      <p>
        Track your rank, points, and performance across all rounds of the
        ${this.year} NCAA College Hockey Tournament.
      </p>`;
  }

  bracketsTemplate() {
    return html`<nb-my-brackets-grid
      .brackets=${this.brackets}
      theme=${this.theme}
    ></nb-my-brackets-grid>`;
  }
}

customElements.define("nb-my-bracekts", MyBrackets);
