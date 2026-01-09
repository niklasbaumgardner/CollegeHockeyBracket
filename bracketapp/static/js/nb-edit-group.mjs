import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./nb-delete-group.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class EditGroup extends BaseDialog {
  static properties = {
    private: { type: Boolean },
    group: { type: Object },
  };

  static queries = {
    ...BaseDialog.queries,
    form: "#edit-group-form",
    saveButton: "#save-button",
  };

  constructor() {
    super();

    this.private = true;
  }

  async firstUpdated() {
    super.firstUpdated();

    await this.updateComplete;
    this.initialFormData = new FormData(this.form);
  }

  handlePrivateChange() {
    this.private = !this.private;
  }

  handleInput() {
    let currentFormData = new FormData(this.form);
    let currentEntriesArr = [...currentFormData.entries()];

    this.saveButton.disabled =
      JSON.stringify([...this.initialFormData.entries()]) ===
      JSON.stringify(currentEntriesArr);
  }

  handleDeleteClick() {
    if (!this.deleteGroup) {
      this.deleteGroup = document.createElement("nb-delete-group");
      this.deleteGroup.group = this.group;
      this.deleteGroup.controller = this;
      document.body.appendChild(this.deleteGroup);
    }

    this.deleteGroup.show();
    this.hide();
  }

  render() {
    return html`<wa-dialog label="Edit Group" @input=${this.handleInput}>
      <form id="edit-group-form" action=${this.group.edit_url} method="POST">
        <div class="d-flex flex-column gap-4">
          <wa-input
            form="edit-group-form"
            placeholder="Group name"
            label="Group name"
            id="name"
            name="name"
            maxlength="60"
            value=${this.group.name}
            required
          ></wa-input>
          <wa-radio-group
            form="edit-group-form"
            label="Lock Group"
            name="locked"
            value=${this.group.locked}
            help-text="Locked groups prevent new members from joining."
            required
          >
            <wa-radio-button value="true">Locked</wa-radio-button>
            <wa-radio-button value="false">Unlocked</wa-radio-button>
          </wa-radio-group>
          <wa-radio-group
            form="edit-group-form"
            label="Group Type"
            name="is_private"
            value=${this.group.is_private}
            @input=${this.handlePrivateChange}
            help-text="Private groups require a password to join."
            required
          >
            <wa-radio-button value="true">Private</wa-radio-button>
            <wa-radio-button value="false">Public</wa-radio-button>
          </wa-radio-group>
          <wa-input
            form="edit-group-form"
            type="text"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            maxlength="60"
            value=${this.group.password}
            ?hidden=${!this.private}
            ?required=${this.private}
          ></wa-input>
        </div>
      </form>
      <div slot="footer" class="d-flex gap-3">
        <wa-button
          class="w-50"
          variant="danger"
          outline
          @click=${this.handleDeleteClick}
          >Delete Group</wa-button
        >
        <wa-button
          class="w-50"
          id="save-button"
          variant="primary"
          type="submit"
          form="edit-group-form"
          disabled
          >Save</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}

customElements.define("nb-edit-group", EditGroup);
