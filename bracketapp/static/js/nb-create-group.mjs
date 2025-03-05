import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class CreateGroup extends NikElement {
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

  render() {
    return html`<sl-dialog label="Create A Group">
      <form id="new-group-form" action=${CREATE_GROUP_URL} method="POST"></form>

      <div class="d-flex flex-column gap-4">
        <sl-input
          form="new-group-form"
          placeholder="Group name"
          label="Group name"
          id="name"
          name="name"
          maxlength="60"
          required
        ></sl-input>

        <sl-checkbox
          form="new-group-form"
          id="is_private"
          name="is_private"
          @sl-input=${this.handlePrivateChange}
          checked
          >Require Password To Join</sl-checkbox
        >

        <sl-input
          form="new-group-form"
          type="text"
          label="Password"
          id="password"
          name="password"
          placeholder="Password"
          maxlength="60"
          ?hidden=${!this.private}
          ?required=${this.private}
        ></sl-input>
      </div>

      <sl-button
        class="w-100"
        variant="primary"
        type="submit"
        form="new-group-form"
        slot="footer"
        >Create</sl-button
      >
    </sl-dialog>`;
  }
}

customElements.define("nb-create-group", CreateGroup);
