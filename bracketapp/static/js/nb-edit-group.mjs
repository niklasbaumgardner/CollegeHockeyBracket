import { html, ifDefined } from "./lit.bundle.mjs";
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

  lableTemplate() {
    return html`Edit Group`;
  }

  contentTemplate() {
    return html`<form
      id="edit-group-form"
      action=${this.group.edit_url}
      method="POST"
      class="wa-native"
    >
      <div class="wa-stack">
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
          <wa-radio value="true">Locked</wa-radio>
          <wa-radio value="false">Unlocked</wa-radio>
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
          <wa-radio value="true">Private</wa-radio>
          <wa-radio value="false">Public</wa-radio>
        </wa-radio-group>

        <label ?hidden=${!this.private}
          >Password
          <input
            form="edit-group-form"
            type="text"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            maxlength="60"
            value=${this.group.password}
            ?required=${this.private}
        /></label>
      </div>
    </form>`;
  }

  footerTemplate() {
    return html`<wa-button
        class="grow"
        variant="danger"
        appearance="outlined"
        @click=${this.handleDeleteClick}
        >Delete Group</wa-button
      >
      <wa-button
        class="grow"
        id="save-button"
        variant="brand"
        type="submit"
        form="edit-group-form"
        disabled
        >Save</wa-button
      >`;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;

    this.private = this.group.is_private;

    this.boundHandleInput = this.handleInput.bind(this);
    this.dialog.addEventListener("input", this.boundHandleInput);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dialog.removeEventListener("input", this.boundHandleInput);
  }
}

customElements.define("nb-edit-group", EditGroup);
