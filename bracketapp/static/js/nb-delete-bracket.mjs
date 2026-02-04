import { html } from "lit";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class DeleteBracketModal extends BaseDialog {
  static properties = {
    bracket: { type: Object },
  };

  static queries = {
    ...BaseDialog.queries,
    deleteButton: "#delete-button",
  };

  lableTemplate() {
    return html`Delete bracket named "${this.bracket.name}"?`;
  }

  contentTemplate() {
    return html`<form
        id="delete-bracket-form"
        action=${this.bracket.delete_url}
        method="POST"
      ></form>
      <div class="wa-stack">
        <p>Are you sure you want to delete this bracket?</p>
        <strong>This action cannot be undone.</strong>
      </div>`;
  }

  footerTemplate() {
    return html`${this.cancelButtonTemplate()}
      <wa-button
        class="grow"
        type="submit"
        form="delete-bracket-form"
        id="delete-button"
        variant="danger"
        >Delete bracket</wa-button
      >`;
  }
}

customElements.define("nb-delete-bracket", DeleteBracketModal);
