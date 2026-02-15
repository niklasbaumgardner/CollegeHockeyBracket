import { html } from "lit";
import "./nb-radio-item.mjs";
import "./nb-group-card.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class GroupAddBracket extends BaseDialog {
  static properties = {
    myBrackets: { type: Object },
    group: { type: Object },
  };

  get joinedBrackets() {
    return this.group.brackets.filter((b) => b.user_id === CURRENT_USER.id);
  }

  get bracketsCanJoin() {
    return this.myBrackets.filter(
      (b) => !this.joinedBrackets.find((jb) => jb.id === b.id),
    );
  }

  groupTemplate() {
    return html`<div class="wa-stack">
      <p>Joining group:</p>
      <nb-group-card .group=${this.group}></nb-group-card>
    </div> `;
  }

  bracketTemplate(bracket) {
    return html`<nb-bracket-radio-item
      name="bracket_sqid"
      form="join-group-form"
      .bracket=${bracket}
    ></nb-bracket-radio-item>`;
  }

  bracketsTemplate() {
    let bracketCards = this.bracketsCanJoin.map((g) => this.bracketTemplate(g));

    let newBracket = null;
    if (MY_BRACKET_COUNT < 5) {
      newBracket = html`<wa-button
        class="w-full"
        appearance="outlined"
        href=${CREATE_BRACKET_LINK + `?group_sqid=${this.group.id}`}
        >Create New Bracket</wa-button
      >`;
    }

    return html`<div class="wa-stack gap-(--wa-space-s)">
        <p>Available brackets to add:</p>
        ${bracketCards}
      </div>
      ${newBracket}`;
  }

  lableTemplate() {
    return html`Add Bracket To Group`;
  }

  contentTemplate() {
    return html`<form
        id="join-group-form"
        action=${this.group.add_bracket_url}
        method="POST"
      ></form>
      <div class="wa-stack">
        ${this.groupTemplate()} ${this.bracketsTemplate()}
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

customElements.define("nb-group-add-bracket", GroupAddBracket);
