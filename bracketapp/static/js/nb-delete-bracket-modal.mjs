import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class DeleteBracketModal extends BaseDialog {
  static properties = {
    bracket: { type: Object },
  };

  static queries = {
    ...BaseDialog.queries,
    deleteButton: "#delete-button",
  };

  render() {
    return html`<wa-dialog label='Delete bracket named "${this.bracket.name}"?'>
      <form
        id="delete-bracket-form"
        action="${this.bracket.delete_url}"
        method="POST"
      ></form>
      <div class="d-flex flex-column">
        <p>Are you sure you want to delete this bracket?</p>
        <strong>This action cannot be undone.</strong>
      </div>
      <wa-button
        slot="footer"
        id="close-button"
        variant="neutral"
        outline
        @click=${this.hide}
        >Cancel</wa-button
      >
      <wa-button
        type="submit"
        form="delete-bracket-form"
        slot="footer"
        id="delete-button"
        variant="danger"
        >Delete bracket</wa-button
      ></wa-dialog
    >`;
  }
}

customElements.define("nb-delete-bracket-modal", DeleteBracketModal);
