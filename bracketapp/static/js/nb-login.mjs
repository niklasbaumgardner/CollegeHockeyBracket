import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class LoginCard extends NikElement {
  static properties = {
    email: { type: String },
  };

  static queries = {};

  render() {
    return html`<sl-card>
      <form id="login-form" action="${LOGIN_URL}" method="POST"></form>
      <div class="d-flex flex-column gap-4">
        <h2>Login</h2>

        <label
          >Email *
          <input
            form="login-form"
            class="nb-input"
            type="email"
            name="email"
            label="Email"
            placeholder="Your email"
            maxlength="60"
            ?value=${this.email}
            required
        /></label>

        <label
          >Password *
          <input
            form="login-form"
            class="nb-input"
            type="password"
            name="password"
            label="Password"
            placeholder="Your password"
            required
        /></label>

        <small
          ><a href="${PASSWORD_RESET_REQUEST_URL}">Forgot password?</a></small
        >

        <sl-checkbox form="login-form" name="remember" value="True" checked
          >Remember me?</sl-checkbox
        >

        <div>
          <!-- This submit button is hidden so "Enter" will submit the form -->
          <button form="login-form" type="submit" hidden></button>
          <sl-button
            class="w-100"
            type="submit"
            variant="primary"
            form="login-form"
            >Login</sl-button
          >
        </div>

        <p>
          Don't have an account?
          <a href="${SINGUP_URL}">Sign Up</a>
        </p>
      </div>
    </sl-card>`;
  }
}

customElements.define("nb-login", LoginCard);
