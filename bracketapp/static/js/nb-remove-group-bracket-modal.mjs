import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class RemoveGroupBracketModal extends NikElement {
  static properties = {
    bracket: { type: Object },
    group: { type: Object },
  };

  static queries = {
    dialog: "sl-dialog",
  };

  show() {
    this.updateComplete.then(() => {
      this.dialog.updateComplete.then(() => {
        this.dialog.show();
      });
    });
  }

  hide() {
    this.dialog.hide();
  }

  render() {
    return html`<sl-dialog label="Remove Bracket?">
      <form
        id="delete-group-bracket-form"
        action=${DELETE_GROUP_BRACKET_URL.replace(
          "0",
          this.bracket.group_bracket.id
        )}
        method="POST"
      >
        <p>
          Are you sure want to remove <strong>${this.bracket.name}</strong> from
          <strong>${this.group.name}</strong>?
        </p>
      </form>
      <div slot="footer" class="d-flex gap-3">
        <sl-button class="w-50" variant="neutral" outline @click=${this.hide}
          >Cancel</sl-button
        >
        <sl-button
          class="w-50"
          variant="danger"
          type="submit"
          form="delete-group-bracket-form"
          >Remove Bracket</sl-button
        >
      </div>
    </sl-dialog>`;
  }
}

customElements.define("nb-remove-group-bracket-modal", RemoveGroupBracketModal);
