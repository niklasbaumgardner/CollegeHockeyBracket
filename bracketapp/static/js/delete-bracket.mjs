import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

class DeleteBracket extends NikElement {
  static properties = {
    bracket: { type: Object },
  };

  static get queries() {
    return {
      dialogEl: "sl-dialog",
      deleteButton: "#delete-button",
    };
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

  render() {
    return html`<sl-dialog label='Delete bracket named "${this.bracket.name}"?'>
      <form
        id="delete-bracket-form"
        action="${this.bracket.delete_url}"
        method="POST"
      ></form>
      <div
        style="display:flex;flex-direction:column;gap:var(--sl-spacing-small);"
      >
        <div class="row">
          <p>Are you sure you want to delete this bracket?</p>
          <strong>This action cannot be undone.</strong>
        </div>
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

export default DeleteBracket;

customElements.define("delete-bracket-modal", DeleteBracket);
