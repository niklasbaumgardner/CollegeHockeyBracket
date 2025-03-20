import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./nb-my-brackets-group-card.mjs";
import "./nb-radio-item.mjs";
import "./nb-group-card.mjs";

export class AddBracketModal extends NikElement {
  static properties = {
    myBrackets: { type: Object },
    group: { type: Object },
  };

  static queries = {
    dialogEl: "sl-dialog",
  };

  get joinedBrackets() {
    return this.group.brackets.filter((b) => b.user_id === CURRENT_USER.id);
  }

  get bracketsCanJoin() {
    return this.myBrackets.filter(
      (b) => !this.joinedBrackets.find((jb) => jb.id === b.id)
    );
  }

  show() {
    this.updateComplete.then(() => {
      this.dialogEl.updateComplete.then(() => {
        this.dialogEl.show();
      });
    });
  }

  hide() {
    this.dialogEl.hide();
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

    return html`<div class="d-flex flex-column gap-2">
      <p>Available brackets to add:</p>
      ${bracketCards}
    </div>`;
  }

  render() {
    return html`<sl-dialog label="Add Bracket To Group">
      <form
        id="join-group-form"
        action="${this.group.add_bracket_url}"
        method="POST"
      ></form>

      ${this.groupTemplate()} ${this.bracketsTemplate()}
      <sl-button
        id="join-button"
        class="w-100"
        type="submit"
        form="join-group-form"
        slot="footer"
        variant="primary"
        >Add Bracket</sl-button
      ></sl-dialog
    >`;
  }
}

customElements.define("nb-add-bracket-modal", AddBracketModal);
