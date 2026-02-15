import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

export class BracketColumn extends NikElement {
  static properties = {
    bracket: { type: Object },
  };

  get bracketName() {
    return this.bracket.safeName ?? this.bracket.name;
  }

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
          <div class="name-cell">${this.nameTemplate()}</div>
        </div></a
      >
      ${this.groupsTemplate()}`;
  }

  nameTemplate() {
    return html`<span class="standings-bracket-name underline"
        >${this.bracketName}</span
      ><span class="standings-username">${this.bracket.user.username}</span>`;
  }

  safeTemplate() {
    return html`<div class="name-cell">
      <span class="standings-bracket-name">${this.bracketName}</span
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

export class MyBracketColumn extends BracketColumn {
  groupsTemplate() {
    if (!this.bracket.group_brackets.length) {
      return null;
    }

    return html`<nb-group-bracket-details
      size="small"
      .groupBrackets=${this.bracket.group_brackets}
    ></nb-group-bracket-details>`;
  }

  nameTemplate() {
    return html`<span
      class="standings-bracket-name underline _text-(length:--wa-font-size-larger)"
      >${this.bracketName}</span
    >`;
  }

  render() {
    if (this.bracket.id === -1) {
      return html`<wa-button href="${CREATE_BRACKET_LINK}" variant="brand"
        >Create new bracket</wa-button
      >`;
    }
    return super.render();
  }
}
customElements.define("nb-my-bracket-column", MyBracketColumn);
