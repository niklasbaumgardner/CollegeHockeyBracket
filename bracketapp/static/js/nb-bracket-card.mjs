import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class BracketeCard extends NikElement {
  static properties = { bracket: { type: Object } };

  render() {
    return html`<div class="d-flex flex-column gap-2">
      <div class="d-flex align-items-center gap-2">
        <span>${this.bracket.name}</span>
      </div>

      <div class="d-flex align-items-center gap-2 join-group-bracket">
        <div class="d-flex">
          <span
            ><p class="bracket-details-content">
              ${this.bracket?.rank ?? "--"}
            </p>
            <p class="bracket-details-label">Rank</p></span
          >
        </div>
        <div class="d-flex">
          <span
            ><p class="bracket-details-content">${this.bracket?.points}</p>
            <p class="bracket-details-label">Points</p></span
          >
        </div>
        <div class="d-flex">
          <span
            ><p class="bracket-details-content">${this.bracket?.max_points}</p>
            <p class="bracket-details-label">Max points</p></span
          >
        </div>
      </div>
    </div>`;
  }
}

customElements.define("nb-bracket-card", BracketeCard);
