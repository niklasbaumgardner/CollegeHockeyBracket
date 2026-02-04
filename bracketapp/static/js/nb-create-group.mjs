import { html } from "lit";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class CreateGroup extends BaseDialog {
  static properties = {
    private: { type: Boolean },
  };

  static queries = {
    ...BaseDialog.queries,
    isPrivateCheckbox: "#is_private",
    password: "#password",
    form: "form",
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

  lableTemplate() {
    return html`Create A Group`;
  }

  contentTemplate() {
    return html`<form
      id="new-group-form"
      action=${CREATE_GROUP_URL}
      method="POST"
      class="wa-native"
    >
      <div class="wa-stack">
        <wa-input
          form="new-group-form"
          placeholder="Group name"
          label="Group name"
          id="name"
          name="name"
          maxlength="60"
          required
          autofocus
        ></wa-input>

        <wa-checkbox
          form="new-group-form"
          id="is_private"
          name="is_private"
          @change=${this.handlePrivateChange}
          checked
          >Require Password To Join</wa-checkbox
        >

        <label ?hidden=${!this.private}
          >Password
          <input
            form="new-group-form"
            type="text"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            maxlength="60"
            ?required=${this.private}
        /></label>
      </div>
    </form>`;
  }

  footerTemplate() {
    return html`<wa-button
      class="w-full"
      variant="brand"
      type="submit"
      form="new-group-form"
      >Create</wa-button
    >`;
  }
}

customElements.define("nb-create-group", CreateGroup);
