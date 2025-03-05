import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { DeleteGroup } from "./nb-delete-bracket.mjs";

export class EditGroup extends NikElement {
  static properties = {
    private: { type: Boolean },
    group: { type: Object },
  };

  static queries = {
    dialog: "sl-dialog",
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
    return html`<sl-dialog label="Edit Group" @sl-input=${this.handleInput}>
      <form id="edit-group-form" action=${EDIT_GROUP_URL} method="POST">
        <div class="d-flex flex-column gap-4">
          <sl-input
            form="edit-group-form"
            placeholder="Group name"
            label="Group name"
            id="name"
            name="name"
            maxlength="60"
            value=${this.group.name}
            required
          ></sl-input>
          <sl-radio-group
            form="edit-group-form"
            label="Lock Group"
            name="locked"
            value=${this.group.locked}
            help-text="Locked groups prevent new members from joining."
            required
          >
            <sl-radio-button value="true">Locked</sl-radio-button>
            <sl-radio-button value="false">Unlocked</sl-radio-button>
          </sl-radio-group>
          <sl-radio-group
            form="edit-group-form"
            label="Group Type"
            name="is_private"
            value=${this.group.is_private}
            @sl-input=${this.handlePrivateChange}
            help-text="Private groups require a password to join."
            required
          >
            <sl-radio-button value="true">Private</sl-radio-button>
            <sl-radio-button value="false">Public</sl-radio-button>
          </sl-radio-group>
          <sl-input
            form="edit-group-form"
            type="text"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            maxlength="60"
            value=${this.group.password}
            ?hidden=${!this.private}
            required
          ></sl-input>
        </div>
      </form>
      <div slot="footer" class="d-flex gap-3">
        <sl-button
          class="w-50"
          variant="danger"
          outline
          @click=${this.handleDeleteClick}
          >Delete Group</sl-button
        >
        <sl-button
          class="w-50"
          id="save-button"
          variant="primary"
          type="submit"
          form="edit-group-form"
          disabled
          >Save</sl-button
        >
      </div>
    </sl-dialog>`;
  }
}

customElements.define("nb-edit-group", EditGroup);
