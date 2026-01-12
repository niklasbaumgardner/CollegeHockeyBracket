import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class ArchiveYears extends NikElement {
  static properties = {
    archivedYears: { type: Array },
  };

  imgTemplate(winner_team) {
    if (!winner_team) {
      return null;
    }

    return html`<img
      class="w-[75px] h-[75px]"
      src=${winner_team.team.icon_path}
      alt=${winner_team.team.name}
    />`;
  }

  yearsTemplate() {
    return this.archivedYears.map(
      (correctBracket) => html`<wa-card class="w-full"
        ><a
          class="clickable-card p-(--wa-space-l)"
          href=${correctBracket.archive_url}
          ><div class="wa-stack">
            <div class="wa-cluster">
              ${this.imgTemplate(correctBracket.winner_team)}
              <h3>${correctBracket.year}</h3>
            </div>
            <h3>${correctBracket.winner_team.team.name}</h3>
          </div></a
        ></wa-card
      >`
    );
  }

  render() {
    return html`<div class="flex justify-center">
      <wa-card>
        <div class="wa-stack">
          <h2>Archive</h2>
          <div
            class="archive-grid"
            class-bad="grid gap-(--wa-space-l) grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            ${this.yearsTemplate()}
          </div>
        </div>
      </wa-card>
    </div>`;
  }
}

customElements.define("nb-archive-years", ArchiveYears);
