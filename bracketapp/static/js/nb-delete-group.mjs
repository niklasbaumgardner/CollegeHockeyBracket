import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class DeleteGroup extends NikElement {
  static properties = {
    group: { type: Object },
    controller: { type: Object },
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

  handleHide() {
    this.controller.show();
  }

  render() {
    return html`<sl-dialog
      label="Delete this group?"
      @sl-hide=${this.handleHide}
    >
      <form id="delete-group-form" action=${DELETE_GROUP_URL} method="POST">
        <p>Are you sure want to delete <strong>${this.group.name}</strong>?</p>
      </form>
      <div slot="footer" class="d-flex gap-3">
        <sl-button class="w-50" variant="neutral" outline @click=${this.hide}
          >Cancel</sl-button
        >
        <sl-button
          class="w-50"
          variant="danger"
          type="submit"
          form="delete-group-form"
          >Delete Group</sl-button
        >
      </div>
    </sl-dialog>`;
  }
}

customElements.define("nb-delete-group", DeleteGroup);
