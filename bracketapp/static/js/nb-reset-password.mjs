import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

const PASSWORD_MATCH_HELP_TEXT = "Passwords do not match.";

export class ResetPasswordCard extends NikElement {
  static properties = { passwordsMatch: { type: Boolean } };

  static queries = { password1: "#password1", password2: "#password2" };

  checkPasswordsMatch() {
    let p1Val = this.password1.value;
    let p2Val = this.password2.value;

    if (p1Val === p2Val) {
      this.passwordsMatch = true;
      this.password2.helpText = "";
    } else if (p2Val.length < p1Val.length) {
      this.passwordsMatch = false;
      let p1Substr = p1Val.substring(0, p2Val.length);
      if (p1Substr === p2Val) {
        this.password2.helpText = "";
      } else {
        this.password2.helpText = PASSWORD_MATCH_HELP_TEXT;
      }
    } else {
      this.passwordsMatch = false;
      this.password2.helpText = PASSWORD_MATCH_HELP_TEXT;
    }
  }

  render() {
    return html`<sl-card @sl-input=${this.checkPasswordsMatch}>
      <form id="password-reset-form" action="" method="POST"></form>
      <div class="d-flex flex-column gap-4">
        <h2>Reset Password</h2>

        <sl-input
          form="password-reset-form"
          type="password"
          label="New Password"
          id="password1"
          name="password1"
          placeholder="Password"
          required
        ></sl-input>

        <sl-input
          form="password-reset-form"
          type="password"
          label="Confirm New Password"
          id="password2"
          name="password2"
          placeholder="Password"
          required
        ></sl-input>

        <sl-button
          form="password-reset-form"
          class="w-100"
          type="submit"
          variant="primary"
          ?disabled=${!this.passwordsMatch}
          >Reset Password</sl-button
        >
      </div>
    </sl-card>`;
  }
}

customElements.define("nb-reset-password", ResetPasswordCard);
