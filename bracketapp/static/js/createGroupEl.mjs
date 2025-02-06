import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class CreateGroup extends NikElement {
  static properties = {
    private: { type: Boolean, default: false },
  };

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
    return html`<sl-card>
      <div class="row" slot="header">
        <h4>Create a group</h4>
      </div>
      <div class="mb-2">
        <form action="${CREATE_GROUP_URL}" method="POST">
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
              >Make group private</sl-checkbox
            >
            ${this.passwordTemplate()}
            <sl-button
              id="submitButton"
              class="w-100"
              variant="primary"
              type="submit"
              >Create group</sl-button
            >
          </div>
        </form>
      </div>
    </sl-card>`;
  }
}

export default CreateGroup;

customElements.define("nb-create-group", CreateGroup);
