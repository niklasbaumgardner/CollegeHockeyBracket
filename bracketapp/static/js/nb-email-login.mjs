import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

export class EmailLogin extends NikElement {
  static properties = {
    email: { type: String },
  };

  static queries = {};

  render() {
    return html`<wa-card>
      <form id="email-login-form" action="" method="POST"></form>
      <div class="wa-stack">
        <h2>Email Link To Login</h2>

        <wa-input
          form="email-login-form"
          type="email"
          name="email"
          label="Email"
          placeholder="Your email"
          required
        ></wa-input>

        <wa-button
          form="email-login-form"
          type="submit"
          variant="brand"
          class="w-full"
          >Request Link To Login</wa-button
        >
      </div>
    </wa-card>`;
  }
}

customElements.define("nb-email-login", EmailLogin);
