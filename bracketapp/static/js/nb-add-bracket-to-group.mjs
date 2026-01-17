import { html } from "./lit.bundle.mjs";
import "./nb-my-brackets-group-standings.mjs";
import "./nb-radio-item.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class AddBracketToGroup extends BaseDialog {
  static properties = {
    bracket: { type: Object },
    groups: { type: Object },
  };

  get joinedGroups() {
    return this.bracket.group_brackets.map((gb) => gb.group);
  }

  get groupsCanJoin() {
    return this.groups.filter(
      (g) => !this.joinedGroups.find((jg) => jg.id === g.id)
    );
  }

  lableTemplate() {
    return html`Add Bracket To Group`;
  }

  bracketTemplate() {
    return html`<div class="wa-stack">
      <p>Joining bracket:</p>
      <nb-bracket-card .bracket=${this.bracket}></nb-bracket-card>
    </div> `;
  }

  groupTemplate(group) {
    return html`<nb-group-radio-item
      name="group_sqid"
      icon="trophy"
      .group=${group}
      form="join-group-form"
    ></nb-group-radio-item>`;
  }

  groupsTemplate() {
    let groupCards = this.groupsCanJoin.map((g) => this.groupTemplate(g));

    return html`<div class="wa-stack gap-(--wa-space-s)">
      <p>Available groups to join:</p>
      ${groupCards}
    </div>`;
  }

  contentTemplate() {
    return html`<form
        id="join-group-form"
        action="${this.bracket.bracket_join_group_url}"
        method="POST"
      ></form>

      <div class="wa-stack">
        ${this.bracketTemplate()} ${this.groupsTemplate()}
      </div>`;
  }

  footerTemplate() {
    return html`<wa-button
      id="join-button"
      class="w-full"
      type="submit"
      form="join-group-form"
      variant="brand"
      >Add Bracket</wa-button
    >`;
  }
}

customElements.define("nb-add-bracket-to-group", AddBracketToGroup);
