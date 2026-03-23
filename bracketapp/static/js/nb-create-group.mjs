import { html } from "lit";
import { BaseDialog } from "./nb-base-dialog.mjs";
import { DeferredTask } from "./DeferredTask.mjs";
import profanityCleaner from "https://cdn.jsdelivr.net/npm/profanity-cleaner@0.0.3/+esm";

const GROUP_UNIQUE_HELP_TEXT =
  "Group name is already taken. Please choose a different name.";

export class CreateGroup extends BaseDialog {
  static properties = {
    private: { type: Boolean },
  };

  static queries = {
    ...BaseDialog.queries,
    isPrivateCheckbox: "#is_private",
    password: "#password",
    form: "form",
    nameInput: "#name",
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

  async checkGroupNameUnique(name) {
    let response = await fetch(
      GROUP_NAME_UNIQUE_URL +
        "?" +
        new URLSearchParams({
          name,
        }),
    );
    response = await response.json();
    return response;
  }

  async handleGroupNameInput() {
    this.submitButton.disabled = true;

    this.nameInput.value = profanityCleaner.clean(this.nameInput.value, {
      keepFirstAndLastChar: true,
      replacePartialWords: true,
    });

    await this.nameInput.updateComplete;

    if (!this.groupNameTask) {
      this.groupNameTask = new DeferredTask(async () => {
        const groupName = this.nameInput.value.trim();

        if (groupName.length === 0) {
          return;
        }

        const result = await this.checkGroupNameUnique(groupName);
        console.log("Group name is unique", result.isUnique);

        if (result.isUnique) {
          this.nameInput.hint = "";
          this.submitButton.disabled = false;
        } else {
          this.nameInput.hint = GROUP_UNIQUE_HELP_TEXT;
          this.submitButton.disabled = true;
        }
      }, 300);
    }

    this.groupNameTask.arm();
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
          @input=${this.handleGroupNameInput}
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
      disabled
      >Create</wa-button
    >`;
  }
}

customElements.define("nb-create-group", CreateGroup);
