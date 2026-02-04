import { html } from "lit";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class DeleteGroup extends BaseDialog {
  static properties = {
    group: { type: Object },
    controller: { type: Object },
  };

  handleHide() {
    this.controller.show();
  }

  lableTemplate() {
    return html`Delete this group?`;
  }

  contentTemplate() {
    return html`<form
      id="delete-group-form"
      action=${this.group.delete_url}
      method="POST"
    >
      <p>Are you sure want to delete <strong>${this.group.name}</strong>?</p>
    </form>`;
  }

  footerTemplate() {
    return html`${this.cancelButtonTemplate()}
      <wa-button
        class="grow"
        variant="danger"
        type="submit"
        form="delete-group-form"
        >Delete Group</wa-button
      >`;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;

    this.boundHandleHide = this.handleHide.bind(this);
    this.dialog.addEventListener("wa-hide", this.boundHandleHide);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dialog.removeEventListener("wa-hide", this.boundHandleHide);
  }
}

customElements.define("nb-delete-group", DeleteGroup);
