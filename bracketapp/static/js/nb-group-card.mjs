import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class GroupCardContent extends NikElement {
  static properties = {
    group: { type: Object },
  };

  render() {
    return html`<div class="d-flex align-items-center gap-2">
      <wa-icon
        style="font-size:var(--wa-font-size-2x-large);"
        name="trophy"
      ></wa-icon>
      <div>
        <div>${this.group.name}</div>
        <div class="d-flex gap-4">
          <small
            ><span class="fw-semibold">Members</span> ${this.group.members
              .length}</small
          ><small
            ><span class="fw-semibold">Brackets</span> ${this.group.brackets
              .length}</small
          >
          <small
            ><span class="fw-semibold">Group type</span> ${this.group.is_private
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
    return html`<wa-card style="--padding:var(--wa-spacing-small);"
      ><nb-group-card-content .group=${this.group}></nb-group-card-content
    ></wa-card>`;
  }
}

customElements.define("nb-group-card", GroupCard);
