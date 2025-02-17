import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class CreateGroup extends NikElement {
  static properties = {
    private: { type: Boolean },
  };

  static queries = {
    dialog: "sl-dialog",
  };

  constructor() {
    super();

    this.private = true;
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("CreateNewGroup", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "CreateNewGroup": {
        this.dialog.show();
      }
    }
  }

  handlePrivateChange() {
    this.private = !this.private;
  }

  passwordTemplate() {
    if (!this.private) {
      return null;
    }

    return html`<sl-input
      type="text"
      label="Password"
      id="password"
      name="password"
      placeholder="Password"
      maxlength="60"
      required
    ></sl-input>`;
  }

  render() {
    return html`<sl-dialog label="Create a group">
      <div class="mb-2">
        <form id="new-group-form" action="${CREATE_GROUP_URL}" method="POST">
          <div class="nb-row">
            <sl-input
              placeholder="Group name"
              label="Group name"
              id="name"
              name="name"
              maxlength="60"
              required
            ></sl-input>
            <sl-checkbox
              id="is_private"
              name="is_private"
              @sl-input=${this.handlePrivateChange}
              checked
              >Make group private</sl-checkbox
            >
            ${this.passwordTemplate()}
          </div>
        </form>
      </div>
      <sl-button
        id="submitButton"
        class="w-100"
        variant="primary"
        type="submit"
        form="new-group-form"
        slot="footer"
        >Create group</sl-button
      >
    </sl-dialog>`;
  }
}

export default CreateGroup;

customElements.define("nb-create-group", CreateGroup);
