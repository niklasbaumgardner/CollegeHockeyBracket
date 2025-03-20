import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { GroupCard } from "./nb-my-brackets-group-card.mjs";
import { RadioItem } from "./nb-radio-item.mjs";

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
      <sl-card style="--padding:var(--sl-spacing-small);"
        ><div class="d-flex align-items-center gap-2">
          <sl-icon
            style="font-size:var(--sl-font-size-2x-large);"
            name="trophy"
          ></sl-icon>
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
                ><span class="fw-semibold">Group type</span> ${this.group
                  .is_private
                  ? "Private"
                  : "Public"}</small
              >
            </div>
          </div>
        </div>
      </sl-card>
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
