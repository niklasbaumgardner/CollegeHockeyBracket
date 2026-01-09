import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-my-brackets-group-standings.mjs";
import "./nb-radio-item.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class JoinGroupModal extends BaseDialog {
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

  bracketTemplate() {
    return html`<div class="mb-4">
      <p>Joining bracket:</p>
      <nb-bracket-card .bracket=${this.bracket}></nb-bracket-card>
    </div> `;
  }

  groupTemplate(group) {
    return html`<nb-group-radio-item
      name="group_id"
      icon="trophy"
      .group=${group}
      form="join-group-form"
    ></nb-group-radio-item>`;
  }

  groupsTemplate() {
    let groupCards = this.groupsCanJoin.map((g) => this.groupTemplate(g));

    return html`<div class="d-flex flex-column gap-2">
      <p>Available groups to join:</p>
      ${groupCards}
    </div>`;
  }

  render() {
    return html`<wa-dialog label="Add Bracket To Group">
      <form
        id="join-group-form"
        action="${this.bracket.bracket_join_group_url}"
        method="POST"
      ></form>

      ${this.bracketTemplate()} ${this.groupsTemplate()}
      <wa-button
        id="join-button"
        class="w-100"
        type="submit"
        form="join-group-form"
        slot="footer"
        variant="primary"
        >Add Bracket</wa-button
      ></wa-dialog
    >`;
  }
}

customElements.define("nb-join-group-modal", JoinGroupModal);
