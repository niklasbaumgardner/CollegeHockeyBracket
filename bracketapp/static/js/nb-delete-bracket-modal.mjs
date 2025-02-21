import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class DeleteBracketModal extends NikElement {
  static properties = {
    bracket: { type: Object },
  };

  static queries = {
    dialogEl: "sl-dialog",
    deleteButton: "#delete-button",
  };

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

  render() {
    return html`<sl-dialog label='Delete bracket named "${this.bracket.name}"?'>
      <form
        id="delete-bracket-form"
        action="${this.bracket.delete_url}"
        method="POST"
      ></form>
      <div class="d-flex flex-column">
        <p>Are you sure you want to delete this bracket?</p>
        <strong>This action cannot be undone.</strong>
      </div>
      <sl-button
        slot="footer"
        id="close-button"
        variant="neutral"
        outline
        @click=${this.hide}
        >Cancel</sl-button
      >
      <sl-button
        type="submit"
        form="delete-bracket-form"
        slot="footer"
        id="delete-button"
        variant="danger"
        >Delete bracket</sl-button
      ></sl-dialog
    >`;
  }
}

customElements.define("nb-delete-bracket-modal", DeleteBracketModal);
