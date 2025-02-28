import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

const EMAUL_UNIQUE_HELP_TEXT =
  "This email already exists. Please login or reset the password.";

export class PasswordResetRequestCard extends NikElement {
  static properties = {
    email: { type: String },
  };

  static queries = {};

  render() {
    return html`<sl-card>
      <form id="password-reset-request-form" action="" method="POST"></form>
      <div class="d-flex flex-column gap-4">
        <h2>Reset Password</h2>

        <sl-input
          form="password-reset-request-form"
          type="email"
          name="email"
          label="Email"
          placeholder="Your email"
          required
        ></sl-input>

        <sl-button
          form="password-reset-request-form"
          type="submit"
          variant="primary"
          >Request Link To Reset Password</sl-button
        >
      </div>
    </sl-card>`;
  }
}

customElements.define("nb-password-reset-request", PasswordResetRequestCard);
