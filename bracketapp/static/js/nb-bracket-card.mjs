import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class BracketeCardContent extends NikElement {
  static properties = { bracket: { type: Object } };

  render() {
    return html`<div class="wa-cluster">
      <img
        class="standings-img"
        src=${this.bracket.winner_team.team.icon_path}
      />
      <div class="wa-stack gap-(--wa-space-xs)">
        <span>${this.bracket.name}</span>

        <div class="wa-cluster join-group-bracket">
          <div class="">
            <p class="m-0 bracket-details-content">
              ${this.bracket?.rank ?? "--"}
            </p>
            <p class="m-0 bracket-details-label">Rank</p>
          </div>
          <wa-divider orientation="vertical"></wa-divider>
          <div class="">
            <p class="m-0 bracket-details-content">${this.bracket?.points}</p>
            <p class="m-0 bracket-details-label">Points</p>
          </div>
          <wa-divider orientation="vertical"></wa-divider>
          <div class="">
            <p class="m-0 bracket-details-content">
              ${this.bracket?.max_points}
            </p>
            <p class="m-0 bracket-details-label">Max points</p>
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
    return html`<wa-card style="--spacing:var(--wa-space-s);"
      ><nb-bracket-card-content
        .bracket=${this.bracket}
      ></nb-bracket-card-content
    ></wa-card>`;
  }
}

customElements.define("nb-bracket-card", BracketeCard);
