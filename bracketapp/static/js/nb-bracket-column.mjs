import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";

export class BracketColumn extends NikElement {
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

  clickableTemplate() {
    return html`<a
        class="block w-full h-full no-underline"
        href=${this.bracket.url}
        ><div class="flex gap-(--wa-space-xs)">
          ${this.getImageElement(this.bracket.winner_team)}
          <div class="name-cell">
            <span class="standings-bracket-name underline"
              >${this.bracket.name}</span
            ><span class="standings-username"
              >${this.bracket.user.username}</span
            >
          </div>
        </div></a
      >
      ${this.groupsTemplate()}`;
  }

  safeTemplate() {
    return html`<div class="name-cell">
      <span class="standings-bracket-name">${this.bracket.name}</span
      ><span class="standings-username">${this.bracket.user.username}</span>
    </div>`;
  }

  render() {
    let content = null;
    if (this.bracket.url && this.bracket.winner_team) {
      content = this.clickableTemplate();
    } else {
      content = this.safeTemplate();
    }
    return html`<div
      class="wa-stack pt-(--wa-space-2xs) pb-(--wa-space-xs) gap-(--wa-space-xs)"
    >
      ${content}
    </div>`;
  }
}
customElements.define("nb-bracket-column", BracketColumn);
