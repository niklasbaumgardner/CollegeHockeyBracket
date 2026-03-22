import { html } from "lit";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class JoinPrivateGroup extends BaseDialog {
  static properties = { group: { type: Object } };

  lableTemplate() {
    return html`Join ${this.group.name}`;
  }

  contentTemplate() {
    return html`<form
      id="join-private-group"
      action=${this.group.join_url}
      method="POST"
      class="wa-stack"
    >
      <p>This group is private. Please enter the password to join.</p>
      <wa-input
        type="text"
        id="password"
        name="password"
        label="Password"
        placeholder="Password"
        maxlength="60"
        required
      ></wa-input>
    </form>`;
  }

  footerTemplate() {
    return html`${this.cancelButtonTemplate()}<wa-button
        class="grow"
        type="submit"
        form="join-private-group"
        variant="brand"
        >Join</wa-button
      >`;
  }
}

customElements.define("nb-join-private-group", JoinPrivateGroup);
