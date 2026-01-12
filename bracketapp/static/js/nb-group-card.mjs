import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class GroupCardContent extends NikElement {
  static properties = {
    group: { type: Object },
  };

  render() {
    return html`<div class="wa-cluster">
      <wa-icon
        style="font-size:var(--wa-font-size-2xl);"
        name="trophy"
      ></wa-icon>
      <div class="wa-stack gap-(--wa-space-xs)">
        <div>${this.group.name}</div>
        <div class="wa-cluster">
          <small
            ><span class="font-semibold">Members</span> ${this.group.members
              .length}</small
          ><small
            ><span class="font-semibold">Brackets</span> ${this.group.brackets
              .length}</small
          >
          <small
            ><span class="font-semibold">Group type</span> ${this.group
              .is_private
              ? "Private"
              : "Public"}</small
          >
        </div>
      </div>
    </div>`;
  }
}

customElements.define("nb-group-card-content", GroupCardContent);

export class GroupCard extends NikElement {
  static properties = {
    group: { type: Object },
  };

  render() {
    return html`<wa-card style="--spacing:var(--wa-space-s);"
      ><nb-group-card-content .group=${this.group}></nb-group-card-content
    ></wa-card>`;
  }
}

customElements.define("nb-group-card", GroupCard);
