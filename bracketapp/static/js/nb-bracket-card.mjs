import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class BracketeCardContent extends NikElement {
  static properties = { bracket: { type: Object } };

  render() {
    return html`<div class="d-flex align-items-center gap-2">
      <img
        class="standings-img"
        src=${this.bracket.winner_team.team.icon_path}
      />
      <div class="d-flex flex-column">
        <span>${this.bracket.name}</span>

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
              ><p class="bracket-details-content">
                ${this.bracket?.max_points}
              </p>
              <p class="bracket-details-label">Max points</p></span
            >
          </div>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("nb-bracket-card-content", BracketeCardContent);

export class BracketeCard extends NikElement {
  static properties = { bracket: { type: Object } };

  render() {
    return html`<sl-card style="--padding:var(--sl-spacing-small);"
      ><nb-bracket-card-content
        .bracket=${this.bracket}
      ></nb-bracket-card-content
    ></sl-card>`;
  }
}

customElements.define("nb-bracket-card", BracketeCard);
