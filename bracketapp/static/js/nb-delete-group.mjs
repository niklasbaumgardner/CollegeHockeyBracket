import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class DeleteGroup extends BaseDialog {
  static properties = {
    group: { type: Object },
    controller: { type: Object },
  };

  handleHide() {
    this.controller.show();
  }

  render() {
    return html`<wa-dialog
      label="Delete this group?"
      @wa-hide=${this.handleHide}
    >
      <form
        id="delete-group-form"
        action=${this.group.delete_url}
        method="POST"
      >
        <p>Are you sure want to delete <strong>${this.group.name}</strong>?</p>
      </form>
      <div slot="footer" class="d-flex gap-3">
        <wa-button class="w-50" variant="neutral" outline @click=${this.hide}
          >Cancel</wa-button
        >
        <wa-button
          class="w-50"
          variant="danger"
          type="submit"
          form="delete-group-form"
          >Delete Group</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}

customElements.define("nb-delete-group", DeleteGroup);
