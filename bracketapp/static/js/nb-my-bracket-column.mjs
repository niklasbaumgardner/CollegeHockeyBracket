import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";

export class MyBracketColumn extends NikElement {
  static properties = {
    bracket: { type: Object },
  };

  getImageElement(winner_team) {
    if (!winner_team) {
      return null;
    }

    return html`<img
      class="standings-img"
      src="${winner_team.team.icon_path}"
      alt="${winner_team.team.name}"
    />`;
  }

  groupsTemplate() {
    // Meant to be extended
    return null;
  }

  render() {
    return html`<div class="wa-stack py-(--wa-space-xs) gap-(--wa-space-xs)">
      <a class="block w-full h-full no-underline" href=${this.bracket.url}
        ><div class="flex gap-(--wa-space-xs)">
          ${this.getImageElement(this.bracket.winner_team)}
          <div class="name-cell">
            <span class="standings-bracket-name underline"
              ><span>${this.bracket.name}</span></span
            ><span class="standings-username"
              >${this.bracket.user.username}</span
            >
          </div>
        </div></a
      >
      ${this.groupsTemplate()}
    </div>`;
  }
}
customElements.define("nb-my-bracket-column", MyBracketColumn);
