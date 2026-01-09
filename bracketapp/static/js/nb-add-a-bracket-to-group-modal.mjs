import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-my-brackets-group-standings.mjs";
import "./nb-radio-item.mjs";
import "./nb-group-card.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class AddBracketModal extends BaseDialog {
  static properties = {
    myBrackets: { type: Object },
    group: { type: Object },
  };

  get joinedBrackets() {
    return this.group.brackets.filter((b) => b.user_id === CURRENT_USER.id);
  }

  get bracketsCanJoin() {
    return this.myBrackets.filter(
      (b) => !this.joinedBrackets.find((jb) => jb.id === b.id)
    );
  }

  groupTemplate() {
    return html`<div class="mb-4">
      <p>Joining group:</p>
      <nb-group-card .group=${this.group}></nb-group-card>
    </div> `;
  }

  bracketTemplate(bracket) {
    return html`<nb-bracket-radio-item
      name="bracket_id"
      form="join-group-form"
      .bracket=${bracket}
    ></nb-bracket-radio-item>`;
  }

  bracketsTemplate() {
    let bracketCards = this.bracketsCanJoin.map((g) => this.bracketTemplate(g));

    let newBracket = null;
    if (MY_BRACKET_COUNT < 5) {
      newBracket = html`<wa-button
        class="w-100"
        variant="text"
        outline
        href=${NEW_BRACKET_LINK + `?group_id=${this.group.id}`}
        >Create New Bracket</wa-button
      >`;
    }

    return html`<div class="d-flex flex-column gap-2 mb-2">
        <p>Available brackets to add:</p>
        ${bracketCards}
      </div>
      ${newBracket}`;
  }

  render() {
    return html`<wa-dialog label="Add Bracket To Group">
      <form
        id="join-group-form"
        action="${this.group.add_bracket_url}"
        method="POST"
      ></form>

      ${this.groupTemplate()} ${this.bracketsTemplate()}
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

customElements.define("nb-add-bracket-modal", AddBracketModal);
