import { html } from "lit";
import { NikElement } from "./nik-element.mjs";

export class GroupBracketDetails extends NikElement {
  static properties = {
    groupBrackets: { type: Array },
    size: { type: String }, // Default is small
  };

  groupBracketTemplate(groupBracket) {
    return html`<wa-card class="group-bracket-card ${this.size} default-border"
      ><a
        class="flex items-center gap-(--wa-space-2xs) no-underline"
        href="${groupBracket.group.url}"
      >
        <wa-icon
          class="trophy"
          name="trophy"
          library="hero"
          variant="outline"
        ></wa-icon>
        <div class="flex flex-col">
          <span class="group-name underline">${groupBracket.group.name}</span
          ><span class="rank">Rank: ${groupBracket.group_rank ?? "--"}</span>
        </div>
      </a></wa-card
    >`;
  }

  render() {
    if (!this.groupBrackets.length) {
      return null;
    }

    return html`<wa-details
      class="my-brackets-groups"
      summary="Groups (${this.groupBrackets.length})"
      ><div class="wa-cluster flex-wrap gap-(--wa-space-xs)">
        ${this.groupBrackets.map((gb) => this.groupBracketTemplate(gb))}
      </div></wa-details
    >`;
  }
}

customElements.define("nb-group-bracket-details", GroupBracketDetails);
