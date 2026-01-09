import { html } from "./lit.bundle.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class CreateGroup extends BaseDialog {
  static properties = {
    private: { type: Boolean },
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
    return html`<wa-dialog label="Create A Group">
      <form id="new-group-form" action=${CREATE_GROUP_URL} method="POST"></form>

      <div class="wa-stack">
        <wa-input
          form="new-group-form"
          placeholder="Group name"
          label="Group name"
          id="name"
          name="name"
          maxlength="60"
          required
        ></wa-input>

        <wa-checkbox
          form="new-group-form"
          id="is_private"
          name="is_private"
          @input=${this.handlePrivateChange}
          checked
          >Require Password To Join</wa-checkbox
        >

        <wa-input
          form="new-group-form"
          type="text"
          label="Password"
          id="password"
          name="password"
          placeholder="Password"
          maxlength="60"
          ?hidden=${!this.private}
          ?required=${this.private}
        ></wa-input>
      </div>

      <wa-button
        class="w-full"
        variant="brand"
        type="submit"
        form="new-group-form"
        slot="footer"
        >Create</wa-button
      >
    </wa-dialog>`;
  }
}

customElements.define("nb-create-group", CreateGroup);
