import { html } from "lit";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class EmailUpdates extends BaseDialog {
  lableTemplate() {
    return html`Subscribe to email updates?`;
  }

  contentTemplate() {
    return html`<div>Updates will be sent to ${CURRENT_USER.email}</div>
      <div>
        Want to use a different email? Update your email
        <a href=${PROFILE_URL}>here</a>
      </div>`;
  }

  footerTemplate() {
    return html`${this.cancelButtonTemplate()}<wa-button
        class="grow"
        variant="brand"
        >Subscribe</wa-button
      >`;
  }
}

customElements.define("nb-email-updates", EmailUpdates);
